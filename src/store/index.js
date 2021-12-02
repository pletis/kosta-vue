import Vue from "vue";
import Vuex from "vuex";
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from "@/utils/cookies";
import { loginUser } from "@/api/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || "",
    token: getAuthFromCookie() || "",
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
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(userData);
      console.log(data);
      commit("setUsername", this.username);
      // 서버에서 user객체 받아오면 store에 저장하는 부분
      // commit("setUser", data);
      // 쿠키에 인증값 보존하기
      // token 값과 user 정보를 쿠키에 저장한다.
      saveAuthToCookie();
      saveUserToCookie(this.username);
      return data;
    },
  },
});
