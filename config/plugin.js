import UINI from 'ui-nipi';
import uiAxios from 'ui-axios';
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
  }
]