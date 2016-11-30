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
import Proposamenak from './components/Proposamenak'
import Proposamena from './components/Proposamena'
import Epostak from './components/Epostak'
import Eposta from './components/Eposta'
import Metadatak from './components/Metadatak'
import Metadata from './components/Metadata'
import Egutegia from './components/Egutegia'

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
  { path: '/baliabideak/:id', name: 'baliabidea', component: Baliabidea },
  { path: '/proposamenak', name: 'proposamenak', component: Proposamenak },
  { path: '/proposamenak/:id', name: 'proposamena', component: Proposamena },
  { path: '/epostak', name: 'epostak', component: Epostak },
  { path: '/epostak/:id', name: 'eposta', component: Eposta },
  { path: '/metadatak', name: 'metadatak', component: Metadatak },
  { path: '/metadatak/:id', name: 'metadata', component: Metadata },
  { path: '/egutegia', name: 'egutegia', component: Egutegia }
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
