import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: require("../components/home.vue")
    },
    {
      path: "/postshop",
      component: require("../components/postshop.vue")
    },
    {
      name: "myShopping",
      path: "/myShopping/:userId",
      component: require("../components/myShopping.vue")
    }
  ]
})
