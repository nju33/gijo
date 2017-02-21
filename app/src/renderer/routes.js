export default [
  {
    path: '/',
    name: 'jogi',
    component: require('components/Jogi')
  },
  {
    path: '*',
    redirect: '/'
  }
]
