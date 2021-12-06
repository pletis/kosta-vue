<template>
  <div id="main-page">
    <div class="left">
      <h3 id="left-title">팀 {{ team_id }}에 접속중</h3>

      <b-dd-divider></b-dd-divider>
      <div class="main-topic-container">
        <label>토픽</label>
        <span class="main-create-button" v-b-modal.modal-prevent-closing>
          <i class="ion-md-add"></i>
        </span>
      </div>

      <b-dd-divider></b-dd-divider>
      <LoadingSpinner v-if="isLoading" />
      <div v-else class="left-ul">
        <ul v-for="board in boards" :key="board.board_num">
          <div class="main-list-container">
            <a class="a" @click="fetchPosts(board)">{{ board.board_name }}</a>
            <div>
              <ion-icon name="settings-outline"></ion-icon>
              <i class="icon ion-md-trash" @click="deleteItem(board)"></i>
            </div>
          </div>
        </ul>
      </div>

      <b-dd-divider></b-dd-divider>

      <div class="main-topic-container">
        <label>채팅</label>
        <span class="main-create-button" v-b-modal.modal-prevent-closing>
          <i class="ion-md-add"></i>
        </span>
      </div>

      <b-dd-divider></b-dd-divider>
      <LoadingSpinner v-if="isLoading" />
      <div v-else class="left-ul">
        <ul v-for="board in boards" :key="board.board_num">
          <div class="main-list-container">
            <a class="a" @click="fetchPosts(board)">{{ board.board_name }}</a>
            <div>
              <ion-icon name="settings-outline"></ion-icon>
              <i class="icon ion-md-trash" @click="deleteItem(board)"></i>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="팀 생성하기"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form class="form" @submit.stop.prevent="handleSubmit">
        <div>
          <label for="board_name">팀 이름:</label>
          <input id="board_name" type="text" v-model="board_name" />
        </div>
        <div>
          <label for="board_info">팀 정보:</label>
          <textarea id="board_info" type="text" v-model="board_info" />
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { createBoard, deleteBoard } from "@/api/board";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
  },
  components: {
    LoadingSpinner,
  },
  methods: {
    async insertBoard(team_id) {
      try {
        // 1초 지연 주어 스피너 보여주기
        var start = new Date().getTime();
        this.isLoading = true;
        const boardData = {
          board_name: this.board_name,
          board_info: this.board_info,
          member_num: this.member_num,
        };
        const { data } = await createBoard(team_id, boardData);
        console.log(data);
        this.$emit("boardlist");
        // 1초 지연 실행
        while (new Date().getTime() < start + 1000);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(board) {
      try {
        // 1초 지연 주어 스피너 보여주기
        var start = new Date().getTime();
        this.isLoading = true;
        const team_id = this.team_id;
        const board_id = board.board_num;
        const { data } = await deleteBoard(team_id, board_id);
        console.log(data);
        this.$emit("boardlist");
        // 1초 지연 실행
        while (new Date().getTime() < start + 1000);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
    fetchPosts(board) {
      this.$emit("reload", board);
    },

    //모달 메소드
    resetModal() {
      this.board_name = "";
      this.board_info = "";
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      // 값이 유효하면 서버에 요청
      this.insertBoard(this.team_id);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
  data() {
    return {
      team_id: this.$route.params.id,
      member_num: 1,
      board_name: "",
      board_info: "",
      nameState: null,
      submittedNames: [],
      isLoading: false,
    };
  },
};
</script>

<style>
.left {
  position: fixed;
  top: 0px;
  width: 250px;
  height: 100vh;
  background: white;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.left-ul {
  height: 250px;
  overflow-y: scroll;
}
ul {
  padding-left: 10px;
}
</style>
