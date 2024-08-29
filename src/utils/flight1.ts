/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep, isNumber, isObject } from 'lodash'
import { EventEmitter } from 'events'
class Flight extends EventEmitter {
  viewer: any
  multiplier: number
  clock: any
  registerClock: any
  julianDateInstance: any
  trackId: null | number
  endCenter: null | any
  semiMinorAxis: number
  semiMajorAxis: number
  viewForm: object | undefined
  constructor() {
    super()
    this.viewer = null
    this.initialization()
    this.multiplier = 1
    this.clock = null
    this.registerClock = null
    this.julianDateInstance = window.Cesium.JulianDate
    this.trackId = null
    this.endCenter = null
    this.semiMinorAxis = 1000.0
    this.semiMajorAxis = 1000.0
    this.viewForm = undefined
  }

  initialization() {
    this.viewer = new window.Cesium.Viewer('cesium', {
      // terrain: new window.Cesium.CesiumTerrainProvider(),
      // terrainProvider: new window.Cesium.createWorldTerrain(),
      // terrainProvider: new window.Cesium.EllipsoidTerrainProvider(),
      baseLayerPicker: false,
      sceneModePicker: false,
      animation: false,
      homeButton: false,
      fullscreenButton: false,
      geocoder: false,
      navigationHelpButton: true,
      navigationInstructionsInitiallyVisible: false,
      timeline: false,
      selectionIndicator: false,
      // requestRenderMode: true,
      // maximumRenderTimeChange: Infinity,
      msaaSamples: 2,
      terrainShadows: window.Cesium.ShadowMode.DISABLED,
      orderIndependentTranslucency: false,
      sceneMode: window.Cesium.SceneMode.MORPHING,
      skyBox: false,
      skyAtmosphere: false
      // scene: {
      //   camera: {
      //     maximumZoomDistance: 1000000
      //   }
      // },
      // targetFrameRate: 80,
      // useBrowserRecommendedResolution: false,
      // globe: false
      // imageryProvider: new window.Cesium.BingMapsImageryProvider({
      //   url: 'http://dev.virtualearth.net',
      //   key: 'Ah4jt6ymf737b236Gz_rGVzRF9_e1jGLOSZ5XenIeJ0hkfzxIwPOcVsf7ydLEIrp',
      //   culture: 'zh-Hant',
      //   mapStyle: window.Cesium.BingMapsStyle.ROAD_ON_DEMAND
      // })
      // useDefaultRenderLoop: false,
      // showRenderLoopErrors: false
      // shouldAnimate: true
      // mapProjection: new window.Cesium.WebMercatorProjection()
    })
    // this.viewer.zoomTo(entity);
    this.createViewerEntity('target')

    // const intervalHandle = setInterval(() => {
    //   const camera = this.viewer.scene.camera
    //   const store = {
    //     position: camera.position.clone(),
    //     direction: camera.direction.clone(),
    //     up: camera.up.clone(),
    //     right: camera.right.clone(),
    //     transform: camera.transform.clone(),
    //     frustum: camera.frustum.clone()
    //   }
    //   console.log('store :>> ', store)
    // }, 1000)

    this.viewer.clock.onTick.addEventListener((clock: any) => {
      this.clock = clock
      if (isNumber(this.trackId)) {
        const dataSource = this.viewer.dataSources.get(this.trackId)
        const entity = dataSource.entities.values[0]
        // entity.viewFrom = new window.Cesium.Cartesian3(0, 0, 100)
        this.viewer.entities.getById('target').position =
          entity.position.getValue(clock.currentTime)
        this.viewer.entities.getById('target').viewFrom = this.viewForm
        this.viewer.trackedEntity = this.viewer.entities.getById('target')
        // const heading = window.Cesium.Math.toRadians(50.0)
        // const pitch = window.Cesium.Math.toRadians(-20.0)
        // const range = 5000.0
        // this.viewer.camera.lookAt(
        //   entity.position.getValue(clock.currentTime),
        //   new window.Cesium.HeadingPitchRange(heading, pitch, range)
        // )
      } else {
        this.viewer.trackedEntity = undefined
      }
    })
  }

  setEndCenter(x: number, y: number) {
    this.endCenter = window.Cesium.Cartesian3.fromDegrees(y, x)
  }

  setEndPoint(url: string) {
    this.viewer.entities.add({
      name: 'end-point',
      position: this.endCenter,
      billboard: {
        image: url,
        width: 35,
        height: 50,
        color: window.Cesium.Color.RED.withAlpha(0.8)
      }
    })
  }

