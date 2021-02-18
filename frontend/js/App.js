import React from 'react';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query'

import Home from './pages/Home';
import ReviewCards from './pages/Review';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReviewCards />
  </QueryClientProvider>
);

export default hot(App);
