<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">이메일:</label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              이메일 형식이 아닙니다
            </span>
          </p>
        </div>
        <div>
          <label for="password">비밀번호:</label>
          <input id="password" type="text" v-model="password" />
        </div>

        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="my-btn"
        >
          로그인
        </button>
        <router-link class="router" to="/pwfind">비밀번호 찾기</router-link>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { validateEmail } from "@/utils/validation";

export default {
  data() {
    return {
      // form values
      username: "",
      password: "",
      // log
      logMessage: "",
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          // 서버랑 이름 같게 해줘야 함
          user_email: this.username,
          user_pw: this.password,
        };
        console.log(userData);
        // 요청을 보내고 받은후에 라우팅이 일어나야하기때문에 !!await!!
        await this.$store.dispatch("LOGIN", userData);
        // 로그인 성공시 메인페이지로 이동
        this.$router.push("/main");
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style>
.my-btn {
  color: white;
}
</style>
