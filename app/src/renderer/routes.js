export default [
  {
    path: '/',
    name: 'goji',
    component: require('components/Jogi')
  },
  {
    path: '*',
    redirect: '/'
  }
]
