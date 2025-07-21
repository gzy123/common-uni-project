import { apiList } from '@/api'
/* #ifdef H5 */
import VConsole from 'vconsole'
if (process.env.name === 'dev') {
  const vconsole = new VConsole()
}
/* #endif */
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persist-uni' // 注册pinia持久化插件

export function createApp() {
	const app = createSSRApp(App)
	// 引入pinia
	const pinia = createPinia()
	pinia.use(piniaPersistedstate)
	app.use(pinia)

	app.provide(`$API`, apiList)
	return {
		app
	}
}
// #endif