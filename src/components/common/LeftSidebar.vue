<template>
  <div id="main-page">
    <div class="left">
      <h3 id="left-title">팀 {{ team_id }}에 접속중</h3>

      <!-- 토픽 헤더 + 추가버튼 -->
      <b-dd-divider></b-dd-divider>
      <div class="main-topic-container">
        <label>토픽</label>
        <span id="" class="main-create-button" @click="isModal2 = true">
          <i class="ion-md-add"></i>
        </span>
      </div>

      <b-dd-divider></b-dd-divider>

      <!-- 토픽 리스트 -->
      <LoadingSpinner v-if="isLoading" />
      <div v-else class="left-ul">
        <ul v-for="board in boards" :key="board.board_num">
          <div class="main-list-container">
            <a class="a" @click="fetchPosts(board)">{{ board.board_name }}</a>
            <div>
              <ion-icon
                name="settings-outline"
                @click="updateBoardModal(board)"
              ></ion-icon>
              <i class="icon ion-md-trash" @click="deleteItem(board)"></i>
            </div>
          </div>
        </ul>
      </div>

      <b-dd-divider></b-dd-divider>

      <!-- 채팅해더 + 추가버튼 -->
      <div class="main-topic-container">
        <label>채팅</label>
        <span class="main-create-button" @click="isModal3 = true">
          <i class="ion-md-add"></i>
        </span>
      </div>

      <b-dd-divider></b-dd-divider>

      <!-- 채팅 리스트 -->
      <LoadingSpinner v-if="isLoading2" />
      <div v-else class="left-ul">
        <ul v-for="chat in chatList" :key="chat.chatRoom_num">
          <div class="main-list-container">
            <a class="a" @click="fetchPosts(chat)">{{ chat.chatRoom_name }}</a>
            <div>
              <ion-icon
                name="settings-outline"
                @click="updateChatModal(chat)"
              ></ion-icon>
              <i class="icon ion-md-trash" @click="deleteChatRoom(chat)"></i>
            </div>
          </div>
        </ul>
      </div>
    </div>

    <!-- 모달들 -->

    <div class="black-bg" v-if="isModal2 == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="submitForm2" class="form">
            <div>
              <label for="board_name">토픽 이름:</label>
              <input id="board_name" type="text" v-model="board_name" />
            </div>
            <div>
              <label for="board_info">토픽 설명:</label>
              <textarea
                id="board_info"
                type="text"
                v-model="board_info"
                rows="10"
              />
            </div>

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>

            <button type="submit" class="my-btn">작성하기</button>
          </form>
        </div>
      </div>
    </div>

    <div class="black-bg" v-if="isModal == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="submitForm" class="form">
            <div>
              <label for="board_name">토픽 이름:</label>
              <input id="board_name" type="text" v-model="board_name" />
            </div>
            <div>
              <label for="board_info">토픽 설명:</label>
              <textarea
                id="board_info"
                type="text"
                v-model="board_info"
                rows="10"
              />
            </div>

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn">수정완료</button>
          </form>
        </div>
      </div>
    </div>

    <!-- 채팅 모달 -->

    <div class="black-bg" v-if="isModal3 == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="" class="form">
            <div>
              <label for="chat_name">채팅방 이름:</label>
              <input id="chat_name" type="text" v-model="chat_name" />
            </div>

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>

            <button type="submit" class="my-btn" @click="createChatRoom">
              작성하기
            </button>
          </form>
        </div>
      </div>
    </div>

    <div class="black-bg" v-if="isModal4 == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="" class="form">
            <div>
              <label for="chat_name">채팅방 이름:</label>
              <input id="chat_name" type="text" v-model="chat_name" />
            </div>

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn" @click="updateChatRoom">
              수정완료
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createBoard, deleteBoard, updateBoard } from "@/api/board";
import { updateChatRoom, createChatRoom, deleteChatRoom } from "@/api/chat";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

