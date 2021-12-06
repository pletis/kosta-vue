import Vue from "vue";
import Vuex from "vuex";
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from "@/utils/cookies";
import { loginUser } from "@/api/auth";
import { getPostList } from "@/api/post";

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
    member: {},
    maindata: {},
    board: {},
    post: {},
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
    setMaindata(state, maindata) {
      state.maindata = maindata;
    },
    clearMain(state) {
      state.maindata = {};
    },
    setBoard(state, title) {
      state.board = title;
    },
    setPost(state, post) {
      state.post = post;
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
    async FETCHPOSTS({ commit }, team_id) {
      // state 에 있는 board 객체의 board_num 을 가져온다
      // left sidebar 에 있는 board 목록을 눌렀을 때 board 가 그걸로 초기화 되기 때문에
      // board_num 은 누른 board
      const board_id = this.state.board.board_num;
      const { data } = await getPostList(team_id, board_id);
      console.log(data.getListPost);
      commit("setMaindata", data.getListPost);
    },
  },
});
