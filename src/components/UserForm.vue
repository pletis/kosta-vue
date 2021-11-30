<template>
  <div class="contents">
    <div class="profile-wrapper">
      <div id="profile-box">
        <div>
          <p id="user_name">{{ $store.state.user.user_name }}</p>
          <p id="user_email">이메일</p>
        </div>
        <div>
          <router-link to="/profileupdate">프로필 설정</router-link>
        </div>
      </div>
    </div>
    <div class="team-wrapper">
      <div id="profile-box">
        <div>
          <h3 id="team-title">팀이름</h3>
          <p>이메일</p>
        </div>
        <div class="button-wrapper">
          <button class="btn" id="left-button">설정</button>
          <button class="btn">팀으로 가기</button>
        </div>
      </div>
    </div>
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
export default {};
</script>

<style>
#left-button {
  margin-right: 10px;
}
</style>
