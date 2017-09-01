const path = require('path');
const fs = require('fs');

const React = require('react');
const {Provider} = require('react-redux');
const {renderToString} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');

import store from '../src/store';
import App from '../src/features/App/App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');
  const muiTheme = getMuiTheme({
    userAgent: req.headers['user-agent'],
  });

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err);
      return res.status(404).end()
    }
    const context = {};
    const markup = renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          <MuiThemeProvider muiTheme={muiTheme}>
            <App/>
          </MuiThemeProvider>
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      redirect(301, context.url)
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup);
      res.send(RenderedApp)
    }
  })
};

