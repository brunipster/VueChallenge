import Vue from "vue";
import Vuex from "vuex";
import authService from "../services/auth";
import userService from "../services/user";
import companyService from "../services/company";
import productService from "../services/product";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    session: {
      user: {},
      company: {}
    },
    companies: [],
    products: []
  },
  mutations: {
    setUserSession(state, user) {
      if (Vue.$cookies.isKey("user_session")) {
        state.session.user = user;
        if (user.companyId) {
          state.session.company = state.companies.find(item => item.id === user.companyId);
        }
        state.logged = true;
      } else {
        state.logged = false;
        state.user = null;
      }
    },
    setCompanies(state, companies) {
      state.companies = companies;
    },
    updateCompany(state, company) {
      const item = state.companies.find(item => item.id === company.id);
      Object.assign(item, company);
    },
    addCompany(state, company) {
      state.companies.push(company);
    },
    joinCompany(state, company) {
      state.session.company = company;
    },
    leaveCompany(state) {
      state.session.company = {};
    },
    setProducts(state, products) {
      state.products = products;
    },
    updateProduct(state, product) {
      const item = state.products.find(item => item.id === product.id);
      Object.assign(item, product);
    },
    addProduct(state, product) {
      state.products.push(product);
    },
  },
  getters: {
    getCompany: (state) => (id) => {
      return state.companies.find(item => item.id === id);
    },
    getProduct: (state) => (id) => {
      return state.products.find(item => item.id === id);
    },
    getSessionCompany: (state) => () => {
      return state.products.session.company;
    }
  },
  actions: {
    // ANCHOR: ACTION AUTH
    login(context, payload) {
      return new Promise((resolve, reject) => {
        authService
          .login(payload)
          .then(response => {
            Vue.$cookies.set("user_session", response.data.sessionId, 60 * 15);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    registerUser(context, payload) {
      return new Promise((resolve, reject) => {
        authService
          .register(payload)
          .then(response => {
            Vue.$cookies.set("user_session", response.data.sessionId, 60 * 15);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // ANCHOR: ACTION USER
    getUser(context) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.isKey("user_session")) {
          userService
            .getUser(Vue.$cookies.get("user_session"))
            .then(response => {
              resolve(response);
              context.commit("setUserSession", response.data);
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject({ message: "Not Authorized" });
        }
      });
    },

    // ANCHOR: ACTION COMPANIES
    listCompanies(context) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.isKey("user_session")) {
          companyService
            .list(Vue.$cookies.get("user_session"))
            .then(response => {
              context.commit("setCompanies", response.data);
              resolve(response);
            })
            .catch(error => {
              reject(error);

            });
        } else {
          reject({ message: "Not Authorized" });
        }
      });
    },
    createCompany(context, payload) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.isKey("user_session")) {
          companyService
            .create(Vue.$cookies.get("user_session"), payload)
            .then(response => {
              resolve(response);
              if (response.data) {
                context.commit("addCompany", response.data);
                context.commit("joinCompany", response.data);
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject({ message: "Not Authorized" });
        }
      });
    },
    joinCompany(context, payload) {
      return new Promise((resolve, reject) => {
        companyService
          .join(Vue.$cookies.get("user_session"), payload)
          .then(response => {
            resolve(response);
            context.commit("joinCompany", response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    leaveCompany(context) {
      return new Promise((resolve, reject) => {
        companyService
          .leave(Vue.$cookies.get("user_session"))
          .then(response => {
            resolve(response);
            context("leaveCompany");
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updateCompany(context, payload) {
      return new Promise((resolve, reject) => {
        companyService
          .update(Vue.$cookies.get("user_session"), payload.id, payload)
          .then(response => {
            resolve(response);
            if (response.data) {
              context.commit("updateCompany", response.data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // ANCHOR: ACTION PRODUCTS

    listProducts(context) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.isKey("user_session")) {
          productService
            .list(Vue.$cookies.get("user_session"))
            .then(response => {
              context.commit("setProducts", response.data);
              resolve(response);
            })
            .catch(error => {
              reject(error);

            });
        } else {
          reject({ message: "Not Authorized" });
        }
      });
    },
    createProduct(context, payload) {
      return new Promise((resolve, reject) => {
        if (Vue.$cookies.isKey("user_session")) {
          productService
            .create(Vue.$cookies.get("user_session"), payload)
            .then(response => {
              resolve(response);
              if (response.data) {
                context.commit("addProduct", response.data);
              }
            })
            .catch(error => {
              reject(error);
            });
        } else {
          reject({ message: "Not Authorized" });
        }
      });
    },
    updateProduct(context, payload) {
      return new Promise((resolve, reject) => {
        productService
          .update(Vue.$cookies.get("user_session"), payload.id, payload)
          .then(response => {
            resolve(response);
            if (response.data) {
              context.commit("updateProduct", response.data);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
