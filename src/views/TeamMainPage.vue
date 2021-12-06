<template>
  <div>
    <RightSidebar />
    <LeftSidebar
      :boards="boards"
      :chatList="chatList"
      @boardlist="getBoardList"
      @reload="fetchPosts"
    ></LeftSidebar>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <Maindata v-else :boards="boards" />
  </div>
</template>

<script>
import LeftSidebar from "@/components/common/LeftSidebar.vue";
import RightSidebar from "@/components/common/RightSidebar.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import Maindata from "@/components/Maindata.vue";
import { getPostList } from "@/api/post";
import { getBoard } from "@/api/board";
import { getChatList } from "@/api/chat";
export default {
  data() {
    return {
      boards: [],
      chatList: [],
      isLoading: false,
    };
  },
  components: {
    Maindata,
    LeftSidebar,
    RightSidebar,
    LoadingSpinner,
  },
  methods: {
    async getBoardList() {
      const id = this.$route.params.id;
      const { data } = await getBoard(id);
      console.log("data", data);
      this.boards = data;
    },
    async getChatList() {
      const id = this.$route.params.id;
      const { data } = await getChatList(id);
      console.log("data", data);
      this.chats = data;
    },
    async fetchPosts(board) {
      var start = new Date().getTime();
      this.isLoading = true;
      const team_id = this.team_id;
      const board_id = board.board_num;
      const { data } = await getPostList(team_id, board_id);
      console.log(data.getListPost);
      this.$store.commit("setMaindata", data.getListPost);
      this.$store.commit("setBoard", board);
      while (new Date().getTime() < start + 1000);
      this.isLoading = false;
    },
  },
  created() {
    this.getBoardList();
    // this.getChatList();
  },
};
</script>

<style></style>
