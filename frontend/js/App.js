import React from 'react';
import { hot } from 'react-hot-loader/root';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { Memex } from 'pages/Memex';
import { ReviewEditHighlight } from 'components/EditHighlight';

import ReviewRandomCards from './pages/Review';
import { BookList } from './pages/Books';
import { BookDetail } from './pages/BookDetail';

const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer position="top-center" />
    <Router>
      <Switch>
        <Route path="/highlights/review" exact>
          <ReviewRandomCards />
        </Route>
        <Route path="/highlights/review/:id">
          <ReviewEditHighlight />
        </Route>
        <Route path="/highlights/books" exact>
          <BookList />
        </Route>
        <Route path="/highlights/books/:id">
          <BookDetail />
        </Route>
      </Switch>
      <Route path="/memex" exact>
        <Memex />
      </Route>
    </Router>
  </QueryClientProvider>
);

export default hot(App);
