<template>
  <DraggableDiv class="col-11">
    <template slot="header">
      <h3>{{ chat.chatRoom_name }}</h3>
    </template>
    <template slot="main">
      <div id="chats" v-for="chat in chats" :key="chat.chat_num">
        {{ chat.chat_contents }}
      </div>
    </template>
    <template slot="footer">
      <div class="form-wrapper form-wrapper-sm">
        <div class="form">
          <input id="message" type="text" v-model="message" />
        </div>
        <button class="my-btn" @click="send">채팅전송</button>
      </div>
    </template>
  </DraggableDiv>
</template>

<script>
import DraggableDiv from "./DraggableDiv";
import { loadChatdetail, sendChat } from "@/api/chat";
export default {
  data() {
    return {
      chats: [],
      websocket: {},
      message: "",
    };
  },
  props: {
    chat: {
      type: Object,
      required: true,
    },
  },
  components: {
    DraggableDiv,
  },
  methods: {
    async send() {
      try {
        this.chats.push({
          chat_num: this.chats.length + 1,
          chat_contents: this.message,
        });
        const chatRoom_id = this.chat.chatRoom_num;
        const team_id = this.$route.params.teamId;
        const chat_contents = {
          chatMember_num: 6,
          chat_contents: this.message,
        };
        const { data } = await sendChat(team_id, chatRoom_id, chat_contents);

        console.log(data);
        const message = this.message;
        if (message) {
          this.websocket.send(this.chat.chatRoom_num + "+" + message);
          this.message = "";
        }
      } catch (error) {
        console.log(error);
      }
    },

    socketOnmessage(message) {
      return message.replace(/^[0-9]+\+/i, "");
    },
    async loadChatdetail() {
      const chatRoom_id = this.chat.chatRoom_num;
      const team_id = this.$route.params.teamId;
      const { data } = await loadChatdetail(team_id, chatRoom_id);

      this.chats = data;
      this.websocket = new WebSocket(
        `ws://localhost:8888/chatsocket/${chatRoom_id}`
      );
      this.websocket.onopen = (message) => {
        console.log("연결" + message);
      };
      this.websocket.onclose = (message) => {
        console.log("연결해제" + message);
      };
      this.websocket.onerror = (message) => {
        console.log("socketError" + message);
      };
      this.websocket.onmessage = (e) => {
        this.chats.push({
          chat_num: this.chats.length + 1,
          chat_contents: this.socketOnmessage(e.data),
        });
      };
    },
  },
  created() {
    this.loadChatdetail();
  },
};
</script>
<style>
.col-11 {
  background: white;
  max-width: 300px;
  height: 400px;
  border: 1px solid #ccc;
  top: 100;
  right: 42px;
}

#chats {
  overflow-y: scroll;
}

#message {
  width: 265px;
}
</style>
