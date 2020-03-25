import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Page1 from '@/components/page1'
import Page2 from '@/components/page2'
import Page3 from '@/components/page3'
import Page4 from '@/components/page4'
import System from '@/components/system'
import Log from '@/components/log'
import AddUser from '@/components/adduser'
import ChangePassword from '@/components/changepassword'
import DeleteUser from '@/components/deleteuser'
import DistributeAuthority from '@/components/distributeauthority'

import test from '@/components/test/test'
import pictest from '@/components/test/pictest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: '/Page1',
          name: 'Page1',
          component: Page1
        },
        {
          path: '/Page2',
          name: 'Page2',
          component: Page2
        },
        {
          path: '/Page3',
          name: 'Page3',
          component: Page3
        },
        {
          path: '/Page4',
          name: 'Page4',
          component: Page4
        },
        {
          path: '/adduser',
          name: 'AddUser',
          component: AddUser
        },
        {
          path: '/changepassword',
          name: 'ChangePassword',
          component: ChangePassword
        },
        {
          path: '/deleteuser',
          name: 'DeleteUser',
          component: DeleteUser
        },
        {
          path: '/distributeauthority',
          name: 'DistributeAuthority',
          component: DistributeAuthority
        },
        {
          path: '/log',
          name: 'Log',
          component: Log
        },
        {
          path: '/system',
          name: 'System',
          component: System
        },
        {
          path: '/test',
          name: 'test',
          component: test
        },{
          path: '/pictest',
          name: 'pictest',
          component: pictest
        }

      ]
    }
  ]
})
