<template>
  <PageRootContainer>
    <PageContainer>
      <h3>{{alert1}}</h3>
      <Button type="primary" plain @click.native="onClickAlert">{{ alert1 }}</Button>
      <Button type="primary" plain @click.native="onClickAlert2">{{ alert2 }}</Button>
      <h3>{{confirm}}</h3>
      <Button type="primary" plain @click.native="onClickConfirm">{{confirm }}</Button>
      <h3>重写padding</h3>
      <Button type="primary" plain @click.native="onClickConfirm2">{{confirm }}</Button>
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
        title: `
        <center><span style="color:red;">TTT</span></center>
        <p style="border-bottom: 1px solid #ebedf0;padding-bottom: 10px;">ssssss</p>
        `,
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
        title: `
          <center style="border-bottom: 1px solid #ebedf0;padding-bottom: 10px;">预计<span style="color:#FFB000;">5秒内</span>极速完成</center>
          `,
        message: `
          <p>无法在App内拍摄？可用手机相机拍照后，快捷<span style="color:#FFB000;">上传相册文件</span>哦~</p>
          <p style="padding-top: 10px;font-size:13px;">提示：如您<span style="color:#FFB000;">拍照</span>，可能需要<span style="color:red;">切换</span><span style="color:#FFB000;">手机前摄像头</span></p>
          `,
        confirmButtonText: "我要继续",
        cancelButtonText: "暂时放弃",
        beforeClose: (action, done) => {
          console.log(action);
          done();
          // this.$dialog.close();
        }
      });
    },
    onClickConfirm2() {
      this.$dialog.confirm({
        title: `
          <center style="border-bottom: 1px solid #ebedf0;padding-bottom: 10px;">预计<span style="color:#FFB000;">5秒内</span>极速完成</center>
          `,
        message: `
          <p>无法在App内拍摄？可用手机相机拍照后，快捷<span style="color:#FFB000;">上传相册文件</span>哦~</p>
          <p style="padding-top: 10px;font-size:13px;">提示：如您<span style="color:#FFB000;">拍照</span>，可能需要<span style="color:red;">切换</span><span style="color:#FFB000;">手机前摄像头</span></p>
          `,
        confirmButtonText: "我要继续",
        cancelButtonText: "暂时放弃",
        padding: false,
        beforeClose: (action, done) => {
          console.log(action);
          done();
          // this.$dialog.close();
        }
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
