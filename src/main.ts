import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResumeView from './views/ResumeView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProfilePage from './pages/ProfilePage.vue'
import AccountPage from './pages/AccountPage.vue'
import HomePage from './pages/HomePage.vue'
import AuthPage from './pages/AuthPage.vue'

const routes = [
    {path: '/', component: HomePage},
    {path: '/:id', component: ResumeView},
    {path: '/profile', component: ProfilePage},
    {path: '/account', component: AccountPage},
    {path: '/sign-in', component: AuthPage}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

const app = createApp(App)

app.use(router)
app.mount('#app')

