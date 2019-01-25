<template>
  <PageRootContainer>
    <PageContainer>
      <Button type="primary" plain @click.native="up">ForceUpdate</Button>
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: 'life',
  methods:{
    up(){
      this.$forceUpdate();
    }
  },
  beforeCreate:function(){
      console.log("创建前========")
      console.log(this.data)
      console.log(this.$el)
  },
  created:function(){
      console.log("已创建========")
      console.log(this.info)
      console.log(this.$el)
  },
  beforeMount:function(){
      console.log("mount之前========")
      console.log(this.info)
      console.log(this.$el)
  },
  mounted:function(){
      console.log("mounted========")
      console.log(this.info)
      console.log(this.$el)
  },
  beforeUpdate:function(){
      console.log("更新前========");

  },
  updated:function(){
      console.log("更新完成========");
  },
  beforeDestroy:function(){
      console.log("销毁前========")
      console.log(this.info)
      console.log(this.$el)
  },
  destroyed:function(){
      console.log("已销毁========")
      console.log(this.info)
      console.log(this.$el)
  }

}
</script>
<style lang="less" scoped>

</style>
