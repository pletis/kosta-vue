<template>
  <div>
    <AppHeader />
    <h1>비밀번호 찾기</h1>
    <PwFindForm />
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import PwFindForm from "@/components/PwFindForm.vue";
export default {
  components: {
    AppHeader,
    PwFindForm,
  },
};
</script>

<style></style>
