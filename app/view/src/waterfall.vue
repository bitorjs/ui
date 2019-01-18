<template>
  <div>
    <Waterfall
      :line="line"
      :line-gap="200"
      :min-line-gap="100"
      :max-line-gap="220"
      :single-max-width="300"
      :watch="items"
      @reflowed="reflowed"
      ref="waterfall"
    >
      <!-- each component is wrapped by a waterfall slot -->
      <WaterfallSlot
        v-for="(item, index) in items"
        :width="'100'"
        :height="'auto'"
        :order="index"
        :key="item"
        move-class="item-move"
      >
        <!-- <div class="item" :style="item.style" :index="item.index"></div> -->
        <img
          style="width:100%;"
          :src="'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/'+item+'.jpg'"
        >
      </WaterfallSlot>
    </Waterfall>

    <center>sdfs</center>
    <div class="container">
      <div class="waterfall">
        <div class="pin" v-for="item in items" :key="item">
          <img :src="'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/'+item+'.jpg'">
          <p>1 convallis timestamp</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zg",
  data() {
    return {
      line: "h",
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      isBusy: false
    };
  },
  methods: {
    addItems: function() {
      if (!this.isBusy && this.items.length < 500) {
        this.isBusy = true;
        this.items.push.apply(this.items, ItemFactory.get(50));
      }
    },
    shuffle: function() {
      this.items.sort(function() {
        return Math.random() - 0.5;
      });
    },
    reflowed: function() {
      this.isBusy = false;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 80%;
  margin: 0 auto;
}

.waterfall {
  column-count: 3;
  column-width: 24em;
  column-gap: 1em;
}

.pin {
  padding: 1em;
  margin: 0 0.125em 1em;
  page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  break-inside: avoid;
  background: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);
}
.pin img {
  width: 100%;
  padding-bottom: 1em;
  margin-bottom: 0.5em;
  border-bottom: 1px solid #cccccc;
}
</style>
