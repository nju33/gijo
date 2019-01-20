import Top from './routes/Top';

export default [
  {
    path: '/',
    name: 'jogi',
    component: Top
  },
  {
    path: '*',
    redirect: '/'
  }
]
