import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import Eragileak from './components/Eragileak'
import Eragilea from './components/Eragilea'
import Asanbladak from './components/Asanbladak'
import Asanblada from './components/Asanblada'
import Postazerrendak from './components/Postazerrendak'
import Postazerrenda from './components/Postazerrenda'
import Lantaldeak from './components/Lantaldeak'
import Lantaldea from './components/Lantaldea'
import Baliabideak from './components/Baliabideak'
import Baliabidea from './components/Baliabidea'

Vue.use(VueRouter)

/* eslint-disable no-new */
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/eragileak', name: 'eragileak', component: Eragileak },
  { path: '/eragileak/:id', name: 'eragilea', component: Eragilea },
  { path: '/asanbladak', name: 'asanbladak', component: Asanbladak },
  { path: '/asanbladak/:id', name: 'asanblada', component: Asanblada },
  { path: '/zerrendak', name: 'postazerrendak', component: Postazerrendak },
  { path: '/zerrendak/:id', name: 'postazerrenda', component: Postazerrenda },
  { path: '/lantaldeak', name: 'lantaldeak', component: Lantaldeak },
  { path: '/lantaldeak/:id', name: 'lantaldea', component: Lantaldea },
  { path: '/baliabideak', name: 'baliabideak', component: Baliabideak },
  { path: '/baliabideak/:id', name: 'baliabidea', component: Baliabidea }
]

/* eslint-disable no-new */
const router = new VueRouter({
  routes: routes
})

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App }
})
