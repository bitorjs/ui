<template>
  <PageRootContainer>
    <PageContainer>
      <Cell
        :title="item.label"
        v-for="item in data"
        :key="item.name"
        @click.native="go(item.name, item.label)"
        is-link
      />
    </PageContainer>
  </PageRootContainer>
</template>
<script>
export default {
  name: "all_components",
  props: {
    data: Array
  },
  data() {
    return {
      ss: 0
    };
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  mounted() {
    this.ctx.$post("/api/data/1/5?a=1&b=3",{
      params: {  
       id: 12345,
       name: 'xiaohuang'
      }
    }).then(res => {}).catch(err=>{
      console.error(err)
    })
    this.ctx.$ajax.get('/user').then(res => {
      console.warn(res)
    })

    this.ctx.$ajax.post('/user').then(res => {
      console.warn(res)
    })
  },
  methods: {
    go(url, label) {
      this.ctx.$store.ttt.commit("increment");
      this.ctx.$store.ttt.dispatch("increment");
      this.ctx.app.redirect(`/${url}`);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
