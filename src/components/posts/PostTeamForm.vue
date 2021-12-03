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
import { fetchTeam, updateTeam } from "@/api/team";
export default {
  async created() {
    const id = this.$route.params.id;
    const { data } = await fetchTeam(id);
    this.team_title = data.team_name;
    this.team_description = data.team_info;
    console.log(data);
  },
  data() {
    return {
      team_title: "",
      team_description: "",
      logMessage: "",
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
        const id = this.$route.params.id;

        await updateTeam(id, {
          team_name: this.team_title,
          team_info: this.team_description,
        });
        this.$router.push(`/main`);
      } catch (error) {
        console.log(error);
        this.logMessage = error;
      }
    },
  },
};
</script>

<style></style>
