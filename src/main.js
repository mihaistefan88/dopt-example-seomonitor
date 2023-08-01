import Vue from 'vue'

import App from './components/App.vue'


let vue = new Vue({
    el: '#app',
    render: h => h(App),
})
console.log('loaded');
