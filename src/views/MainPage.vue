<template>
  <div>
    <AppHeader />
    <div class="contents">
      <div class="profile-wrapper">
        <div id="profile-box">
          <div>
            <img id="user-profile" src="/icons/user.png" alt="" />

            <p id="user_name">이름: {{ $store.state.user.user_name }}</p>
            <p id="user_email">이메일: {{ $store.state.user.user_email }}</p>
          </div>
          <div>
            <router-link class="router" to="/profileupdate"
              >프로필 설정</router-link
            >
          </div>
        </div>
      </div>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <TeamListItem
          v-for="team in teams"
          :key="team.team_num"
          :team="team"
          @refresh="fetchData"
        ></TeamListItem>
      </ul>
      <router-link to="/createteam" class="create-button">
        <i class="ion-md-add"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import { fetchTeams } from "@/api/team";
import TeamListItem from "@/components/posts/TeamListItem.vue";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
export default {
  components: {
    AppHeader,
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
    async fetchData() {
      // 1초 지연 주어 스피너 보여주기
      var start = new Date().getTime();
      this.isLoading = true;
      const { data } = await fetchTeams();
      console.log(data);
      //data 중 isLive = 1 인 것만 뽑아서 teams에 넣어줌
      this.teams = data.filter((team) => team.isLive == 1);
      //1초 지연 실행
      while (new Date().getTime() < start + 1000);
      this.isLoading = false;
    },
  },
  created() {
    this.fetchData();
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
