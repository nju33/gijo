import Vue from 'vue';
import Electron from 'vue-electron';
import Router from 'vue-router';
import App from './App';
import routes from './routes';
import Jogi from './components/Jogi';

Vue.use(Electron);
Vue.use(Router);

Vue.component('jogi', Jogi);

Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({y: 0}),
  routes
});

/* eslint-disable no-new */
new Vue({
  router,
  render(h) {
    return h(App);
  }
}).$mount('#app');
