import React from 'react';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import ReviewCards from './pages/Review';
import { BookList, BookDetail } from './pages/Books';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>
        <Route path="/highlights/review">
          <ReviewCards />
        </Route>
        <Route path="/highlights/books" exact>
          <BookList />
        </Route>
        <Route path="/highlights/books/:id">
          <BookDetail />
        </Route>
      </Switch>
    </Router>
  </QueryClientProvider>
);

export default hot(App);
