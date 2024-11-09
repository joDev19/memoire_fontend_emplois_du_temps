import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import Dashboard from '@/views/App/Dashboard.vue'
import DashboardResponsable from '@/views/App/DasboardResponsable.vue'
import Config from '@/views/App/Config.vue'
// filières
import FiliereIndex from '@/views/App/Filieres/Index.vue'
import FiliereCreate from '@/views/App/Filieres/Create.vue'
import FiliereShow from '@/views/App/Filieres/Show.vue'
//semestre
import SemestreIndex from '@/views/App/Semestres/Index.vue'
import SemestreCreate from '@/views/App/Semestres/Create.vue'
// ues
import UesIndex from '@/views/App/Ues/Index.vue'
import UeShow from '@/views/App/Ues/Show.vue'
import UeCreate from '@/views/App/Ues/Create.vue'
//matiere
import EcsIndex from '@/views/App/ECs/Index.vue'
import EcCreate from '@/views/App/ECs/Create.vue'
import EcShow from '@/views/App/ECs/Show.vue'
// Utilisateurs
import UsersIndex from '@/views/App/Utilisateurs/Index.vue'
import UserShow from '@/views/App/Utilisateurs/Show.vue'
import UserCreate from '@/views/App/Utilisateurs/Create.vue'
import AssignEcToProf from '@/views/App/Utilisateurs/AssignEcToProf.vue'
// jours
import DaysIndex from '@/views/App/Days/Index.vue'
// heure
import HoursIndex from '@/views/App/Hours/Index.vue'
// emplois du temps
import TimeTableCreate from '@/views/App/TimeTables/Create.vue'
// classes
import ClassesIndex from '@/views/App/Classroom/Index.vue'
import ClasseCreate from '@/views/App/Classroom/Create.vue'
// Responsable
import ResponsableMatiere from '@/views/App/Responsable/Matiere.vue'
import ResponsableUpdateMatiere from '@/views/App/Responsable/UpdateMatiere.vue'
import ChooseWeek from '@/views/App/DashboardFile/ChooseWeek.vue'
import client from '@/axiosClient'
// 
import { useUserStore } from '@/stores/utilisateur'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,

    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        activePath: 'dashboard',
      }
    },
    {
      path: '/dashboard/choose-week',
      name: 'choose-week',
      component: ChooseWeek,
      meta: {
        activePath: 'dashboard'
      }
    },
    {
      path: '/configs',
      name: 'configs',
      component: Config,
      meta: {
        activePath: 'config',
      }
    },
    // filieres
    {
      path: '/configs/filieres',
      name: 'filieres-list',
      component: FiliereIndex,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/filieres/create/',
      name: 'filieres-create',
      component: FiliereCreate,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/filieres/:id',
      props: true,
      name: 'filiere-show',
      component: FiliereShow,
      meta: {
        activePath: 'config',
      }
    },
    // semestres
    {
      path: '/configs/semestres',
      name: 'semestres-list',
      component: SemestreIndex,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/semestres/create',
      name: 'semestres-create',
      component: SemestreCreate,
      meta: {
        activePath: 'config',
      }
    },
    //UEs
    {
      path: '/configs/unite_d_enseignements',
      name: 'ues-list',
      component: UesIndex,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/unite_d_enseignement/:id',
      props: true,
      name: 'ue-show',
      component: UeShow,
      meta: {
        activePath: 'config',
      }

    },
    {
      path: '/configs/unite_d_enseignement/create/',
      // props: true,
      name: 'ue-create',
      component: UeCreate,
      meta: {
        activePath: 'config',
      }
    },
    // matiere
    {
      path: '/configs/matieres',
      name: 'ecs-list',
      component: EcsIndex,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/matieres/create',
      name: 'ec-create',
      component: EcCreate,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/matiere/:id',
      props: true,
      name: 'ec-show',
      component: EcShow,
      meta: {
        activePath: 'config',
      }

    },
    // Utilisateurs
    {
      path: '/configs/utilisateurs',
      name: 'users-list',
      component: UsersIndex,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/utilisateur/:id',
      props: true,
      name: 'user-show',
      component: UserShow,
      meta: {
        activePath: 'config',
      }

    },
    {
      path: '/configs/utilisateur/create',
      name: 'user-create',
      component: UserCreate,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/utilisateur/assign-ec',
      name: 'assign-ec',
      component: AssignEcToProf,
      meta: {
        activePath: 'config',
      }
    },
    // jours 
    {
      path: '/configs/jours',
      name: 'days-list',
      component: DaysIndex,
      meta: {
        activePath: 'config',
      }
    },
    // heures
    {
      path: '/configs/heures',
      name: 'hours-list',
      component: HoursIndex,
      meta: {
        activePath: 'config',
      }
    },
    // classes 
    {
      path: '/configs/classes',
      name: 'classe-list',
      component: ClassesIndex,
      meta: {
        activePath: 'config',
      }
    },
    {
      path: '/configs/classe/create',
      name: 'classe-create',
      component: ClasseCreate,
      meta: {
        activePath: 'config',
      }
    },
    //emplois du temps
    {
      path: '/timetables/create',
      name: 'timetable-create',
      component: TimeTableCreate,
      meta: {
        activePath: 'timetables'
      }
    },
    /************************************* responsable ****************************** */
    {
      path: '/responsable/dashboard',
      name: 'responsable-dashboard',
      component: DashboardResponsable,
      meta: {
        activePath: 'dashboard',
      }
    },
    {
      path: '/responsable/matiere',
      name: 'responsable-matiere',
      component: ResponsableMatiere,
    },
    {
      path: '/responsable/matiere/:ecId',
      name: 'responsable-matiere-update',
      props: true,
      component: ResponsableUpdateMatiere,
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})
const isAuthenticated = () => {
  return client.get('api/user');
}


  router.beforeEach(async (to, from) => {
    
    if (useUserStore().user.id == undefined) {
    isAuthenticated().then((response) => {
      useUserStore().user = response.data
      if (
        // ❗️ Avoid an infinite redirect
        to.name !== 'login'
      ) {
        // redirect the user to the login page
        return { name: 'Login' }
      }
    })
  }

  })
export default router
