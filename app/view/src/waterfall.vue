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
    <div id="album">
      <article>
        <div v-for="item in items" :key="item">
          <figure>
            <img :src="'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/'+item+'.jpg'">
          </figure>
          <div class="top">
            <div>
              <p class="title">sdfad</p>
            </div>
          </div>
          <div class="bottom">
            <div>
              <p class="introduction">1 convallis timestamp</p>
            </div>
          </div>
        </div>
      </article>
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
<style lang="less" scoped>
#album {
  height: 100%;
  width: 100%;
  font-size: 1em;
  text-align: center;
}
#album > article {
  column-count: 4;
  column-gap: 0;
}
#album > article > div {
  position: relative;
  background: linear-gradient(to top, black 0%, transparent 70%);
}
#album > article > div:hover img {
  opacity: 0.5;
}
#album > article > div:hover .introduction {
  opacity: 1;
}
#album > article figure {
  height: auto;
  font-size: 0;
}
.top {
  position: absolute;
  top: 20%;
  width: 100%;
}
.top > div {
  width: 100%;
  text-align: center;
}
.title {
  font-size: 3em;
  color: white;
  font-weight: 900;
  margin: 0 auto;
  opacity: 1;
}
.bottom {
  position: absolute;
  bottom: 10%;
  width: 100%;
}
.bottom > div {
  width: 100%;
  text-align: center;
}
.introduction {
  font-size: 1.5em;
  color: white;
  margin: 0 auto;
  line-height: 1em;
  opacity: 0;
}
img {
  max-width: 100%;
}
</style>
