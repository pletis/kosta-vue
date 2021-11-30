import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    user: {
      user_num: 1,
      user_name: "1234",
      user_phonenum: "1234",
      user_email: "1234@naver.com",
      user_pw: "1234",
      user_birth: "1234",
      user_pwhint: "1234",
    },
  },
  getters: {
    isLogin(state) {
      return state.username !== "";
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = "";
    },
  },
});
