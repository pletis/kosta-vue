<template>
  <div class="contents main-contents">
    <div
      id="post-header"
      v-if="this.$store.state.board.board_name != undefined"
    >
      <h3 id="main-title">{{ this.$store.state.board.board_name }}</h3>
      <a class="a" @click="post = 1">게시글 작성하기</a>
    </div>
    <div id="actived" v-if="post == 0">
      <div class="grid">
        <div class="grid_body" v-for="post in maindata" :key="post.post_num">
          <div>{{ post.post_title }}</div>
          <div>{{ post.post_contents }}</div>
        </div>
      </div>
    </div>
    <div v-else-if="post == 1"><PostPostForm @reload="fetchPosts" /></div>
    <div v-else-if="post == 2"></div>
    <LoadingSpinner v-else-if="post == 3" />
  </div>
</template>

<script>
import PostPostForm from "@/components/posts/PostPostForm.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
export default {
  data() {
    return {
      post: 0,
    };
  },
  components: {
    PostPostForm,
    LoadingSpinner,
  },
  methods: {
    async fetchPosts() {
      var start = new Date().getTime();
      this.post = 3;
      await this.$store.dispatch("FETCHPOSTS", this.$route.params.id);
      while (new Date().getTime() < start + 1000);
      this.post = 0;
    },
  },
  computed: {
    maindata() {
      return this.$store.state.maindata;
    },
  },
};
</script>

<style>
#actived {
  padding: 0 35px;
}
#actived .grid_body {
  width: 200px;
  display: inline-block;
  margin: 15px;
  padding: 0;
  cursor: pointer;
}
#actived .grid_body div {
  background: rgb(35, 127, 0);
  padding: 7px 10px;
  color: #ffffff;
  text-align: left;
  position: relative;
}

#actived .grid_body ul {
  width: 200px;
  padding: 0;
  border-bottom: 0;
  border-spacing: 0;
  display: none;
}
#actived .grid_body ul li {
  background: #ffffff;
  padding: 6px 8px;
  border: 1px solid #707070;
  border-top: 0;
}

#post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
