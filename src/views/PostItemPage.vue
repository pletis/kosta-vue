<template>
  <div class="contents main-contents">
    <div
      id="post-header"
      v-if="this.$store.state.board.board_name != undefined"
    >
      <h3 id="main-title">{{ this.$store.state.board.board_name }}</h3>
      <a class="a" @click="post = 1">게시글 작성하기</a>
    </div>

    <ul v-if="post == 0">
      <li v-for="post in maindata" :key="post.post_num">
        <div class="post-title" @click="postdetail(post)">
          {{ post.post_title }}
          <div id="post-writer">{{ post.writer }}</div>
        </div>
        <b-dd-divider></b-dd-divider>
        <div class="post-contents">
          {{ post.post_contents }}
        </div>
        <div class="post-time">
          댓글 수 :
          {{ post.replyCnt }}

          <i class="icon ion-md-trash" @click="deleteItem(post)"></i>
        </div>
      </li>
    </ul>
    <!-- 게시물 작성 페이지 -->
    <div v-else-if="post == 1"><PostPostForm @reload="fetchPosts" /></div>
    <!-- 게시물 상세 페이지 -->
    <div v-else-if="post == 2">
      <PostItemDetail
        :post="post_data"
        @reload="fetchPosts"
        @setting="postEdit"
      />
    </div>
    <!-- 게시물 수정 페이지 -->
    <div v-else-if="post == 3"><PostEditForm /></div>
    <LoadingSpinner v-else-if="post == 4" />
  </div>
</template>

<script>
import PostPostForm from "@/components/posts/PostPostForm.vue";
import PostItemDetail from "@/components/common/PostItemDetail.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import PostEditForm from "@/components/posts/PostEditForm.vue";
import { deletePost } from "@/api/post.js";
export default {
  data() {
    return {
      post: 0,
      post_data: {},
      post_num: this.$store.state.post.post_num,
      board_num: this.$store.state.board.board_num,
      team_num: this.$route.params.id,
    };
  },
  components: {
    PostPostForm,
    LoadingSpinner,
    PostItemDetail,
    PostEditForm,
  },
  methods: {
    async fetchPosts() {
      var start = new Date().getTime();
      this.post = 4;
      await this.$store.dispatch("FETCHPOSTS", this.$route.params.id);
      while (new Date().getTime() < start + 1000);
      this.post = 0;
    },
    async deleteItem(post) {
      if (this.$store.state.member.member_num == post.member_num) {
        const post_id = post.post_num;
        const board_id = this.board_num;
        const team_id = this.team_num;
        const { data } = await deletePost(post_id, team_id, board_id);
        console.log(data);
        this.fetchPosts();
      } else {
        alert("권한이 없습니다.");
      }
    },
    postdetail(post) {
      this.$store.commit("setPost", post);
      this.post = 2;
    },
    postEdit(post) {
      this.$store.commit("setPost", post);
      this.post_data = post;
      this.post = 1;
    },
  },
  computed: {
    maindata() {
      return this.$store.state.maindata;
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

ul > li {
  position: relative;
  width: 300px;
  height: 250px;
  background: white;
  margin: 10px;
  padding: 10px 20px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}

.post-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.post-contents {
  height: 160px;
  overflow-y: auto;
  font-size: 18px;
}
.post-time {
  position: absolute;
  bottom: 4px;
  right: 5px;
  font-size: 14px;
  color: #9e9e9e;
}
#post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

#post-writer {
  position: absolute;
  bottom: 4px;
  top: 30px;
  right: 18px;
  font-size: 14px;
  font-weight: 500;
  color: #9e9e9e;
}
</style>
