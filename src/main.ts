import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResumePage from './pages/ResumePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthPage from './pages/AuthPage.vue'
import DashboardPage from './pages/DashboardPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import AuthErrorPage from './pages/AuthErrorPage.vue'
import { useAccount } from './composables/useAccount'
import ProfileInfoView from './views/ProfileInfoView.vue'
import ProfileEntryView from './views/ProfileEntryView.vue'
import { useLoading } from './composables/useLoading'
import OAuthTokenPage from './pages/OAuthTokenPage.vue'

const routes = [
  { path: '/', component: HomePage, meta: { title: 'Resumaker' } },
  { path: '/resume/:id', component: ResumePage },
  { path: '/dashboard', component: DashboardPage },
  {
    path: '/profile',
    component: ProfilePage,
    children: [
      { path: '', component: ProfileInfoView },
      { path: 'info', component: ProfileInfoView },
      { path: 'entries', component: ProfileEntryView },
    ],
  },
  { path: '/sign-in', component: AuthPage },
  { path: '/sign-in/error', component: AuthErrorPage },
  { path: '/oauth2/token', component: OAuthTokenPage },
]

const { account, isLoggedIn } = useAccount()
const { setLoading } = useLoading()

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
  },
  routes,
})

router.beforeEach((to, _from) => {
  if (account.value) {
    account.value.educationEntries = account.value.educationEntries.filter(
      (e) => e.id
    )
    account.value.workExperiences = account.value.workExperiences.filter(
      (e) => e.id
    )
    account.value.projects = account.value.projects.filter((e) => e.id)
  } else if (
    isLoggedIn.value == false &&
    to.path != '/' &&
    !to.path.startsWith('/sign-in') &&
    to.path != '/oauth2/token'
  ) {
    setLoading(false)
    return '/sign-in'
  }
})

const app = createApp(App)

app.use(router)
app.mount('#app')
