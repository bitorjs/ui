import uiTest from 'ui-test';
import uiAxios from 'ui-axios';

export default [{
    module: uiTest,
    enable: true
  },
  {
    module: uiAxios,
    enable: true,
    baseUrl: 'http://localhost:8080'
  }
]