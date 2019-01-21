<template>
  <transition name="slide-up">
    <div v-show={value} :class='["actionsheet", { withtitle: title }]'>
      {title ? (
        <div :class='["header", "hairline--top-bottom"]'>
          {title}
          <Icon name="close" onClick={onCancel} />
        </div>
      ) : (
        <div :class='[ "item", { disabled: item.disabled || item.loading }, item.className, "hairline--top" ]'
          onClick=event => {
            this.onSelect(event, item);
          }
          v-for="item in actions"
        >
          {item.loading ? (
            <Loading class="loading" size="20px" />
          ) : (
            [
              <span class="name">{item.name}</span>,
              <span v-if="item.subname" class="subname">{item.subname}</span>
            ]
          )}
        </div>
      )}
      {cancelText ? (
        <div class="cancel" onClick={onCancel}>
          {cancelText}
        </div>
      ) : (
        <div class="content">{$slots.default}</div>
      )}
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
    value: Boolean,
    actions: Array,
    cancelText: String,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { onCancel };
  },
  methods: {
    onSelect(event, item) {
      event.stopPropagation();

      if (!item.disabled && !item.loading) {
        if (item.callback) {
          item.callback(item);
        }

        this.$emit("select", item);
      }
    },

    onCancel() {
      this.$emit("input", false);
      this.$emit("cancel");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";
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

  .item--disabled {
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
