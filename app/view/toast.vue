<template>
  <PageRootContainer>
    <PageContainer></PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "toast",
  mounted() {
    this.$toast("已挂载");
    console.log("已挂载");
  }
};
</script>
<style lang="less" scoped>
</style>
