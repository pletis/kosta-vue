<template>
  <div class="contents main-contents">
    <h1>메인컨텐츠</h1>
    <h1>
      {{ $store.state.maindata[0].post_title }}
    </h1>
  </div>
</template>

<script>
export default {};
</script>

<style>
.main-contents {
  background: aquamarine;
  overflow-x: auto;
}
</style>
