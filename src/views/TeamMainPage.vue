<template>
  <div>
    <RightSidebar />
    <LeftSidebar :boards="boards" @boardlist="getBoardList"></LeftSidebar>
    <Maindata />
  </div>
</template>

<script>
import LeftSidebar from "@/components/common/LeftSidebar.vue";
import RightSidebar from "@/components/common/RightSidebar.vue";
import Maindata from "@/components/Maindata.vue";

import { getBoard } from "@/api/board";
export default {
  data() {
    return {
      boards: [],
    };
  },
  components: {
    Maindata,
    LeftSidebar,
    RightSidebar,
  },
  methods: {
    async getBoardList() {
      const id = this.$route.params.id;
      const { data } = await getBoard(id);
      console.log("data", data);
      this.boards = data;
    },
  },
  created() {
    this.getBoardList();
  },
};
</script>

<style></style>
