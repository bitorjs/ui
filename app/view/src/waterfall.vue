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
        :height="'100'"
        :order="index"
        :key="item"
        move-class="item-move"
      >
        <!-- <div class="item" :style="item.style" :index="item.index"></div> -->
        <img :src="'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/'+item+'.jpg'">
      </WaterfallSlot>
    </Waterfall>
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
</style>
