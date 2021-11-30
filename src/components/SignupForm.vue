<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="user_name">이름: </label>
          <input id="user_name" type="text" v-model="user_name" />
        </div>
        <div>
          <label for="user_phoneNum">전화번호: </label>
          <input id="user_phoneNum" type="text" v-model="user_phoneNum" />
        </div>
        <div>
          <label for="user_email">이메일:</label>
          <input id="user_email" type="text" v-model="user_email" />
        </div>
        <p class="validation-text">
          <span class="warning" v-if="!isUsernameValid && user_email">
            이메일 형식이 아닙니다
          </span>
        </p>
        <div>
          <label for="user_pw">패스워드: </label>
          <input id="user_pw" type="text" v-model="user_pw" />
        </div>
        <div>
          <label for="user_birth">생일: </label>
          <input id="user_birth" type="text" v-model="user_birth" />
        </div>
        <div>
          <label for="user_pwHint">힌트: </label>
          <input id="user_pwHint" type="text" v-model="user_pwHint" />
        </div>

        <button type="submit" class="btn">회원 가입</button>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from "@/api/index";
import { validateEmail } from "@/utils/validation";

export default {
  data() {
    return {
      // form values
      user_name: "",
      user_phoneNum: "",
      user_email: "",
      user_pw: "",
      user_birth: "",
      user_pwHint: "",
      // log
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
      const userData = {
        user_name: this.user_name,
        user_phoneNum: this.user_phoneNum,
        user_email: this.user_email,
        user_pw: this.user_pw,
        user_birth: this.user_birth,
        user_pwHint: this.user_pwHint,
      };
      const { data } = await registerUser(userData);
      console.log(data);
      this.initForm();
    },
    initForm() {
      this.user_name = "";
      this.user_phoneNum = "";
      this.user_email = "";
      this.user_pw = "";
      this.user_birth = "";
      this.user_pwHint = "";
    },
  },
};
</script>

<style></style>
