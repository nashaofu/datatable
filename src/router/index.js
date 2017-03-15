import Vue from 'vue';
import Router from 'vue-router';
import Datatable from 'components/Datatable';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'datatable',
      component: Datatable
    }
  ]
});