export default {
  props: {
    boards: {
      type: Array,
      required: true,
    },
    chatList: {
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

    async createChatRoom() {
      try {
        this.isModal3 = false;
        // 1초 지연 주어 스피너 보여주기
        var start = new Date().getTime();
        this.isLoading2 = true;
        const team_id = this.team_id;
        const chatRoom_data = {
          chatRoom_name: this.chat_name,
          team_num: this.team_id,
        };
        const { data } = await createChatRoom(team_id, chatRoom_data);
        console.log(data);
        this.$emit("chatRoomlist");
        // 1초 지연 실행
        while (new Date().getTime() < start + 1000);
        this.resetModal();
        this.isLoading2 = false;
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

    async deleteChatRoom(chat) {
      try {
        var start = new Date().getTime();
        this.isLoading2 = true;
        const team_id = this.team_id;
        const chatRoom_id = chat.chatRoom_num;
        const { data } = await deleteChatRoom(team_id, chatRoom_id);
        console.log(data);
        this.$emit("chatRoomlist");
        // 1초 지연 실행
        while (new Date().getTime() < start + 1000);
        this.isLoading2 = false;
      } catch (error) {
        console.log(error);
      }
    },

    fetchPosts(board) {
      this.$emit("reload", board);
    },
    fetchChats() {},

    async updateBoard() {
      var start = new Date().getTime();
      this.isLoading = true;
      const team_id = this.team_id;
      const board_id = this.board_num;
      const boardData = {
        board_name: this.board_name,
        board_info: this.board_info,
        member_num: this.member_num,
      };
      const { data } = await updateBoard(team_id, board_id, boardData);
      console.log(data);
      this.$emit("boardlist");
      // 1초 지연 실행
      while (new Date().getTime() < start + 1000);
      this.isLoading = false;
      this.board_name = "";
      this.board_info = "";
    },

    async updateChatRoom() {
      try {
        this.isModal4 = false;
        // 1초 지연 주어 스피너 보여주기
        var start = new Date().getTime();
        this.isLoading2 = true;
        const team_id = this.team_id;
        const chatRoom_id = this.chat_num;
        const chatRoom_data = {
          chatRoom_name: this.chat_name,
          team_num: this.team_id,
        };
        const { data } = await updateChatRoom(
          team_id,
          chatRoom_id,
          chatRoom_data
        );
        console.log(data);
        this.$emit("chatRoomlist");
        // 1초 지연 실행
        while (new Date().getTime() < start + 1000);
        this.resetModal();
        this.isLoading2 = false;
      } catch (error) {
        console.log(error);
      }
    },

    //모달 메소드
    updateBoardModal(board) {
      this.isModal = true;
      this.board_name = board.board_name;
      this.board_info = board.board_info;
      this.board_num = board.board_num;
    },

    updateChatModal(chat) {
      this.isModal4 = true;
      this.chat_name = chat.chatRoom_name;
      this.chat_num = chat.chatRoom_num;
    },

    resetModal() {
      this.isModal = false;
      this.isModal2 = false;
      this.isModal3 = false;
      this.isModal4 = false;
      this.board_name = "";
      this.board_info = "";
      this.chat_name = "";
      this.chat_info = "";
    },
    resetModal2(board) {
      board.board_name = "";
      board.board_info = "";
    },

    submitForm2() {
      // 값이 유효하면 서버에 요청
      this.insertBoard(this.team_id);
      this.isModal2 = false;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    submitForm() {
      this.isModal = false;
      this.updateBoard();
    },
  },
  data() {
    return {
      team_id: this.$route.params.teamId,
      member_num: 1,
      board_num: "",
      board_name: "",
      board_info: "",
      chat_name: "",
      chat_num: "",
      nameState: null,
      isLoading: false,
      isLoading2: false,
      isModal: false,
      isModal2: false,
      isModal3: false,
      isModal4: false,
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

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
