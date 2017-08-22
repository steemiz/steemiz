import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './utils/helpers/immutabilityHelpers';

import store, { history } from './store';
import './index.css';
import App from './features/App/App';
import registerServiceWorker from './registerServiceWorker';

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <IntlProvider locale="en">
          <Router>
            <App />
          </Router>
        </IntlProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
