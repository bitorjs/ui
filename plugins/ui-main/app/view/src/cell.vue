<template>
  <PageRootContainer>
    <PageContainer>
      <h3>基础用法</h3>
      <p>Cell可以单独使用，也可以与CellGroup搭配使用。CellGroup可以为Cell提供上下外边框。</p>

      <!-- <CellGroup> -->
      <Cell title="单元格" value="内容"/>
      <Cell title="单元格" value="内容" label="描述信息"/>
      <!-- </CellGroup> -->
      <h3>单元格大小</h3>
      <p>通过size属性可以控制单元格的大小</p>

      <Cell title="单元格" value="内容" size="large"/>
      <Cell title="单元格" value="内容" size="large" label="描述信息"/>

      <h3>展示图标</h3>
      <p>通过icon属性在标题左侧展示图标</p>

      <Cell title="单元格" icon="location"/>
      <Cell title="单元格" value="内容" icon="location"/>
      <Cell title="单元格">
        <Icon slot="right-icon" name="search" class="custom-icon"/>
      </Cell>

      <h3>只设置 value</h3>
      <p>只设置value时会向左对齐</p>

      <Cell value="内容"/>

      <h3>展示箭头</h3>
      <p>传入is-link属性则会在右侧显示箭头，并且可以通过传入arrow-direction属性控制箭头方向</p>

      <Cell title="单元格" is-link/>
      <Cell title="单元格" is-link value="内容"/>
      <Cell title="单元格" is-link arrow-direction="down" value="内容"/>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "cell",
  mounted() {}
};
</script>
<style lang="less" scoped>
</style>
