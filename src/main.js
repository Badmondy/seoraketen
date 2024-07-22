
import { createApp } from 'vue'
import {createStore} from 'vuex';
import App from './App.vue'
import router from './router'
import store from './store.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/main.css'


createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
