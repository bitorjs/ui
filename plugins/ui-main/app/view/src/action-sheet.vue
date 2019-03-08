<template>
  <PageRootContainer>
    <PageContainer>
      <ActionSheet
        v-model="show1"
        :actions="actions"
        cancel-text="取消"
        @select="onSelect"
        @cancel="onCancel"
      ></ActionSheet>
      <ActionSheet v-model="show2" title="支持以下配送方式">
        <p>一些内容</p>
      </ActionSheet>
      <Button type="primary" plain @click.native="show1=true;">不带标题</Button>
      <Button type="primary" plain @click.native="show2=true;">带标题</Button>
      <Button type="primary" plain @click.native="showSheet">纯JS</Button>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
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
    onSelect(item) {
      console.log('ss')
      this.show1=false;
      this.show2 = false;
      Toast(item.name)
    },
    onCancel() {
      console.log('cancel')
      this.show=false;
    },
    showSheet(){
      this.$actionSheet.alert({
        value: true,
        title:'asdf',
        actions:this.actions,
        cancelText:'暂时不要',
        select:(item)=>{this.onSelect(item);this.$actionSheet.close()},
        cancel:()=>this.onCancel,
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
