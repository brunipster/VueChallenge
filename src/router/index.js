import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import RegisterUser from "../views/RegisterUser.vue";
import Companies from "../views/Companies.vue";
import Products from "../views/Products.vue";
import FormCompany from "../components/FormCompany";
import FormProduct from "../components/FormProduct";

import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Companies,
    meta: {
      isPublic: false
    }
  },
  {
    path: "/signin",
    name: "Login",
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/signup",
    name: "register-user",
    component: RegisterUser,
    meta: {
      isPublic: true
    }
  },
  {
    path: "/companies",
    name: "Companies",
    component: Companies,
    meta: {
      isPublic: false
    },
    children: [
      {
        path: "",
        component: FormCompany,
        name: "CreateCompany",
        props: { id: undefined }
      },
      {
        path: "update",
        name: "UpdateCompany",
        component: FormCompany,
        props: (route) => {
          return { id: parseInt(route.query.id) }
        }
      }
    ]
  },
  {
    path: "/products/",
    name: "Products",
    component: Products,
    meta: {
      isPublic: false
    },
    children: [
      {
        path: "",
        component: FormProduct,
        name: "CreateProduct",
        props: { id: undefined }
      },
      {
        path: "update",
        name: "UpdateProduct",
        component: FormProduct,
        props: (route) => {
          return { id: parseInt(route.query.id) }
        }
      }
    ]
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic) {
    if (Vue.$cookies.isKey("user_session")) {
      store
        .dispatch("getUser")
        .then(() => {
          next();
        }).catch(() => {
          next({ name: "Login" });
        })
    } else {
      next({ name: "Login" });
    }
  } else {
    next()
  }
})

export default router;
