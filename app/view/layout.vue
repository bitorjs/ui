<template>
  <PageRootContainer>
    <PageContainer>
      <h3>基本用法</h3>
      <p>
        Layout 组件提供了24列栅格，通过在Col上添加span属性设置列所占的宽度百分比
        此外，添加offset属性可以设置列的偏移宽度，计算方式与 span 相同
      </p>

      <Row>
        <Col span="8">span: 8</Col>
        <Col span="8">span: 8</Col>
        <Col span="8">span: 8</Col>
      </Row>

      <Row>
        <Col span="4">span: 4</Col>
        <Col span="10" offset="4">offset: 4, span: 10</Col>
      </Row>

      <Row>
        <Col offset="12" span="12">offset: 12, span: 12</Col>
      </Row>

      <h3>Flex 布局</h3>
      <p>将 type 属性设置为 flex 可以启用 flex 布局，便于进行灵活的对齐</p>

      <!-- 左对齐 -->
      <Row type="flex">
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
      </Row>

      <!-- 居中 -->
      <Row type="flex" justify="center">
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
      </Row>

      <!-- 右对齐 -->
      <Row type="flex" justify="end">
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
      </Row>

      <!-- 两端对齐 -->
      <Row type="flex" justify="space-between">
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
      </Row>

      <!-- 每个元素的两侧间隔相等 -->
      <Row type="flex" justify="space-around">
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
        <Col span="6">span: 6</Col>
      </Row>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "layout"
};
</script>
<style lang="less" scoped>
.col:nth-child(odd) {
  background-color: #39a9ed;
}
.col:nth-child(even) {
  background-color: #66c6f2;
}
.col {
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
}
</style>
