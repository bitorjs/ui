<template>
  <PageRootContainer>
    <PageContainer>
      <h3>文字提示</h3>
      <Button @click.native="$toast(text)">{{ title1 }}</Button>
      <Button @click.native="$toast(longText)">{{longTextButton }}</Button>

      <h3>加载提示</h3>
      <Button @click.native="showLoadingToast">{{title2 }}</Button>

      <h3>成功/失败提示</h3>
      <Button @click.native="showSuccessToast">{{ success}}</Button>
      <Button @click.native="showFailToast">{{ fail }}</Button>

      <h3>单例模式</h3>Toast 默认采用单例模式，即同一时间只会存在一个 Toast，如果需要在同一时间弹出多个 Toast，可以参考下面的示例
      <pre>
Toast.allowMultiple();

const toast1 = Toast('第一个 Toast');
const toast2 = Toast.success('第二个 Toast');

toast1.clear();
toast2.clear();

</pre>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "toast-demo",
  data() {
    return {
      loading: "加载中",
      title1: "文字提示",
      title2: "加载提示",
      title3: "成功/失败提示",
      success: "成功提示",
      fail: "失败提示",
      text: "提示内容",
      longText: "这是一条长文字提示，超过一定字数就会换行",
      text2: "成功文案",
      text3: "失败文案",
      text4: second => `倒计时 ${second} 秒`,
      longTextButton: "长文字提示"
    };
  },
  methods: {
    showLoadingToast() {
      console.log("rr");
      this.$toast.loading({ mask: true, message: "loading" + "..." });
    },
    showSuccessToast() {
      this.$toast.success("text2");
    },
    showFailToast() {
      this.$toast.fail("text3");
    },
    showCustomizedToast(duration) {
      const toast = this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: ("text4", 3)
      });
      let second = 3;
      const timer = setInterval(() => {
        second--;
        if (second) {
          toast.message = this.$t("text4", second);
        } else {
          clearInterval(timer);
          this.$toast.clear();
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
