import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式
import './assets/css/global.css'
//导入字体图标
import './assets/fonts/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid'

import axios from 'axios'
//导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//require styles 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//配置请求的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config;
})
Vue.prototype.$http=axios
//将富文本编辑器，注册为全局可用的组件
Vue.use(VueQuillEditor)

Vue.filter('dateFormat',function(originVal){
  const dt=new Date(originVal)
  const year=dt.getFullYear()
  const month=(dt.getMonth()+1+'').padStart(2,'0')
  const day=(dt.getDate()+'').padStart(2,'0')
  const hour=(dt.getHours()+'').padStart(2,'0')
  const min=(dt.getMinutes()+'').padStart(2,'0')
  const sec=(dt.getSeconds()+'').padStart(2,'0')

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
})

Vue.component('tree-table',TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
