<template>
  <div id="main-page">
    <div>
      <div class="icon-bar">
        <b-dropdown id="dropdown-dropleft" dropleft text="" class="m-2">
          <b-dropdown-item @click="invite = true"
            >+ 새로운 멤버 초대하기</b-dropdown-item
          >
          <b-dropdown-item href="#">팀 전환하기</b-dropdown-item>
          <b-dropdown-item href="/main">잔디 메인으로</b-dropdown-item>
          <b-dropdown-item href="/">로그아웃</b-dropdown-item>
        </b-dropdown>

        <a @click="enter2" class="right-side-bar-item" to="/about"
          ><font-awesome-icon icon="sticky-note" size="lg" class="mr-2" />
        </a>
        <a @click="enter3" class="right-side-bar-item" to="/about"
          ><font-awesome-icon icon="vote-yea" size="lg" class="mr-2"
        /></a>
      </div>
      <transition name="fade">
        <div class="search-form" v-if="fade2">
          <TodoList />
        </div>
      </transition>
      <transition name="fade">
        <div class="search-form" v-if="fade3"><VoteList /></div>
      </transition>
      <div class="search-form" v-if="fade4"><h1>조직</h1></div>
    </div>
    <inviteModal v-if="invite == true" @invite="invite = false" />
  </div>
</template>

<script>
import TodoList from "@/components/TodoList.vue";
import VoteList from "@/components/VoteList.vue";
import inviteModal from "@/components/inviteModal.vue";
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
      invite: false,
    };
  },
  components: {
    TodoList,
    VoteList,
    inviteModal,
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

.mr-2 {
  cursor: pointer;
  color: rgb(35, 127, 0);
  margin-top: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
