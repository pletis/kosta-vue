<template>
  <li>
    <div class="team-wrapper">
      <div id="profile-box">
        <div>
          <h3 id="team-title">{{ team.team_name }}</h3>
          <p>{{ team.team_info }}</p>
        </div>
        <div class="button-wrapper">
          <button class="my-btn" id="left-button" @click="routeEditPage">
            설정
          </button>
          <button class="my-btn" @click="routeMainPage">팀으로 가기</button>
          <i class="icon ion-md-trash" @click="deleteItem"></i>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { deleteTeam } from "@/api/team";
export default {
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteItem() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        await deleteTeam(this.team.team_num);
        console.log("delete");
        this.$emit("refresh");
      }
    },
    routeEditPage() {
      const id = this.team.team_num;
      this.$router.push(`/team/${id}`);
    },
    routeMainPage() {
      const id = this.team.team_num;
      this.$router.push(`/team/${id}/main`);
    },
  },
};
</script>

<style></style>
