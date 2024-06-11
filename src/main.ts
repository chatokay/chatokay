import { Icon } from '@iconify/vue'
import App from './App.vue'
import { installI18n, router } from '~/modules/index'

import 'uno.css'
// import './styles/vars.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-dialog.css'
import './styles/index.scss'

const app = createApp(App)

app.component('Icon', Icon)
app.use(router)
installI18n(app)
app.mount('#app')
