import ErrorBoundary from 'components/ErrorBoundary';
import Layout from 'components/Layout';
import React from 'react';
import { Provider } from 'react-redux';
import Routes from 'routes';
import store from 'store';
import './App.css';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout>
          <Routes />
        </Layout>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
