import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App)
    .use(router)
    .use(store)
    .use(VueSweetalert2)
    .mount('#app')
