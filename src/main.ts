import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResumeView from './views/ResumeView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthPage from './pages/AuthPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import ProfilePage from './pages/ProfilePage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/:id', component: ResumeView },
  { path: '/dashboard', component: DashboardPage },
  { path: '/profile', component: ProfilePage },
  { path: '/sign-in', component: AuthPage }
]

const router = createRouter({
  history: createMemoryHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes
})

const app = createApp(App)

app.use(router)
app.mount('#app')

