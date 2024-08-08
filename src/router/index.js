import { createRouter, createWebHistory } from 'vue-router'
import axios from "@/services/axios";
import {
  HomeView,
  Dashboard,
  Students,
  Teachers,
  Login,
  Error,
  Tests,
  Settings,
  Groups,
  Results,
  SlugStudent,
  SlugTeachers,
  SlugTests,
  SlugResults,
  SlugGroups,
  SlugSubjects,
  Subjects,
  SignupSuperAdmin,
  Payment,
  Attendance,
  Customer,
  Sms
} from '../views'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: '/employees',
          name: 'employees',
          component: Teachers,
        },
        {
          path: '/employees/:id/:name',
          name: 'slug_teachers',
          component: SlugTeachers,
        },
        {
          path: '/students',
          name: 'students',
          component: Students,
        },
        {
          path: '/students/:id/:name',
          name: 'slug_students',
          component: SlugStudent,
        },
        {
          path: '/customer',
          name: 'customers',
          component: Customer,
        },
        {
          path: '/tests',
          name: 'tests',
          component: Tests,
        },
        {
          path: '/subjects/:id/:name',
          name: 'slug_subjects',
          component: SlugSubjects,
        },
        {
          path: '/subjects',
          name: 'subjects',
          component: Subjects,
        },
        {
          path: '/payment',
          name: 'payment',
          component: Payment,
        },
        {
          path: '/attendance',
          name: 'attendance',
          component: Attendance,
        },
        {
          path: '/sms',
          name: 'sms',
          component: Sms,
        },
        {
          path: '/students/:id/:name',
          name: 'slug_students',
          component: SlugStudent,
        },
        {
          path: '/results',
          name: 'results',
          component: Results,
        },
        {
          path: '/results/:id',
          name: 'slug_results',
          component: SlugResults,
        },
        {
          path: '/groups',
          name: 'groups',
          component: Groups,
        },
        {
          path: '/groups/:id/:name',
          name: 'slug_groups',
          component: SlugGroups,
        },
        {
          path: '/tests/question/:name',
          name: 'slug_questions',
          component: SlugTests,
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: SignupSuperAdmin,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: Error,
    },
  ]
})

router.beforeEach((to, from, next) => {
  try {
    axios.get('staff/all')
      .then((res) => {
        if (res.data && to.name !== 'register') {
          next({ name: 'register' })
        } else if (!res.data && to.name !== 'login') {
          axios.get('test-result', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
            .then(res => {
              next()
            })
            .catch(err => {
              if (err.response.data.message == "Token vaqti tugagan!" && to.name !== 'login') {
                next({ name: 'login' })
              } else {
                next()
              }
            })
        } else {
          next()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
})

// router.beforeEach((to, from, next) => {
//   return next({ name: "register" })
//   try {
//     axios.get('/staff/all')
//       .then((res) => {
//         if (!res.data) {
//           axios.get('/staff', {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           })
//             .then(res => {
//               // next()
//             })
//             .catch(err => {
//               if (err.response.data.message == "Token vaqti tugagan!" && to.name !== 'login') {
//                 // next({ name: 'login' })
//               } else {
//                 // next()
//               }
//             })
//         }
//         else if (to.name !== 'register') {
//           console.log('object');
//           // return next({ name: "register" })
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   } catch (error) {
//     console.log(error, 'register');
//   }
// })

export default router