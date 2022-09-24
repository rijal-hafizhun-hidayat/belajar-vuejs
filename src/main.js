import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//sweetalert scss
import 'sweetalert2/src/sweetalert2.scss'

//nprogress css
import 'nprogress/nprogress.css';

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App).use(router).mount('#app')
