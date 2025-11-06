import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../supabase/supabase.js'
import HomePage from '../views/HomePage.vue';
import LoGin from '../views/LoGin.vue';
import DashBoard from '../views/DashBoard.vue';
import ProjectDetail from '../views/ProjectShow.vue';
import Blog from '../views/BlOg.vue';


const routes = [
  { path: '/', component: HomePage },
  { path: '/admin', component: LoGin },
  { path: '/dashboard', component: DashBoard, meta: { requiresAuth: true } },
  { path: '/project/:id', component: ProjectDetail },
  { path: '/blogs', component: Blog },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

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
