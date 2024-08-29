<template lang="pug">
component(:is="layout")
  transition
    router-view
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { putAuthTokenRefreshApi } from '@/utils/api/auth'
import { isString } from 'lodash'
import { IPutAuthTokenRefreshResponse } from '@/types/api/auth'

export default defineComponent({
  setup() {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    let timer: any = null

    const refreshToken = async () => {
      const refresh = localStorage.getItem('refresh')

      if (isString(refresh)) {
        const data: IPutAuthTokenRefreshResponse = await putAuthTokenRefreshApi(
          {
            token: refresh
          }
        )
        const { access } = data
        localStorage.setItem('access', access)
      }
    }

    const setTimer = () => {
      timer = setInterval(refreshToken, 1000 * 60 * 5)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const initialization = () => {
      setTimer()
    }
    initialization()
    return {
      layout
    }
  }
})
</script>

<style lang="scss">
@charset 'utf-8';
@import '//fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i';
@import '//fonts.googleapis.com/earlyaccess/notosanstc.css';
@import '//fonts.googleapis.com/css?family=Source+Sans+Pro';
@import '@/styles/_reboot';
@import '@/styles/transition';
@import '@/styles/element-plus';

body {
  font-family: 'Noto Sans TC';
  width: 100vw;
  height: 100vh;
  min-width: 375px;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
