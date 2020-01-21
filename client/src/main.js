import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import {
  Form,
  FormItem,
  Button,
  TabPane,
  Tabs,
  Row,
  Menu,
  MenuItem,
  Submenu,
  Col,
  Input,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Col)
Vue.use(Input)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
