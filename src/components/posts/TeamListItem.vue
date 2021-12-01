<template>
  <li>
    <div class="team-wrapper">
      <div id="profile-box">
        <div>
          <h3 id="team-title">{{ team.team_name }}</h3>
          <p>{{ team.team_info }}</p>
        </div>
        <div class="button-wrapper">
          <button class="btn" id="left-button">설정</button>
          <button class="btn">팀으로 가기</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
