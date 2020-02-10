import Vue from 'vue'
import Router from 'vue-router'
import CustomerInfo from '@/views/CustomerInfo'
import index from '@/views/index'
import AssistantSalary from '@/views/AssistantSalary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/customerInfo',
      name: 'CustomerInfo',
      component: CustomerInfo
    },
    {
      path: '/assistantSalary',
      name: 'AssistantSalary',
      component: AssistantSalary
    }
  ]
})
