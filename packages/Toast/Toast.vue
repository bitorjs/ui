<template>
  <transition name="fade">
    <div class="toast" v-show="value" :class="[style, position]">
      <!-- text only -->
      <div v-if="style === 'text'">{{ message }}</div>
      <div v-if="style === 'html'" v-html="message"/>
      <!-- with icon -->
      <template v-if="style === 'default'">
        <loading v-if="type === 'loading'" color="white" :type="loadingType"/>
        <icon v-else :class="'icon'" :name="type"/>
        <div v-if="message" :class="'text'">{{ message }}</div>
      </template>
    </div>
  </transition>
</template>

<script>
import Popup from "../common/mixins/popup";

const STYLE_LIST = ["success", "fail", "loading"];
export default {
  name: "Toast",
  mixins: [Popup],
  props: {
    forbidClick: Boolean,
    value: String,
    message: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    loadingType: {
      type: String,
      default: "circular"
    },
    position: {
      type: String,
      default: "middle"
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      clickable: false
    };
  },
  computed: {
    style() {
      return STYLE_LIST.indexOf(this.type) !== -1 ? "default" : this.type;
    }
  },
  mounted() {
    this.toggleClickale();
  },
  destroyed() {
    this.toggleClickale();
  },
  watch: {
    value() {
      this.toggleClickale();
    },
    forbidClick() {
      this.toggleClickale();
    }
  },
  methods: {
    toggleClickale() {
      const clickable = this.value && this.forbidClick;
      if (this.clickable !== clickable) {
        this.clickable = clickable;
        const action = clickable ? "add" : "remove";
        document.body.classList[action]("unclickable");
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  color: @toast-text-color;
  max-width: @toast-max-width;
  font-size: @toast-font-size;
  line-height: @toast-line-height;
  border-radius: @toast-border-radius;
  word-break: break-all;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-sizing: content-box;
  transform: translate3d(-50%, -50%, 0);
  background-color: @toast-background-color;

  // hack for avoid max-width when use left & fixed
  width: fit-content;

  // should not add pointer-events: none directly to body tag
  // that will cause unexpected tap-highlight-color in mobile safari
  &.unclickable {
    * {
      pointer-events: none;
    }
  }

  &.text {
    padding: @toast-text-padding;
    min-width: @toast-text-min-width;
  }

  &.default {
    width: @toast-default-width;
    padding: @toast-default-padding;
    min-height: @toast-default-min-height;

    .icon {
      font-size: @toast-icon-size;
    }

    .loading {
      margin: 10px 0;
    }

    .text {
      padding-top: 5px;
    }
  }

  &.top {
    top: @toast-position-top-distance;
  }

  &.bottom {
    top: auto;
    bottom: @toast-position-bottom-distance;
  }
}
</style>
