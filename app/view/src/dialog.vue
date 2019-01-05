<template>
  <PageRootContainer>
    <PageContainer>
      <h3>{{alert1}}</h3>
      <Button type="primary" plain @click.native="onClickAlert">{{ alert1 }}</Button>
      <Button type="primary" plain @click.native="onClickAlert2">{{ alert2 }}</Button>

      <h3>{{confirm}}</h3>
      <Button type="primary" plain @click.native="onClickConfirm">{{confirm }}</Button>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "toast-demo",
  data() {
    return {
      alert1: "消息提示",
      alert2: "无标题提示",
      confirm: "消息确认",
      content:
        "有赞是一家零售科技公司，致力于成为商家服务领域里最被信任的引领者",
      show: false,
      username: "",
      password: ""
    };
  },
  methods: {
    onClickAlert() {
      this.$dialog.alert({
        title: "title",
        message: "content"
      });
    },
    onClickAlert2() {
      this.$dialog.alert({
        message: "content"
      });
    },
    onClickConfirm() {
      this.$dialog.confirm({
        title: "title",
        message: "content"
      });
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
