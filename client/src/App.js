import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import { StoreProvider } from "./utils/GlobalState";
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Hiro from './components/Ar/Hiro';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <StoreProvider>
              <Hiro />
              <Nav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/success" component={Success} />
                  <Route exact path="/orderHistory" component={OrderHistory} />
                  <Route exact path="/products/:id" component={Detail} />
                  <Route component={NoMatch} />
                </Switch>
            </StoreProvider>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById('root'));

export default App;
