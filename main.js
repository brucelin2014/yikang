import Vue from 'vue'
import App from './App'

import datetime from 'common/datetime.js'

Vue.config.productionTip = false
Vue.prototype.$datetime = datetime // 赋值到vue里面

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
