export default [{
  path: '/index',
  name: 'index-page',
  component: require('components/index')
}, {
  path: '/setting',
  name: 'setting-page',
  component: require('components/setting')
}, {
  path: '*',
  redirect: '/index'
}]
