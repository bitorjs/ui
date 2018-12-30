<template>
  <PageRootContainer>
    <NavBar :title="title" :left-arrow="back" @click-left="onClickLeft"/>
    <p>{{$store.state.count}}</p>
    <webview-container></webview-container>
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
      this.$bitor.redirect("/");
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
  height: 100%;
}
div,
p,
center {
  box-sizing: border-box;
}
</style>

