// https://stackoverflow.com/questions/76405268/google-oauth-sign-in-button-does-not-render-in-vue-3-using-vue-router
import LoginLayout from '../layouts/LoginLayout.vue'
// import MainLayout from '../layouts/MainLayout.vue'
// import ListPlaylists from '../pages/ListPlaylists.vue'

const routes = [
  {
    path: '/',
    component: LoginLayout
  },
  {
    path: '/playlists',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ListPlaylists.vue') }
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
