import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

import Home from '../pages/Home';
// import Detail from './pages/Detail';
// import NoMatch from './pages/NoMatch';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import Nav from './components/Nav';
import { StoreProvider } from "../utils/GlobalState";
// import Success from './pages/Success';
// import OrderHistory from './pages/OrderHistory';
import Hiro from './hiro/Hiro';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// ifconfig -> en0 -> inet -> https/x:3000


// import Torus from './torus/Torus';
// import RollingScopes from './rollingScopes/RollingScopes';
// import Earth from './earth/Earth';
// import TrainTicket from './trainTicket/TrainTicket';
// import Railcard from './railcard/Railcard';

function App() {
  return(
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/ar" component={Hiro} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
      </ApolloProvider>
    );
  }


render(<App />, document.getElementById('root'));

export default App;
