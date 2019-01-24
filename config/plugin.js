import UINI from 'ui-nipi';
import uiAxios from 'ui-axios';
import uiWX from 'ui-wxshare';
import uiTest from 'ui-test';


export default [
  {
    module: UINI,
    enable: true
  },
  {
    module: uiTest,
    enable: true
  },
  {
    module: uiAxios,
    enable: true,
    baseUrl: 'http://localhost:8080'
  },
  {
    module: uiWX,
    enable: true,
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [],
    title:'',
    desc:'',
    link:'',
    imgUrl:'',
    type: undefined,
    dataUrl:undefined,
    success:undefined
  }
]