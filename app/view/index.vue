<template>
  <PageRootContainer>
    <PageContainer>
      <Cell
        :title="item.label"
        v-for="item in data"
        :key="item.name"
        @click.native="go(item.name)"
        is-link
      />
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "all_components",
  props: {
    data: Array
  },
  mounted() {
    console.log(this.$store);
  },
  methods: {
    go(url) {
      console.log(this.$bitor.store);
      this.$bitor.store.setItem("a", 1);
      this.$bitor.redirect(url);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
