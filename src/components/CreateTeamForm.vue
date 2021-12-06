<template>
  <div class="contents">
    <h1>팀 생성하기</h1>
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">팀이름:</label>
          <input id="team_title" type="text" v-model="team_title" />
        </div>
        <div>
          <label for="password">팀설명:</label>
          <textarea
            id="team_description"
            type="text"
            v-model="team_description"
            rows="5"
          />
        </div>
        <p class="validation-text warning" v-if="!isContentsValid">
          설명이 너무 길어요!
        </p>
        <button type="submit" class="my-btn">생성하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createTeam } from "@/api/team";
export default {
  data() {
    return {
      team_title: "",
      team_description: "",
    };
  },
  computed: {
    isContentsValid() {
      return this.team_description.length <= 200;
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const teamData = {
          // 서버랑 이름 같게 해줘야 함
          team_name: this.team_title,
          team_info: this.team_description,
          user_num: this.$store.state.user.user_num,
        };
        const { data } = await createTeam(teamData);
        console.log(teamData);
        console.log(data);
        this.$router.push("/main");
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        // this.logMessage = error.response.data;
      }
    },
  },
};
</script>

<style></style>
