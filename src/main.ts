import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResumeView from './views/ResumeView.vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthPage from './pages/AuthPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import { useAccount } from './composables/useAccount'
import ProfileInfoView from './views/ProfileInfoView.vue'
import ProfileEntryView from './views/ProfileEntryView.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/:id', component: ResumeView },
  { path: '/dashboard', component: DashboardPage },
  {
    path: '/profile',
    component: ProfilePage,
    children: [
      { path: '', component: ProfileInfoView },
      { path: '/info', component: ProfileInfoView },
      { path: '/entries', component: ProfileEntryView },
    ],
  },
  { path: '/sign-in', component: AuthPage },
]

const { account } = useAccount()

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes,
})

router.beforeEach((to, from) => {
  if (account.value) {
    account.value.educationEntries = account.value.educationEntries.filter(
      (e) => e.id
    )
    account.value.workExperiences = account.value.workExperiences.filter(
      (e) => e.id
    )
    account.value.projects = account.value.projects.filter((e) => e.id)
  }
})

const app = createApp(App)

app.use(router)
app.mount('#app')
