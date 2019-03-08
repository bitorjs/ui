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
    <PageContainer>
      <Croper
        :height="100"
        :canvas-color="'red'"
        :placeholder="'Choose an image'"
        :placeholder-font-size="0"
        :placeholder-color="'default'"
        :accept="'image/*'"
        :file-size-limit="0"
        :quality="2"
        :zoom-speed="3"
        :disabled="false"
        :disable-drag-and-drop="false"
        :disable-click-to-choose="false"
        :disable-drag-to-move="false"
        :disable-scroll-to-zoom="false"
        :disable-rotation="false"
        :prevent-white-space="false"
        :reverse-scroll-to-zoom="false"
        :show-remove-button="true"
        :remove-button-color="'red'"
        :remove-button-size="0"
      ></Croper>
    </PageContainer>
    <PageContainer>
      <div class="demo">
        文件上传的兼容性问题：
        1、Android 中打开 相机 + 相册、相册
        2、IOS 中 打开 相册 + 相册
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

