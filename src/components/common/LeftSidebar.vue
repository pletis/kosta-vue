<template>
  <div id="main-page">
    <ChatItemPage v-for="chat in chats" :key="chat.chatRoom_num" :chat="chat" />
    <div class="left">
      <h3 id="left-title">{{ team_name }}</h3>

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
            <a class="a" @click="fetchChatRoom(chat)">{{
              chat.chatRoom_name
            }}</a>
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
            <div>
              <label for="chat_name">초대인원:</label>
              <input id="chat_name" type="text" v-model="selectMember_email" />
            </div>
            <inviteChatMember
              v-for="inviteMember in inviteMembers"
              :key="inviteMember.user_num"
              :inviteMember="inviteMember"
              @memberSelect="memberSelect"
            />

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn" @click="updateChatRoom(chat)">
              수정완료
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMembers,
  getInviteChatMember,
  inviteChatMembers,
} from "@/api/member";
import { createBoard, deleteBoard, updateBoard } from "@/api/board";
import inviteChatMember from "@/components/inviteChatMember.vue";
import {
  updateChatRoom,
  createChatRoom,
  deleteChatRoom,
  // fetchChatRoom,
} from "@/api/chat";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import ChatItemPage from "@/components/common/ChatItemPage.vue";

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
    ChatItemPage,
    inviteChatMember,
  },
  methods: {
    memberSelect: function (member) {
      this.selectMember = member;
      this.selectMember_email = member.user.user_email;
      console.log(this.selectMember);
    },
    getMembers: async function () {
      const team_id = this.$route.params.teamId;
      const { data } = await getMembers(team_id);
      console.log(data);
    },
    getInviteChatMember: async function (chat) {
      const team_id = this.$route.params.teamId;
      const chat_id = chat.chatRoom_num;
      const { data } = await getInviteChatMember(team_id, chat_id);
      this.inviteMembers = data;
      console.log(data);
    },
    inviteChatMembers: async function () {
      const team_id = this.$route.params.teamId;
      const chat_id = this.chat.chatRoom_num;
      const invite_data = {
        chatRoom_num: chat_id,
        member_num: this.selectMember.member_num,
      };
      const { data } = await inviteChatMembers(team_id, chat_id, invite_data);
      console.log(data);
    },
    async insertBoard() {
      try {
        const team_id = this.team_id;
        const member_num = this.$store.state.member.member_num;
        // 1초 지연 주어 스피너 보여주기
        var start = new Date().getTime();
        this.isLoading = true;
        const boardData = {
          board_name: this.board_name,
          board_info: this.board_info,
          member_num: member_num,
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
      this.$emit("reloadBoard", board);
    },
    async fetchChatRoom(chat) {
      console.log(chat);
      this.chats.push(chat);
    },

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

    async updateChatRoom(chat) {
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
        this.inviteChatMembers(chat);
        // 1초 지연 실행
        while (new Date().getTime() < start + 1000);
        this.resetModal();
        this.isLoading2 = false;
      } catch (error) {
        console.log(error);
      }
    },

    closeChatRoom: function () {
      console.log("close");
      this.chats = [];
    },

    //모달 메소드
    updateBoardModal(board) {
      if (this.member_num == board.member_num) {
        this.isModal = true;
        this.board_name = board.board_name;
        this.board_info = board.board_info;
        this.board_num = board.board_num;
      } else {
        alert("권한이 없습니다.");
      }
    },

    updateChatModal(chat) {
      // this.getMembers();
      this.getInviteChatMember(chat);
      this.chat = chat;
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
      this.insertBoard();
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
      team_name: this.$store.state.teamname,
      member_num: this.$store.state.member.member_num,
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
      isModal5: false,
      chats: [],
      chat: [],
      inviteMembers: "",
      selectMember: "",
      selectMember_email: "",
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
  z-index: 0;
}

.left-ul {
  height: 250px;
  overflow-y: scroll;
}
ul {
  padding-left: 10px;
}
</style>
