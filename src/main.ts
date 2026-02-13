import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ResumeView from './components/view/ResumeView.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import ProfilePage from './components/pages/ProfilePage.vue'

const routes = [
    {path: '/', component: ResumeView},
    {path: '/:id', component: ResumeView},
    {path: '/profile', component: ProfilePage}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

createApp(App).use(router).mount('#app')
