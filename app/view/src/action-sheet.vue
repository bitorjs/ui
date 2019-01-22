<template>
  <PageRootContainer>
    <PageContainer>
      <ActionSheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      ></ActionSheet>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      actions: [
        {
          name: "选项"
        },
        {
          name: "选项",
          subname: "描述信息"
        },
        {
          loading: true
        },
        {
          name: "禁用选项",
          disabled: true
        }
      ]
    };
  },
  methods: {
    onSelect() {},
    onCancel() {}
  }
};
</script>
<style lang="less" scoped>
</style>
