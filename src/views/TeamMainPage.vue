<template>
  <div>
    <RightSidebar />
    <LeftSidebar
      :boards="boards"
      :chatList="chatList"
      @boardlist="getBoardList"
      @chatRoomlist="getChatList"
      @reloadBoard="fetchPosts"
    ></LeftSidebar>
    <LoadingSpinner v-if="isLoading" />
    <MainDataPage v-else />
  </div>
</template>

<script>
import LeftSidebar from "@/components/common/LeftSidebar.vue";
import RightSidebar from "@/components/common/RightSidebar.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import MainDataPage from "@/views/MainDataPage.vue";

import { getPostList } from "@/api/post";
import { getBoard } from "@/api/board";
import { getChatRoomList, loadChatMember } from "@/api/chat";
import { loadTeamMember } from "@/api/team";
export default {
  data() {
    return {
      boards: [],
      chatList: [],
      items: [],
      isLoading: false,
      team_id: this.$route.params.team_Id,
    };
  },
  components: {
    LeftSidebar,
    RightSidebar,
    LoadingSpinner,
    MainDataPage,
  },
  methods: {
    async getBoardList() {
      const id = this.$route.params.teamId;
      const { data } = await getBoard(id);
      console.log("data", data);
      this.boards = data;
    },
    async getChatList() {
      const id = this.$route.params.teamId;
      const { data } = await getChatRoomList(id);
      console.log("data", data);
      this.chatList = data;
    },
    async loadChatMember() {
      const id = this.$route.params.teamId;
      const { data } = await loadChatMember(id);
      console.log("data", data);
    },
    async fetchPosts(board) {
      var start = new Date().getTime();
      this.isLoading = true;
      const team_id = this.$route.params.teamId;
      const board_id = board.board_num;
      const { data } = await getPostList(team_id, board_id);
      console.log(data);
      this.$store.commit("setMaindata", data);
      this.$store.commit("setBoard", board);
      while (new Date().getTime() < start + 1000);
      this.isLoading = false;
    },

    async loadTeamMember() {
      const user_num = this.$store.state.user.user_num;
      const team_num = this.$route.params.teamId;
      const { data } = await loadTeamMember(user_num, team_num);
      console.log("멤버데이터:", data);
      this.$store.commit("setMember", data);
    },

    add() {
      this.items.push("ChatItemPage");
    },
  },
  created() {
    this.getBoardList();
    this.getChatList();
    this.loadChatMember();
    this.loadTeamMember();
  },
};
</script>

<style></style>
