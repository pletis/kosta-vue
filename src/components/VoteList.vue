<template>
  <div>
    <!-- Vote 모달 -->
    <div id="bg" v-if="isModal == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <form @submit.prevent="" class="form">
            <div>
              <label for="vote_name">투표 제목</label>
              <input id="vote_name" type="text" v-model="vote_name" />
              <label for="vote_content1">투표 내용</label>
              <input id="vote_content1" type="text" v-model="vote_content1" />
              <label for="vote_content2">투표 내용</label>
              <input id="vote_content2" type="text" v-model="vote_content2" />
              <label for="vote_content3">투표 내용</label>
              <input id="vote_content3" type="text" v-model="vote_content3" />
              <label for="vote_content4">투표 내용</label>
              <input id="vote_content4" type="text" v-model="vote_content4" />
              <label for="vote_content5">투표 내용</label>
              <input id="vote_content5" type="text" v-model="vote_content5" />
            </div>

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn" @click="createVote">
              투표 생성하기
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Vote body -->

    <header>
      <h1>투표</h1>
    </header>
    <div class="clearAllContainer">
      <span @click="isModal = true" class="addVoteBtn"
        ><i class="ion-md-add"></i> 투표 생성하기</span
      >
    </div>
    <div class="toggleContainer">
      <span>완료된 투표 보기</span>
      <ToggleButton @change="onChangeEventHandler" v-model="toggle" />
    </div>
    <b-dd-divider></b-dd-divider>
    <!-- 투표 들어갈 곳 -->
    <VoteBody
      v-for="vote in votes"
      :key="vote.vote_num"
      :vote="vote"
      @reload="getVoteList"
    />
  </div>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
import { getVotes, getEndVotes, createVote } from "@/api/vote";
import VoteBody from "@/components/VoteBody.vue";

export default {
  data: function () {
    return {
      votes: [],
      vote_name: "",
      vote_content1: "",
      vote_content2: "",
      vote_content3: "",
      vote_content4: "",
      vote_content5: "",
      isModal: false,
      toggle: false,
    };
  },
  methods: {
    createVote: async function () {
      const team_id = this.$route.params.teamId;
      const vote = {
        vote_name: this.vote_name,
        vote_content1: this.vote_content1,
        vote_content2: this.vote_content2,
        vote_content3: this.vote_content3,
        vote_content4: this.vote_content4,
        vote_content5: this.vote_content5,
        team_id: team_id,
        member_num: this.$store.state.member.member_num,
      };
      const { data } = await createVote(team_id, vote);
      await this.getVoteList();
      this.isModal = false;
      console.log(data);
    },
    getVoteList: async function () {
      const team_id = this.$route.params.teamId;
      const { data } = await getVotes(team_id);
      console.log(data);
      this.votes = data;
    },
    onChangeEventHandler: function () {
      this.toggle = !this.toggle;
      console.log(this.toggle);
      if (this.toggle == true) {
        this.getVoteList();
      } else {
        this.getEndVotes();
      }
    },
    getEndVotes: async function () {
      const team_id = this.$route.params.teamId;
      const { data } = await getEndVotes(team_id);
      console.log(data);
      this.votes = data;
    },
    resetModal: function () {
      this.isModal = false;
    },
  },
  components: {
    ToggleButton,
    VoteBody,
  },
  created: function () {
    this.getVoteList();
  },
};
</script>

<style>
h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
/* 인풋 */
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  width: 80%;
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  color: white;
  background: rgb(35, 127, 0);
  align-items: center;
  justify-content: center;
  display: inline-flex;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.clearAllContainer {
  width: 23rem;
  height: 50px;
  line-height: 50px;
  background-color: rgb(35, 127, 0);
  border-radius: 5px;
  margin: 0 auto;
  text-align: center;
}

.toggleContainer {
  width: 23rem;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
  text-align: right;
}

.toggleContainer > span {
  margin-right: 10px;
}
.addVoteBtn {
  width: 100%;
  font-weight: 700;
  color: white;
  display: block;
  cursor: pointer;
}

.todo-modal {
  width: 400px;
  position: fixed;
  top: 200px;
  z-index: 1;
}

#todo_description {
  width: 100%;
}

#bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style>
