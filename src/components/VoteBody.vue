<template>
  <div>
    <!-- Vote 모달 -->
    <div id="bg" v-if="isModal == true">
      <div class="contents">
        <div class="form-wrapper form-wrapper-sm">
          <div v-if="isVoting == false">
            <input
              type="radio"
              v-model="radioValues"
              value="1"
              v-if="vote.vote_content1"
            />{{ vote.vote_content1 }}

            <input
              type="radio"
              v-model="radioValues"
              value="2"
              v-if="vote.vote_content2"
            />{{ vote.vote_content2 }}

            <input
              type="radio"
              v-model="radioValues"
              value="3"
              v-if="vote.vote_content3"
            />{{ vote.vote_content3 }}

            <input
              type="radio"
              v-model="radioValues"
              value="4"
              v-if="vote.vote_content4"
            />{{ vote.vote_content4 }}

            <input
              type="radio"
              v-model="radioValues"
              value="5"
              v-if="vote.vote_content5"
            />{{ vote.vote_content5 }}

            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn" @click="voteInsert">
              투표 하기
            </button>
            <button type="submit" class="my-btn" @click="deleteVote">
              투표 마감
            </button>
          </div>

          <div v-else>
            <h3>{{ vote.vote_name }}</h3>
            <div v-if="voteResult.vote_content1" @click="getVoteMember1">
              {{ voteResult.vote_content1 }}:
              <b-tooltip
                :show.sync="show"
                target="tooltip-button-1"
                placement="top"
              >
                <div v-for="item in voteMembers" :key="item.user_name">
                  {{ item.user_name }}
                </div>
              </b-tooltip>
              <div class="mt-3">
                <b-button
                  v-if="voteResult.vote_result1 != 0"
                  id="tooltip-button-1"
                  @click="show = !show"
                  >{{ voteResult.vote_result1 }}</b-button
                >
              </div>
            </div>
            <div v-if="voteResult.vote_content2" @click="getVoteMember2">
              {{ voteResult.vote_content2 }}:
              <div class="mt-3">
                <b-button
                  v-if="voteResult.vote_result2 != 0"
                  id="tooltip-button-1"
                  @click="show = !show"
                  >{{ voteResult.vote_result2 }}</b-button
                >
              </div>
            </div>
            <div v-if="voteResult.vote_content3" @click="getVoteMember3">
              {{ voteResult.vote_content3 }}:
              <div class="mt-3">
                <b-button
                  v-if="voteResult.vote_result3 != 0"
                  id="tooltip-button-1"
                  @click="show = !show"
                  >{{ voteResult.vote_result3 }}</b-button
                >
              </div>
            </div>
            <div v-if="voteResult.vote_content4" @click="getVoteMember4">
              {{ voteResult.vote_content4 }}:
              <div class="mt-3">
                <b-button
                  v-if="voteResult.vote_result4 != 0"
                  id="tooltip-button-1"
                  @click="show = !show"
                  >{{ voteResult.vote_result4 }}</b-button
                >
              </div>
            </div>
            <div v-if="voteResult.vote_content5" @click="getVoteMember5">
              {{ voteResult.vote_content5 }}:
              <div class="mt-3">
                <b-button
                  v-if="voteResult.vote_result5 != 0"
                  id="tooltip-button-1"
                  @click="show = !show"
                  >{{ voteResult.vote_result5 }}</b-button
                >
              </div>
            </div>
            <button class="my-btn" id="left-button" @click="resetModal">
              취소
            </button>
            <button type="submit" class="my-btn" @click="deleteVote">
              투표 마감
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h1 @click="voteModalSet">{{ vote.vote_name }}</h1>
    </div>
  </div>
</template>

<script>
import {
  voteInsert,
  getVoteResult,
  getVoteMemberList,
  getVoteMember1,
  getVoteMember2,
  getVoteMember3,
  getVoteMember4,
  getVoteMember5,
  deleteVote,
} from "@/api/vote";
export default {
  props: ["vote"],
  data() {
    return {
      radioValues: "",
      isModal: false,
      isVoting: false,
      voteResult: [],
      voteMembers: [],
      show: false,
    };
  },
  methods: {
    voteInsert: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const vote = {
        vote_num: vote_id,
        member_num: 1,
        vote_result: this.radioValues,
      };
      const { data } = await voteInsert(team_id, vote_id, vote);
      console.log(data);
      this.resetModal();
    },
    getVoteResult: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteResult(team_id, vote_id);
      console.log(data);
      this.voteResult = data;
    },
    voteModalSet: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteMemberList(team_id, vote_id);
      console.log(data);
      this.isModal = true;
      // for 문을 사용해 data의 값중 member_num이 있으면 투표가 진행중이므로 isVoting을 true로 바꿔준다.
      for (let i = 0; i < data.length; i++) {
        if (data[i] == 1) {
          this.isVoting = true;
          await this.getVoteResult();
          break;
        }
      }
    },
    getVoteMember1: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteMember1(team_id, vote_id);
      console.log(data);
      this.voteMembers = data;
    },
    getVoteMember2: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteMember2(team_id, vote_id);
      console.log(data);
      this.voteMembers = data;
    },
    getVoteMember3: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteMember3(team_id, vote_id);
      console.log(data);
      this.voteMembers = data;
    },
    getVoteMember4: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteMember4(team_id, vote_id);
      console.log(data);
      this.voteMembers = data;
    },
    getVoteMember5: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await getVoteMember5(team_id, vote_id);
      console.log(data);
      this.voteMembers = data;
    },

    deleteVote: async function () {
      const team_id = 19;
      const vote_id = this.vote.vote_num;
      const { data } = await deleteVote(team_id, vote_id);
      console.log(data);
      this.resetModal();
      this.$emit("reload");
    },
    resetModal: function () {
      this.isModal = false;
    },
  },
};
</script>

<style></style>
