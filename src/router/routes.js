const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'register', component: () => import('pages/RegisterPage.vue') },
      { 
        path: 'home',
        name: 'homepage', 
        component: () => import('pages/HomePage.vue') 
      },
      { 
        path: 'pos',
        name: 'pospage', 
        component: () => import('pages/PosPage.vue') 
      },
      { 
        path: 'inventory',
        name: 'inventorypage', 
        component: () => import('pages/InventoryPage.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
