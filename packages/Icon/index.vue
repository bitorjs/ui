<template>
  <i
    v-on="$listeners"
    :class="[classPrefix, isSrc ? 'icon image' : `${classPrefix}-${name}`]"
    :style="style"
  >
    <slot/>
    <img v-if="isSrc" :src="name">
    <template>
      <div class="info" v-if="info">{{ info }}</div>
    </template>
  </i>
</template>
<script>
function isSrc(url) {
  return /^(https?:)?\/\/|data:image/.test(url);
}
export default {
  name: "Icon",
  props: {
    info: [String, Number],
    name: String,
    size: String,
    color: String,
    info: [String, Number],
    classPrefix: {
      type: String,
      default: "icon"
    }
  },
  computed: {
    style() {
      return {
        color: this.color,
        fontSize: this.size
      };
    },
    isSrc() {
      return isSrc(this.name);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/theme";

.info {
  position: absolute;
  right: 0;
  top: -@info-size / 2;
  color: @info-color;
  font-size: @info-font-size;
  font-weight: @info-font-weight;
  font-family: @info-font-family;
  text-align: center;
  box-sizing: border-box;
  padding: @info-padding;
  min-width: @info-size;
  line-height: @info-size - @info-border-width * 2;
  border: @info-border-width solid @white;
  border-radius: @info-size;
  background-color: @info-background-color;
  transform: translateX(50%);
  transform-origin: 100%;
}

@font-face {
  font-style: normal;
  font-weight: normal;
  font-family: "icon";
  src: url("./icon.ttf") format("truetype");
}

.icon {
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 "icon";
  font-size: inherit;
  text-rendering: auto;

  &.image {
    width: 1em;
    height: 1em;

    img {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      max-width: 100%;
      max-height: 100%;
      position: absolute;
    }
  }

  &::before {
    display: inline-block;
  }
}

.icon-add-o::before {
  content: "\F000";
}

.icon-add::before {
  content: "\F001";
}

.icon-add2::before {
  content: "\F002";
}

.icon-after-sale::before {
  content: "\F003";
}

.icon-aim::before {
  content: "\F004";
}

.icon-alipay::before {
  content: "\F005";
}

.icon-arrow-down::before {
  content: "\F006";
}

.icon-arrow-left::before {
  content: "\F007";
}

.icon-arrow-up::before {
  content: "\F008";
}

.icon-arrow::before {
  content: "\F009";
}

.icon-balance-pay::before {
  content: "\F00A";
}

.icon-browsing-history::before {
  content: "\F00B";
}

.icon-card::before {
  content: "\F00C";
}

.icon-cart-o::before {
  content: "\F00D";
}

.icon-cart::before {
  content: "\F00E";
}

.icon-cash-back-record::before {
  content: "\F00F";
}

.icon-cash-on-deliver::before {
  content: "\F010";
}

.icon-certificate::before {
  content: "\F011";
}

.icon-chat::before {
  content: "\F012";
}

.icon-check::before {
  content: "\F013";
}

.icon-checked::before {
  content: "\F014";
}

.icon-clear::before {
  content: "\F015";
}

.icon-clock::before {
  content: "\F016";
}

.icon-close::before {
  content: "\F017";
}

.icon-completed::before {
  content: "\F018";
}

.icon-contact::before {
  content: "\F019";
}

.icon-coupon::before {
  content: "\F01A";
}

.icon-credit-pay::before {
  content: "\F01B";
}

.icon-cross::before {
  content: "\F01C";
}

.icon-debit-pay::before {
  content: "\F01D";
}

.icon-delete::before {
  content: "\F01E";
}

.icon-description::before {
  content: "\F01F";
}

.icon-discount::before {
  content: "\F020";
}

.icon-ecard-pay::before {
  content: "\F021";
}

.icon-edit-data::before {
  content: "\F022";
}

.icon-edit::before {
  content: "\F023";
}

.icon-exchange-record::before {
  content: "\F024";
}

.icon-exchange::before {
  content: "\F025";
}

.icon-fail::before {
  content: "\F026";
}

.icon-free-postage::before {
  content: "\F027";
}

.icon-gift-card-pay::before {
  content: "\F028";
}

.icon-gift-card::before {
  content: "\F029";
}

.icon-gift::before {
  content: "\F02A";
}

.icon-gold-coin::before {
  content: "\F02B";
}

.icon-goods-collect::before {
  content: "\F02C";
}

.icon-home::before {
  content: "\F02D";
}

.icon-hot-sale::before {
  content: "\F02E";
}

.icon-hot::before {
  content: "\F02F";
}

.icon-idcard::before {
  content: "\F030";
}

.icon-info-o::before {
  content: "\F031";
}

.icon-like-o::before {
  content: "\F032";
}

.icon-like::before {
  content: "\F033";
}

.icon-location::before {
  content: "\F034";
}

.icon-logistics::before {
  content: "\F035";
}

.icon-more-o::before {
  content: "\F036";
}

.icon-more::before {
  content: "\F037";
}

.icon-new-arrival::before {
  content: "\F038";
}

.icon-new::before {
  content: "\F039";
}

.icon-other-pay::before {
  content: "\F03A";
}

.icon-passed::before {
  content: "\F03B";
}

.icon-password-not-view::before {
  content: "\F03C";
}

.icon-password-view::before {
  content: "\F03D";
}

.icon-pause::before {
  content: "\F03E";
}

.icon-peer-pay::before {
  content: "\F03F";
}

.icon-pending-deliver::before {
  content: "\F040";
}

.icon-pending-evaluate::before {
  content: "\F041";
}

.icon-pending-orders::before {
  content: "\F042";
}

.icon-pending-payment::before {
  content: "\F043";
}

.icon-phone::before {
  content: "\F044";
}

.icon-photo::before {
  content: "\F045";
}

.icon-photograph::before {
  content: "\F046";
}

.icon-play::before {
  content: "\F047";
}

.icon-point-gift::before {
  content: "\F048";
}

.icon-points-mall::before {
  content: "\F049";
}

.icon-points::before {
  content: "\F04A";
}

.icon-qr-invalid::before {
  content: "\F04B";
}

.icon-qr::before {
  content: "\F04C";
}

.icon-question::before {
  content: "\F04D";
}

.icon-question2::before {
  content: "\F04E";
}

.icon-receive-gift::before {
  content: "\F04F";
}

.icon-records::before {
  content: "\F050";
}

.icon-search::before {
  content: "\F051";
}

.icon-send-gift::before {
  content: "\F052";
}

.icon-setting::before {
  content: "\F053";
}

.icon-share::before {
  content: "\F054";
}

.icon-shop-collect::before {
  content: "\F055";
}

.icon-shop::before {
  content: "\F056";
}

.icon-shopping-cart::before {
  content: "\F057";
}

.icon-sign::before {
  content: "\F058";
}

.icon-star-o::before {
  content: "\F059";
}

.icon-star::before {
  content: "\F05A";
}

.icon-stop::before {
  content: "\F05B";
}

.icon-success::before {
  content: "\F05C";
}

.icon-tosend::before {
  content: "\F05D";
}

.icon-underway::before {
  content: "\F05E";
}

.icon-upgrade::before {
  content: "\F05F";
}

.icon-value-card::before {
  content: "\F060";
}

.icon-wap-home::before {
  content: "\F061";
}

.icon-wap-nav::before {
  content: "\F062";
}

.icon-warn::before {
  content: "\F063";
}

.icon-wechat::before {
  content: "\F064";
}
</style>
