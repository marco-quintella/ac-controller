
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      { path: '', name: 'Aparelhos', component: () => import('pages/aparelhos.vue') },
      { path: '/horarios', name: 'Horarios', component: () => import('pages/horarios.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
