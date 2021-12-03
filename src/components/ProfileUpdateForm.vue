<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="user_name">이름: </label>
          <input id="user_name" type="text" v-model="user_name" />
        </div>
        <div>
          <label for="user_phonenum">전화번호: </label>
          <input id="user_phonenum" type="text" v-model="user_phonenum" />
        </div>
        <div>
          <label for="user_email">이메일:</label>
          <input id="user_email" type="text" v-model="user_email" />
        </div>
        <!-- <p class="validation-text">
          <span class="warning" v-if="!isUsernameValid && user_email">
            이메일 형식이 아닙니다
          </span>
        </p> -->
        <div>
          <label for="user_pw">패스워드: </label>
          <input id="user_pw" type="text" v-model="user_pw" />
        </div>
        <div>
          <label for="user_birth">생일: </label>
          <input id="user_birth" type="text" v-model="user_birth" />
        </div>
        <div>
          <label for="user_pwhint">힌트: </label>
          <input id="user_pwhint" type="text" v-model="user_pwhint" />
        </div>
        <button type="submit" class="my-btn">수정 완료</button>
      </form>
    </div>
  </div>
</template>

<script>
import { updateUser } from "@/api/auth";

export default {
  data() {
    return {
      user_num: "1",
      user_name: this.$store.state.user.user_name,
      user_phonenum: this.$store.state.user.user_phonenum,
      user_email: this.$store.state.user.user_email,
      user_pw: this.$store.state.user.user_pw,
      user_birth: this.$store.state.user.user_birth,
      user_pwhint: this.$store.state.user.user_pwhint,
    };
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          user_num: this.user_num,
          user_name: this.user_name,
          user_phoneNum: this.user_phonenum,
          user_email: this.user_email,
          user_pw: this.user_pw,
          user_birth: this.user_birth,
          user_pwHint: this.user_pwhint,
        };
        const { data } = await updateUser(userData);
        console.log(data);
        this.$store.commit("setUser", userData);
        this.$router.push("/main");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
