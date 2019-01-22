<template>
  <transition name="slide-up">
    <div v-show="value" :class="['actionsheet', { withtitle: title }]">
      <div :class="['header', 'hairline--top-bottom']" v-if="title">
        {{title}}
        <Icon name="close" @click.native="onCancel"/>
      </div>
      <div
        :class="[ 'item', { disabled: item.disabled || item.loading }, item.className, 'hairline--top' ]"
        @click="event=>{
          onSelect(event, item);
        }"
        v-for="(item,key) in actions"
        :key="key"
      >
      <Loading class="loading" size="20px" v-if="item.loading"/>
        
      <span v-if="!item.loading" class="name" >{{item.name}}</span>
      <span v-if="!item.loading&&item.subname" class="subname">{{item.subname}}</span>
      
      </div>
      <div class="cancel" @click="onCancel" v-if="cancelText">{{cancelText}}</div>
      <div class="content" v-else>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
import Icon from "../Icon";
import Loading from "../Loading";
import Popup from "../common/mixins/popup";

export default {
  name: "ActionSheet",
  components: {
    Loading,
    Icon
  },
  mixins: [Popup],
  props: {
    title: String,
    value: Boolean, //  用于外部 v-model, v-model 只能绑定到 value属性值，谁有value就可以绑定谁
    actions: Array,
    cancelText: String,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    select: Function,
    cnacel: Function,
  },
  methods: {
    onSelect(event, item) {
      event.stopPropagation();
      if (!item.disabled && !item.loading) {
        if (item.callback) {
          item.callback(item);
        }
        this.select?this.select(item):this.$emit("select", item);
      }
    },
    onCancel() {
      this.$emit("input", false);
      this.cancel?this.cancel():this.$emit("cancel");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";
@import "../common/style/hairline";
@import '../common/style/animation';

.actionsheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: @text-color;
  max-height: 90%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: @background-color;

  &.withtitle {
    background-color: @white;
  }

  .item,
  .cancel {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    background-color: @white;

    &:active {
      background-color: @active-color;
    }
  }

  .item.disabled {
    color: @gray;

    &:active {
      background-color: @white;
    }
  }

  .subname {
    font-size: 12px;
    color: @gray-darker;
    margin-left: 5px;
  }

  .loading {
    display: inline-block;
  }

  .cancel {
    margin-top: 10px;
  }

  .header {
    font-size: 16px;
    line-height: 44px;
    text-align: center;

    .icon-close {
      top: 0;
      right: 0;
      padding: 0 15px;
      font-size: 18px;
      color: @gray-dark;
      position: absolute;
      line-height: inherit;
    }
  }
}
</style>
