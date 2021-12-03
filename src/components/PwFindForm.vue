<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="user_email">이메일:</label>
          <input id="user_email" type="text" v-model="user_email" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && user_email">
              이메일 형식이 아닙니다
            </span>
          </p>
        </div>
        <div>
          <label for="user_name">이름:</label>
          <input id="user_name" type="text" v-model="user_name" />
        </div>

        <button
          :disabled="!isUsernameValid || !user_email"
          type="submit"
          class="my-btn"
        >
          비밀번호 찾기
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { validateEmail } from "@/utils/validation";
import { findUser } from "@/api/auth.js";
export default {
  data() {
    return {
      user_email: "",
      user_name: "",
      logMessage: "",
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.user_email);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          // 서버랑 이름 같게 해줘야 함
          user_email: this.user_email,
          user_name: this.user_name,
        };
        // 요청을 보내고 받은후에 라우팅이 일어나야하기때문에 !!await!!
        const { data } = await findUser(userData);
        console.log(data);
        alert("비밀번호 찾기 성공");
        // 로그인 성공시 메인페이지로 이동
        this.$router.push("/login");
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data;
      }
    },
  },
};
</script>

<style></style>
