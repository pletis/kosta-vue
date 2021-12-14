<template>
  <div class="contents">
    <h1>게시글 수정</h1>
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

        <button type="submit" class="my-btn">수정완료</button>
      </form>
    </div>
  </div>
</template>

<script>
import { updatePost } from "@/api/post";

export default {
  data() {
    return {
      post_title: this.$store.state.post.post_title,
      post_contents: this.$store.state.post.post_contents,
      post_num: this.$store.state.post.post_num,
      board_num: this.$store.state.board.board_num,
      team_num: this.$route.params.id,
    };
  },

  methods: {
    async submitForm() {
      const post_id = this.post_num;
      const board_id = this.board_num;
      const team_id = this.team_num;
      const post = {
        post_title: this.post_title,
        post_contents: this.post_contents,
      };
      const { data } = await updatePost(post_id, team_id, board_id, post);
      console.log(data);
      this.$emit("reload", post);
    },
  },
};
</script>

<style></style>
