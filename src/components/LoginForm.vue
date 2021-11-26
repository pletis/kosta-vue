<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="user_name">이메일:</label>
          <input id="user_name" type="text" v-model="user_name" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && user_name">
              이메일 형식이 아닙니다
            </span>
          </p>
        </div>
        <div>
          <label for="user_pw">비밀번호:</label>
          <input id="user_pw" type="text" v-model="user_pw" />
        </div>
        <button
          :disabled="!isUsernameValid || !user_pw"
          type="submit"
          class="btn"
        >
          로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { loginUser } from "@/api/index";
import { validateEmail } from "@/utils/validation";

export default {
  data() {
    return {
      // form values
      user_name: "",
      user_pw: "",
      // log
      logMessage: "",
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.user_name);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          user_name: this.user_name,
          user_pw: this.user_pw,
        };
        const { data } = await loginUser(userData);
        console.log(data.user.user_name);
        this.logMessage = `${data.user.user_name} 님 환영합니다`;
        // this.initForm();
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data;
        // this.initForm();
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.user_name = "";
      this.user_pw = "";
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
