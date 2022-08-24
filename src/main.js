import  { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { createStore } from "vuex";


loadFonts();
const store = createStore({
  state: () => ({
    authUser: {},
    isAuthenticated: false,
    jwt: localStorage.getItem("token"),
    endpoints: {
      // TODO: Remove hardcoding of dev endpoints
      obtainJWT: "http://127.0.0.1:8000/api-auth/jwt/create",
      refreshJWT: "http://127.0.0.1:8000/api/token/refresh/",
      baseUrl: "http://127.0.0.1:8000/user",
    },
  }),

  mutations: {
    setAuthUser(state, { authUser, isAuthenticated }) {
      state.authUser = authUser;
      state.isAuthenticated = isAuthenticated;
    },
    updateToken(state, newToken) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.setItem("token", newToken);
      state.jwt = newToken;
    },
    removeToken(state) {
      // TODO: For security purposes, take localStorage out of the project.
      localStorage.removeItem("token");
      state.jwt = null;
    },
  },
});


createApp(App).use(router).use(vuetify).use(store).mount("#app");
