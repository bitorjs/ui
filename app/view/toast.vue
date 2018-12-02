<template>
  <PageRootContainer>
    <PageContainer>
      <h3>文字提示</h3>
      <pre>Toast('提示内容');</pre>

      <h3>加载提示</h3>
      <pre>
Toast.loading({
  mask: true,
  message: '加载中...'
});</pre>

      <h3>成功/失败提示</h3>
      <pre>
Toast.success('成功文案');
Toast.fail('失败文案');
</pre>
      <h3>高级用法</h3>
      <pre>
  const toast = Toast.loading({
  duration: 0,       // 持续展示 toast
  forbidClick: true, // 禁用背景点击
  loadingType: 'spinner',
  message: '倒计时 3 秒'
});

let second = 3;
const timer = setInterval(() => {
  second--;
  if (second) {
    toast.message = `倒计时 ${second} 秒`;
  } else {
    clearInterval(timer);
    Toast.clear();
  }
}, 1000);
</pre>
      <h3>组件内调用</h3>引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
      <pre>
export default {
  mounted() {
    this.$toast('提示文案');
  }
}
</pre>

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
