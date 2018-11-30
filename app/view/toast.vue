<template>
  <PageRootContainer>
    <PageContainer></PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "toast",
  mounted() {
    // this.$toast("已挂载");
    console.log("已挂载");
    let count = 0;
    // setInterval(res => {
    //   this.$toast(count++);
    // }, 4000);

    // this.a();
    // Toast.success('成功文案');
    Toast.fail("失败文案");
  },

  methods: {
    a() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "倒计时 3 秒"
      });

      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = `倒计时 ${second} 秒`;
        } else {
          clearInterval(timer);
          // Toast.clear();
        }
      }, 1000);
    },
    b() {
      Toast.loading({
        mask: true,
        message: "加载中..."
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
