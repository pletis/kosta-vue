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
          />
        </div>

        <button type="submit" class="btn">생성하기</button>
      </form>
    </div>
  </div>
</template>

<script>
import { createTeam } from "@/api/index";
export default {
  data() {
    return {
      team_title: "",
      team_description: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const teamData = {
          // 서버랑 이름 같게 해줘야 함
          team_title: this.team_title,
          team_description: this.team_description,
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
