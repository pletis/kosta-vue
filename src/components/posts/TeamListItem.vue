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
          <button class="my-btn" @click="routeMainPage(team)">
            팀으로 가기
          </button>
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
      if (this.$store.state.user.user_num == this.team.user_num) {
        if (confirm("정말로 삭제하시겠습니까?")) {
          await deleteTeam(this.team.team_num);
          console.log("delete");
          this.$emit("refresh");
        }
      } else {
        alert("삭제 권한이 없습니다.");
      }
    },
    routeEditPage() {
      if (this.$store.state.user.user_num == this.team.user_num) {
        const id = this.team.team_num;
        this.$router.push(`/team/${id}`);
      } else {
        alert("권한이 없습니다.");
      }
    },
    routeMainPage() {
      const id = this.team.team_num;
      this.$store.commit("setTeamname", this.team.team_name);
      this.$router.push(`/team/${id}/main`);
    },
  },
};
</script>

<style></style>
