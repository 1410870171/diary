import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/style/reset.css'//修改样式
import 'lib-flexible/flexible.js'//修改根字体大小

//1.引入需要的组件
import { Button, Form, Field, CellGroup, Icon, Uploader,  ActionSheet } from 'vant'
//2.引入样式
import 'vant/lib/index.css'
const app = createApp(App)

app.use(Button)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(Icon);
app.use(createPinia())
app.use(router)
app.use(Uploader);
app.use(ActionSheet);
app.mount('#app')
