<template>
  <div>
    <AppHeader />
    <PostTeamForm></PostTeamForm>
  </div>
</template>

<script>
import AppHeader from "@/components/common/AppHeader.vue";
import PostTeamForm from "@/components/posts/PostTeamForm.vue";
export default {
  components: {
    AppHeader,
    PostTeamForm,
  },
};
</script>

<style></style>
