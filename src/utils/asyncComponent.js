import Loadable from 'react-loadable';
import LoadingComponent from 'components/LoadingComponent';

export default function asyncComponent(importComponent) {
  return Loadable({
    loader: () => importComponent(),
    loading: LoadingComponent
  });
}