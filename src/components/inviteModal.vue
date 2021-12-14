<template>
  <div class="black-bg">
    <div class="contents">
      <div class="form-wrapper form-wrapper-sm">
        <form @submit.prevent="" class="form">
          <div>
            <label for="chat_name">초대인원:</label>
            <input id="chat_name" type="text" v-model="selectMember_email" />
          </div>
          <inviteMember
            v-for="inviteMember in inviteMembers"
            :key="inviteMember.user_num"
            :inviteMember="inviteMember"
            @memberSelect="memberSelect"
          />
          <button class="my-btn" id="left-button" @click="closeModal">
            취소
          </button>

          <button type="submit" class="my-btn" @click="inviteSelectMember">
            초대하기
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { inviteSelectMember, getInviteMember } from "@/api/member";
import inviteMember from "@/components/inviteMember.vue";
export default {
  data() {
    return {
      inviteMembers: [],
      selectMember: [],
      selectMember_email: "",
    };
  },
  components: {
    inviteMember,
  },
  methods: {
    inviteSelectMember: async function () {
      const team_num = this.$route.params.teamId;
      const userdata = {
        member_position: "",
        team_num: team_num,
        user_num: this.selectMember.user_num,
      };
      const { data } = await inviteSelectMember(team_num, userdata);
      console.log(data);
    },
    getInviteMember: async function () {
      const team_num = this.$route.params.teamId;
      const { data } = await getInviteMember(team_num);
      console.log("초대가능멤버:" + data);
      this.inviteMembers = data;
    },

    memberSelect: function (member) {
      console.log("안녕");
      this.selectMember = member;
      this.selectMember_email = member.user_email;
    },
    closeModal() {
      this.$emit("invite");
    },
  },
  created: function () {
    this.getInviteMember();
  },
};
</script>

<style></style>
