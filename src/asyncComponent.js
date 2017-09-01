import Loadable from 'react-loadable';
import LoadingComponent from 'components/LoadingComponent';
import path from 'path';

export default function asyncComponent(importComponent, componentPath) {
  return Loadable({
    loader: () => importComponent(),
    loading: LoadingComponent,
    serverSideRequirePath: path.join(__dirname, `./src/${componentPath}`)
  });
}