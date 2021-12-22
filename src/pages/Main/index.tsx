import PageErrorBoundary from 'components/PageErrorBoundary/PageErrorBoundary';
import React, { Suspense } from 'react';

import Loader from './Loader';

const Main = React.lazy(() => import('./Main'));

export default function () {
  return (
    <PageErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
    </PageErrorBoundary>
  );
}
