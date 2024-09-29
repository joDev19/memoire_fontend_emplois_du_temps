import './assets/output.css'
// import './assets/modal.css'

import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'


import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const vfm = createVfm()

app.use(createPinia())
app.use(router)
app.use(vfm)

app.mount('#app')
