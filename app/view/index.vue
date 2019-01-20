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
  data() {
    return {
      ss: 0
    };
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  mounted() {
    this.$bitor.ctx.get("/api/data").then(res => {});
  },
  methods: {
    go(url, label) {
      // this.$bitor.store.ttt.commit("increment");
      // this.$bitor.store.ttt.dispatch("increment");
      this.$bitor.redirect(`/${url}`);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
