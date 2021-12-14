<template>
  <div>
    <div @click="selectMember">
      이름: {{ inviteMember.user.user_name }} 이메일:
      {{ inviteMember.user.user_email }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["inviteMember"],
  methods: {
    selectMember() {
      this.$emit("memberSelect", this.inviteMember);
    },
  },
};
</script>

<style></style>
