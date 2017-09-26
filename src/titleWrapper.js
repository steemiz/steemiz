import React from 'react';
import { Helmet } from 'react-helmet';

export default function titleWrapper(WrappedComponent, title) {
  return props => (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <WrappedComponent {...props} />
    </div>
  )
}
