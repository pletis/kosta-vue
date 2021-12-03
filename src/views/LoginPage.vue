<template>
  <div>
    <AppHeader />
    <h1 class="page-header">로그인</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import LoginForm from "@/components/LoginForm.vue";
export default {
  components: {
    AppHeader,
    LoginForm,
  },
};
</script>

<style></style>
