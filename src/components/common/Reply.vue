<template>
  <div id="reply-container">
    <div id="reply-header">
      <div>{{ reply.reply_writer }}</div>
      <div>
        <i class="icon ion-md-create" @click="editReply(reply)"></i>
        <i class="icon ion-md-trash" @click="deleteItem(reply)"></i>
      </div>
    </div>
    <div>{{ reply.reply_contents }}</div>

    <div class="black-bg" v-if="isModal == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="" class="form">
            <div>
              <label for="chat_name">댓글 수정:</label>
              <input id="chat_name" type="text" v-model="reply_contents" />
            </div>

            <button class="my-btn" id="left-button" @click="isModal = false">
              취소
            </button>

            <button type="submit" class="my-btn" @click="updateItems">
              수정하기
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateReply, deleteReply } from "@/api/reply";
export default {
  props: ["reply"],
  data() {
    return {
      isModal: false,
      reply_contents: this.reply.reply_contents,
    };
  },
  methods: {
    editReply(reply) {
      if (this.$store.state.member.member_num == reply.member_num) {
        this.isModal = true;
      } else {
        alert("댓글 수정 권한이 없습니다.");
      }
    },
    async deleteItem(reply) {
      if (this.$store.state.member.member_num == reply.member_num) {
        const post_id = this.$store.state.post.post_num;
        const board_id = this.$store.state.board.board_num;
        const team_id = this.$route.params.teamId;
        const reply_id = reply.reply_num;
        const { data } = await deleteReply(
          team_id,
          board_id,
          post_id,
          reply_id
        );
        console.log(data);
        this.$emit("deleteItem");
      } else {
        alert("댓글 삭제 권한이 없습니다.");
      }
    },
    async updateItems() {
      const post_id = this.$store.state.post.post_num;
      const board_id = this.$store.state.board.board_num;
      const team_id = this.$route.params.teamId;
      const reply_id = this.reply.reply_num;
      const reply_data = {
        reply_contents: this.reply_contents,
        member_num: this.$store.state.member.member_num,
        post_num: post_id,
      };
      const { data } = await updateReply(
        team_id,
        board_id,
        post_id,
        reply_id,
        reply_data
      );
      console.log(data);
      this.isModal = false;
      this.$emit("deleteItem");
    },
  },
};
</script>

<style>
#reply-container {
  position: relative;
  width: 580px;
  max-height: 300px;
  background: white;
  margin: 10px;
  padding: 10px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
}
#reply-header {
  display: flex;
  justify-content: space-between;
}
.black-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
</style>
