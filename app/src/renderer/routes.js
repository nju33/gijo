import Jogi from 'components/Jogi';

export default [
  {
    path: '/',
    name: 'jogi',
    component: Jogi
  },
  {
    path: '*',
    redirect: '/'
  }
]
