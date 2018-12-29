<template>
  <PageRootContainer>
    <PageContainer>
      <h3>按钮类型</h3>
      <p>支持default、primary、warning、danger四种类型，默认为default</p>
      <Button type="default">默认按钮</Button>
      <Button type="primary">主要按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>

      <h3>朴素按钮</h3>
      <Button plain type="primary">朴素按钮</Button>
      <Button plain type="danger">朴素按钮</Button>

      <h3>禁用状态</h3>
      <p>通过disabled属性来禁用按钮，此时按钮不可点击</p>
      <Button disabled type="primary">禁用状态</Button>
      <Button disabled type="danger">禁用状态</Button>

      <h3>加载状态</h3>
      <Button loading type="primary"/>
      <Button loading type="danger"/>

      <h3>按钮形状</h3>
      <Button square type="primary">方形按钮</Button>
      <Button round type="danger">圆形按钮</Button>

      <h3>按钮尺寸</h3>
      <p>支持large、normal、small、mini四种尺寸，默认为normal</p>
      <Button size="large">大号按钮</Button>
      <Button size="normal">普通按钮</Button>
      <Button size="small">小型按钮</Button>
      <Button size="mini">迷你按钮</Button>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "Index"
};
</script>
<style lang="less" scoped>
</style>
