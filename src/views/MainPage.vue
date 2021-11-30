<template>
  <div>
    <UserForm></UserForm>
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { fetchTeams } from "@/api/index";
export default {
  methods: {
    async fetchTeams() {
      const response = await fetchTeams();
      console.log(response);
    },
  },
  created() {
    this.fetchTeams();
  },
  components: {
    UserForm,
  },
};
</script>

<style></style>
