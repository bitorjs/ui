<template>
  <PageRootContainer>
    <PageContainer>
      <Cell
        :title="item.label"
        v-for="item in data"
        :key="item.name"
        @click.native="go(item.name, item.label)"
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
    go(url, label) {
      console.log(this.$bitor.store);
      // this.$bitor.store.setItem("title", label);
      // this.$store.setItem("title", label);
      this.$bitor.store.root.setItem("title", label);
      this.$bitor.store.mmm.pushItem("data", label);
      this.$bitor.redirect(url);
      console.log(url, label);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
