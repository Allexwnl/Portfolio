import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase/supabase.js'
import HomePage from '../views/HomePage.vue';
import LoGin from '../views/LoGin.vue';
import DashBoard from '../views/DashBoard.vue';
import ProjectDetail from '../views/ProjectShow.vue';
import Blog from '../views/AllBlogs.vue';
import BlogDetail from '../views/BlOg.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/admin', component: LoGin },
  { path: '/dashboard', component: DashBoard, meta: { requiresAuth: true } },
  { path: '/project/:id', component: ProjectDetail },
  { path: '/blogs', component: Blog },
  { path: '/blogs/:id', component: BlogDetail },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Als er een hash in de URL staat, scroll daar naartoe
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth' // optioneel voor vloeiend scrollen
      }
    }
    
    // Anders altijd naar boven
    return { top: 0 }
  }
})


router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const { data: { session } } = await supabase.auth.getSession()
  const allowedEmails = ['alexanderzoet@gmail.com']

  if (requiresAuth) {
    if (!session || !allowedEmails.includes(session.user.email)) {
      return next('/admin')
    }
  }
  next()
})


export default router;
