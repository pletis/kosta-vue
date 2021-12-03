<template>
  <div>
    <AppHeader />
    <h1>프로필 설정</h1>
    <ProfileUpdateForm></ProfileUpdateForm>
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import ProfileUpdateForm from "@/components/ProfileUpdateForm.vue";
export default {
  components: {
    AppHeader,
    ProfileUpdateForm,
  },
};
</script>

<style></style>
