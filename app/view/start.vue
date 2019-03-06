<template>
  <PageRootContainer>
    <NavBar :title="ctx.$store.state.title||title" :left-arrow="back" @click-left="onClickLeft"/>
    <router-view></router-view>
  </PageRootContainer>
</template>
<script>
export default {
  nane: "StartPage",
  props: {
    title: { type: String, default: "所有组件" }, //,
    back: { type: Boolean, default: true } // false
  },
  methods: {
    onClickLeft() {
      // this.$bitor.store.root.setItem("title", "所有组件");
      this.ctx.app.redirect("/");
    }
  },
  watch: {
    "ctx.$store.state.title"(oldTitle, newTitle) {
      // document.title = newTitle;
    }
  }
};
</script>
<style lang="less">
* {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
html,
body {
  display: inline-block;
  width: 100%;
  // height: 100%;
  overflow-x: hidden;
}
div,
p,
center {
  box-sizing: border-box;
}
</style>

