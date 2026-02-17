import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResumeView from './components/view/ResumeView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProfilePage from './components/pages/ProfilePage.vue'
import AccountPage from './components/pages/AccountPage.vue'

const routes = [
    {path: '/', component: ResumeView},
    {path: '/:id', component: ResumeView},
    {path: '/profile', component: ProfilePage},
    {path: '/account', component: AccountPage}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App).use(router).mount('#app')
