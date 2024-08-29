import { createApp } from 'vue'
import App from './App.vue'
import ElementPlusPlugin from './plugins/element-plus'
import Layouts from './plugins/layouts'
import './registerServiceWorker'
import router from './router'
import { store, storeKey } from './store'

createApp(App)
  .use(store, storeKey)
  .use(router)
  .use(ElementPlusPlugin)
  .use(Layouts)
  // .use(Components)
  .mount('#app')
