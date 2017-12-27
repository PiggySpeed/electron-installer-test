import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/app';

const renderComponent = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('content')
  );
};

renderComponent(App);

if (module.hot) {
  module.hot.accept('./components/app.js', () => {
    const NextComponent = require('./components/app.js').default;
    renderComponent(NextComponent);
  })
}
