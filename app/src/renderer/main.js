import Vue from 'vue';
import Electron from 'vue-electron';
import Vuex from 'vuex';
import Router from 'vue-router';
import App from './App';
import routes from './routes';
import Workspace from './components/Workspace';
import Jogi from './components/Jogi';
import Controller from './components/Controller';

Vue.use(Electron);
Vue.use(Vuex);
Vue.use(Router);

Vue.component('workspace', Workspace);
Vue.component('jogi', Jogi);
Vue.component('controller', Controller);

const store = new Vuex.Store({
  state: {
    current: 0,
    layers: [{active: true}],
  },
  mutations: {
    addLayer: state => {
      state.layers.map(layer => {
        layer.active = false
      });
      state.layers.unshift({active: true});
      state.current = 0;
    },
    selectLayer: (state, {index}) => {
      state.current = index;
    }
  }
})

Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes
});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render(h) {
    return h(App);
  }
}).$mount('#app');
