<template>
  <div>
    <AppHeader />
    <h1 class="page-header">회원가입</h1>
    <SignupForm></SignupForm>
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import SignupForm from "@/components/SignupForm.vue";
export default {
  components: {
    AppHeader,
    SignupForm,
  },
};
</script>

<style></style>
