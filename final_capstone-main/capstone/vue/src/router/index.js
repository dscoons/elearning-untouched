import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import Courses from '../views/CourseList.vue'
import StudentHome from '../views/StudentHome.vue'
import TeacherHome from '../views/TeacherHome.vue'
import TeacherCourse from '../views/TeacherCourse.vue'
import TeacherModule from '../views/TeacherModule.vue'
import TeacherLesson from '../views/TeacherLesson.vue'
import StudentCourse from '../views/StudentCourse.vue'
import StudentModule from '../views/StudentModule.vue'
import StudentLesson from '../views/StudentLesson.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },

    {
      path: "/course-list",
      name: "Course List",
      component: Courses,
      meta: {
        requiresAuth: false
      }
    },

    {
      path: "/student-home",
      name: "Student Home",
      component: StudentHome,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/teacher-home",
      name: "Teacher Home",
      component: TeacherHome,
      meta: {
        requiresAuth: true
      }
    },
    
    {
      path: '/teacher-home/course/:courseId',
      name: 'teacher-course',
      component: TeacherCourse,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/teacher-home/course/:courseId/module/:moduleId',
      name: 'teacher-module',
      component: TeacherModule,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/teacher-home/course/:courseId/module/:moduleId/lesson/:lessonId',
      name: 'teacher-lesson',
      component: TeacherLesson,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/student-home/course/:courseId',
      name: 'student-course',
      component: StudentCourse,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/student-home/course/:courseId/module/:moduleId',
      name: 'student-module',
      component: StudentModule,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/student-home/course/:courseId/module/:moduleId/lesson/:lessonId',
      name: 'student-lesson',
      component: StudentLesson,
      meta: {
        requiresAuth: true
      }
    }

  
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
