import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/main'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'


import ToastPlugin from './managers/ToastPlugin'

library.add(faSun, faMoon)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ToastPlugin)
app.use(router)
app.mount('#app')
