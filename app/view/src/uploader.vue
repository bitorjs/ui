<template>
  <PageRootContainer>
    <PageContainer>
      <div class="demo">
        <Uploader :after-read="onRead1">
          <Icon name="wechat"></Icon>原图图片上传
        </Uploader>
        <p>
          <img :src="url1" alt>
        </p>
      </div>
    </PageContainer>
    <PageContainer>
      <div class="demo">
        <Uploader :after-read="onRead2" rotate>
          <Icon name="wechat"></Icon>原图旋转矫正后上传
        </Uploader>
        <p>
          <img :src="url2" alt>
        </p>
      </div>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "uploader-demo",
  data() {
    return {
      url1: "",
      url2: ""
    };
  },
  methods: {
    onRead1(data) {
      this.url1 = data.content;
    },
    onRead2(data) {
      this.url2 = data.content;
    }
  }
};
</script>
<style lang="less" scoped>
</style>

