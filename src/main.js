import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false




Vue.prototype.$newComponent = (id, component) => {
  Vue.component(id, component)
}
Vue.prototype.$destroyComponents = (id) => {
  delete Vue.options.components[id]
}

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('#app')
