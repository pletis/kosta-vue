<template>
  <div id="main-page">
    <div>
      <div class="icon-bar">
        <b-dropdown id="dropdown-dropleft" dropleft text="" class="m-2">
          <b-dropdown-item href="#">+ 새로운 멤버 초대하기</b-dropdown-item>
          <b-dropdown-item href="#">팀 전환하기</b-dropdown-item>
          <b-dropdown-item href="/main">잔디 메인으로</b-dropdown-item>
          <b-dropdown-item href="/">로그아웃</b-dropdown-item>
        </b-dropdown>

        <a @click="enter2" class="right-side-bar-item" to="/about">할일</a>
        <a @click="enter3" class="right-side-bar-item" to="/about">투표</a>
        <a @click="enter4" class="right-side-bar-item" to="/about">조직</a>
      </div>
      <div class="search-form" v-if="fade2">
        <TodoList />
      </div>
      <div class="search-form" v-if="fade3"><VoteList /></div>
      <div class="search-form" v-if="fade4"><h1>조직</h1></div>
    </div>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import VoteList from "@/components/VoteList.vue";
export default {
  data() {
    return {
      todoItem: [],
      todo_endDate: "",
      isModal: false,
      fade: false,
      fade2: false,
      fade3: false,
      fade4: false,
    };
  },
  components: {
    TodoList,
    VoteList,
  },
  methods: {
    enter: function () {
      this.fade = !this.fade;
      this.fade2 = false;
      this.fade3 = false;
      this.fade4 = false;
    },
    enter2: function () {
      this.fade2 = !this.fade2;
      this.fade = false;
      this.fade3 = false;
      this.fade4 = false;
    },
    enter3: function () {
      this.fade3 = !this.fade3;
      this.fade = false;
      this.fade2 = false;
      this.fade4 = false;
    },
    enter4: function () {
      this.fade4 = !this.fade4;
      this.fade = false;
      this.fade2 = false;
      this.fade3 = false;
    },
  },
};
</script>

<style>
.icon-bar {
  height: 100vh;
  width: 40px;
  background-color: white;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  /*z-index: 1;*/ /* Stay on top */
  top: 0; /* Stay at the top */
  right: 0;
  /* Disable horizontal scroll */
  padding-top: 0;
}

.icon-bar .right-side-bar-item {
  display: block;
  text-align: center;
  padding: 0px;
  color: black;
  font-size: 20px;
  text-decoration: none;
  margin-bottom: 10px;
}

.active {
  background-color: #5eaf13;
}

.search-form {
  height: 100vh;
  width: 400px;
  background-color: white;
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1;
  right: 40px;
  padding-top: 0;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
}
</style>
