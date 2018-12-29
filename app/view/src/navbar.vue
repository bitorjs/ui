<template>
  <PageRootContainer>
    <PageContainer>
      <h3>基础用法</h3>
      <NavBar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />

      <h3>高级用法</h3>
      <NavBar title="标题" left-text="返回" left-arrow>
        <Icon name="search" slot="right"/>
      </NavBar>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "navbar",
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang="less" scoped>
</style>
