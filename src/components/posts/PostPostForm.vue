<template>
  <div class="contents">
    <h1>게시글 작성</h1>
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="post_title">게시물 이름:</label>
          <input id="post_title" type="text" v-model="post_title" />
        </div>
        <div>
          <label for="post">게시물 내용:</label>
          <textarea
            id="post_contents"
            type="text"
            v-model="post_contents"
            rows="10"
          />
        </div>
        <p class="validation-text warning" v-if="!isContentsValid">
          설명이 너무 길어요!
        </p>
        <button type="submit" class="my-btn">생성하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createPost } from "@/api/post";

export default {
  data() {
    return {
      team_id: this.$route.params.id,
      post_title: "",
      post_contents: "",
      member_num: 1,
      board_num: this.$store.state.board.board_num,
      logMessage: "",
    };
  },
  computed: {
    isContentsValid() {
      return this.post_contents.length <= 500;
    },
  },
  methods: {
    async submitForm() {
      const team_id = this.team_id;
      const board_id = this.board_num;
      const post = {
        post_title: this.post_title,
        post_contents: this.post_contents,
        member_num: this.member_num,
      };
      const { data } = await createPost(team_id, board_id, post);
      console.log(data);
      this.$emit("reload");
    },
  },
};
</script>

<style></style>
