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
  methods: {
    go(url, label) {
      this.$bitor.store.root.setItem("title", label);
      // this.$bitor.store.commit("increate");
      // this.$bitor.store.root.commit("increate");
      this.$bitor.store.ttt.commit("increate");
      // this.$bitor.store.mmm.commit("increate");
      this.$bitor.store.ttt.dispatch("increment");
      this.$bitor.redirect(url);
      console.log(this.$bitor.store);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
