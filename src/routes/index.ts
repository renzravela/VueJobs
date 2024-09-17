import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import JobsPage from "../views/JobsPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import JobView from "../views/JobView.vue";
import AddJobView from "../views/AddJobView.vue";
import EditJobView from "../views/EditJobView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: 'Not Found',
      component: NotFoundPage,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsPage,
    },
    {
      path: `/jobs/:id`,
      name: 'job',
      component: JobView,
    },
    {
      path: "/jobs/add",
      name: "add job",
      component: AddJobView,
    },
    {
      path: "/jobs/edit/:id",
      name: "edit job",
      component: EditJobView,
    }
  ],
});

export default router;
