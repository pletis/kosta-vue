<template>
  <div>
    <div v-if="view == 0">
      <div>{{ post.post_title }}</div>
      <div>{{ post.post_contents }}</div>
      <div>
        <ion-icon name="settings-outline" @click="setting"></ion-icon>
        <i class="icon ion-md-trash" @click="deleteItem"></i>
      </div>
    </div>
    <PostEditForm @reload="reload" v-else-if="view == 1"></PostEditForm>
    <LoadingSpinner v-else-if="view == 2" />
  </div>
</template>

<script>
import PostEditForm from "@/components/posts/PostEditForm.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import { deletePost } from "@/api/post.js";
export default {
  data() {
    return {
      view: 0,
      post: this.$store.state.post,
      post_num: this.$store.state.post.post_num,
      board_num: this.$store.state.board.board_num,
      team_num: this.$route.params.id,
    };
  },

  methods: {
    setting() {
      this.view = 1;
    },
    reload(post) {
      this.$store.state.post.post_title = post.post_title;
      this.$store.state.post.post_contents = post.post_contents;
      this.view = 0;
    },
    async deleteItem() {
      const post_id = this.post_num;
      const board_id = this.board_num;
      const team_id = this.team_num;
      const { data } = await deletePost(post_id, team_id, board_id);
      console.log(data);
      this.$emit("reload");
    },
  },
  components: {
    PostEditForm,
    LoadingSpinner,
  },
};
</script>

<style></style>
