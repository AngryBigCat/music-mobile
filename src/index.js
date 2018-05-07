import React from 'react';
import ReactDOM from 'react-dom';
import RouterConfig from './router';
import registerServiceWorker from './registerServiceWorker';

import "antd-mobile/dist/antd-mobile.min.css";

ReactDOM.render(<RouterConfig/>, document.getElementById('root'));
registerServiceWorker();