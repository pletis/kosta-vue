<template>
  <h1>{{ team_id }}팀 메인 페이지</h1>
</template>

<script>
export default {
  data() {
    return {
      team_id: this.$route.params.id,
    };
  },
};
</script>

<style></style>
