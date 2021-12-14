<template>
  <div>
    <div id="detail-container" v-if="view == 0">
      <div id="header">
        <h2>{{ post.post_title }}</h2>
        <div>
          <i class="icon ion-md-create" @click="setting(post)"></i>
          <i class="icon ion-md-trash" @click="deleteItem(post)"></i>
        </div>
      </div>

      <div id="content">
        <b-dd-divider></b-dd-divider>
        <h3>{{ post.post_contents }}</h3>
      </div>
      <div id="footer">
        <Reply
          v-for="reply in replys"
          :key="reply.reply_num"
          :reply="reply"
          @deleteItem="getListReply"
        />
        <div>
          <textarea
            id="reply_content"
            type="text"
            v-model="reply_content"
            rows="3"
          />
          <button type="submit" class="my-btn" @click="insertReply">
            댓글달기
          </button>
        </div>
      </div>
    </div>
    <PostEditForm @reload="reload" v-else-if="view == 1"></PostEditForm>
    <LoadingSpinner v-else-if="view == 2" />
  </div>
</template>

<script>
import PostEditForm from "@/components/posts/PostEditForm.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import Reply from "@/components/common/Reply.vue";
import { deletePost } from "@/api/post.js";
import { insertReply, getListReply } from "@/api/reply.js";
export default {
  data() {
    return {
      isModal: true,
      view: 0,
      post: this.$store.state.post,
      post_num: this.$store.state.post.post_num,
      board_num: this.$store.state.board.board_num,
      team_num: this.$route.params.teamId,
      replys: [],
      reply_content: "",
    };
  },

  methods: {
    setting(post) {
      if (this.$store.state.member.member_num == post.member_num) {
        this.view = 1;
      } else {
        alert("권한이 없습니다.");
      }
    },
    reload(post) {
      this.$store.state.post.post_title = post.post_title;
      this.$store.state.post.post_contents = post.post_contents;
      this.view = 0;
    },
    async deleteItem(post) {
      if (this.$store.state.member.member_num == post.member_num) {
        const post_id = this.post_num;
        const board_id = this.board_num;
        const team_id = this.team_num;
        const { data } = await deletePost(post_id, team_id, board_id);
        console.log(data);
        this.$emit("reload");
      } else {
        alert("권한이 없습니다.");
      }
    },
    async insertReply() {
      const post_id = this.post_num;
      const board_id = this.board_num;
      const team_id = this.team_num;
      const reply = {
        reply_contents: this.reply_content,
        reply_writer: this.$store.state.user.user_name,
        member_num: this.$store.state.member.member_num,
      };
      const { data } = await insertReply(team_id, board_id, post_id, reply);
      console.log(data);
      this.getListReply();
    },
    async getListReply() {
      const post_id = this.post_num;
      const board_id = this.board_num;
      const team_id = this.team_num;
      const { data } = await getListReply(team_id, board_id, post_id);
      console.log(data);
      this.replys = data;
    },
  },
  created() {
    this.getListReply();
  },
  components: {
    PostEditForm,
    LoadingSpinner,
    Reply,
  },
};
</script>

<style scoped>
#header {
  width: 600px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}
#detail-container {
  margin-top: 30px;
  padding: 5px;
  width: 700px;
  max-height: 700px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  overflow-y: scroll;
}

#content {
  width: 600px;
  height: 300px;
  margin: 0 auto;
}

#footer {
  width: 600px;
  margin-right: auto;
  margin-left: auto;
}

#post_contents {
  width: 600px;
}

#reply-header {
  display: flex;
  justify-content: space-between;
}
#reply_content {
  font-family: inherit;
  font-size: 100%;
  width: 100%;
  border: 1px solid #dae1e7;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
}
</style>