  isFinishedGame(positionToCheck: any) {
    // Calculate the distance between the position and the center of the ellipse
    const distance = window.Cesium.Cartesian3.distance(
      this.endCenter,
      positionToCheck
    )

    // Calculate the semi-major and semi-minor axes squared
    const semiMajorAxisSquared = this.semiMajorAxis * this.semiMajorAxis
    const semiMinorAxisSquared = this.semiMinorAxis * this.semiMinorAxis

    // Calculate the value of the ellipse equation for the position
    const value =
      window.Cesium.Cartesian3.distanceSquared(
        this.endCenter,
        positionToCheck
      ) /
        semiMajorAxisSquared +
      (distance * distance) / semiMinorAxisSquared

    // Check if the value is less than or equal to 1 (position is inside the ellipse)
    const isInsideEllipse = value <= 1
    if (isInsideEllipse) {
      this.stopTimeline()
      this.emit('finished-game')
    }
  }

  setTimeline(seconds: number) {
    this.registerClock.currentTime.secondsOfDay =
      this.registerClock.currentTime.secondsOfDay + seconds
    this.viewer.clock.currentTime = cloneDeep(this.registerClock.currentTime)
  }

  setRegisterClock() {
    this.registerClock = cloneDeep(this.clock)
  }

  startTimeline() {
    this.viewer.clockViewModel.shouldAnimate = true
  }

  stopTimeline() {
    this.viewer.clockViewModel.shouldAnimate = false
  }

  createViewerEntity(name: string) {
    const target = new window.Cesium.Entity({
      id: name,
      point: {
        pixelSize: 1,
        color: window.Cesium.Color.YELLOW
      }
    })
    this.viewer.entities.add(target)
  }

  removeViewerEntity(name: string) {
    this.viewer.entities.removeById(name)
  }

  async loadGPXFile(gpxUrl: string, options: any) {
    const dataSource = await window.Cesium.GpxDataSource.load(gpxUrl, options)
    dataSource.clock.multiplier = this.multiplier
    dataSource.clock.clockRange = window.Cesium.ClockRange.CLAMPED

    dataSource.entities.values[0].path = {
      leadTime: 0,
      trailTime: 1000 * 60, // 3 minutes, in seconds of simulation time
      resolution: 1,
      // material: new window.Cesium.PolylineGlowMaterialProperty({
      //   color: options.color
      // }),

      material: new window.Cesium.StripeMaterialProperty({
        evenColor: options.color,
        glowPower: 0
      }),
      width: 2
    }
    // Start tracking changes in entity positions
    dataSource.entities.values.forEach((entity: any) => {
      const positionProperty = entity.position

      // Set up a listener to check for position changes at each tick
      this.viewer.clock.onTick.addEventListener((clock: any) => {
        const currentPosition = positionProperty.getValue(clock.currentTime)

        if (isObject(currentPosition)) {
          this.isFinishedGame(currentPosition)
        }
      })
    })

    dataSource.entities.values[0].polyline.material.outlineColor._value.alpha = 0
    await this.viewer.dataSources.add(dataSource)
  }

  flyTo(value: number) {
    const dataSource = this.viewer.dataSources.get(value)
    // const center = window.Cesium.Cartesian3.fromDegrees(-72.0, 40.0)
    // const heading = window.Cesium.Math.toRadians(90)
    // const pitch = window.Cesium.Math.toRadians(-90)
    // const range = 5000.0
    // console.log('this.viewer :>> ', this.viewer)
    // const positionProperty = dataSource.entities.values[0].position

    this.viewer.flyTo(dataSource, {
      duration: 0,
      easingFunction: window.Cesium.EasingFunction.LINEAR
    })

    // this.viewer.camera.lookAt(
    //   positionProperty.getValue(this.clock.currentTime),
    //   new window.Cesium.HeadingPitchRange(heading, pitch, range)
    // )

    // this.viewer.camera.heading = window.Cesium.Math.toRadians(20.0)
    // this.viewer.camera.pitch = window.Cesium.Math.toRadians(-100.0)
    // this.viewer.camera.roll = 0.0
    //positionProperty.getValue(this.clock.currentTime)
    // this.viewer.camera.flyTo({
    //   duration: 0,
    //   destination: positionProperty.getValue(this.clock.currentTime),
    //   orientation: {
    //     heading: window.Cesium.Math.toRadians(20.0),
    //     pitch: window.Cesium.Math.toRadians(-35.0),
    //     roll: 0.0
    //   }
    // })
  }

  changeRotate(x: any = 0, y: any = 0, z: any = 1000) {
    this.viewer.trackedEntity = undefined
    this.viewForm = new window.Cesium.Cartesian3(x, y, z)
  }

  removePigeon(value: number) {
    const dataSource = this.viewer.dataSources.get(value)
    this.viewer.dataSources.remove(dataSource, true)
  }

  trackedEntity(value: number) {
    this.trackId = value
  }
}
export default Flight
