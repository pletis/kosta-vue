<template>
  <div class="contents">
    <div class="profile-wrapper">
      <div id="profile-box">
        <div>
          <p id="user_name">{{ $store.state.user.user_name }}</p>
          <p id="user_email">{{ $store.state.user.user_email }}</p>
        </div>
        <div>
          <router-link to="/profileupdate">프로필 설정</router-link>
        </div>
      </div>
    </div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <ul>
      <TeamListItem
        v-for="team in teams"
        :key="team.team_name"
        :team="team"
      ></TeamListItem>
    </ul>
    <div class="plus-wrapper">
      <div id="plus-box">
        <h4>
          <router-link to="/createteam">+ 팀 생성하기</router-link>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTeams } from "@/api/index";
import TeamListItem from "@/components/posts/TeamListItem.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
export default {
  components: {
    TeamListItem,
    LoadingSpinner,
  },
  data() {
    return {
      teams: [],
      isLoading: false,
    };
  },
  methods: {
    async fetchTeams() {
      // 1초 지연 주어 스피너 보여주기
      var start = new Date().getTime();
      this.isLoading = true;
      const { data } = await fetchTeams();
      console.log(data);
      //1초 지연 실행
      while (new Date().getTime() < start + 1000);
      this.isLoading = false;
      this.teams = data;
    },
  },
  created() {
    this.fetchTeams();
  },
};
</script>

<style>
#left-button {
  margin-right: 10px;
  background: rgb(231, 231, 231);
  color: white;
}
</style>
