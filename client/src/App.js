import React from 'react';
//router and switch effect
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//Starts a apollo client instantiation for client http link for server req
//caching data in apollo for faster returns of data already queried
// provider which gives the client req global scope
//create HttpLink, which is self explanatory
//from concats the different link pieces
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from
} from '@apollo/client';
//error handling for our client server routing
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import "./styles/index.css";
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { StoreProvider } from "./utils/GlobalState";
import './styles/index.css';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
// import Hiro from './components/Hiro';
import Earth from './components/Earth';
import OneAR from './components/OneAR';
import Threedee from './components/3D-Under-Construction';
import Nav from './components/Nav';

//connect to server side
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphQL'
});

//if error in client to server side requests...
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

//includes authorization to any server requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//puts all the previous together and starts a new cache
const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

function App() {
  return(
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              {/* <Route exact path="/products/:id/ar" component={AR} /> */}
              {/* /* <Route exact path="/ar" component={Hiro} /> */}
              <Route exact path="/ar/Earth" component={Earth} /> */
              <Route exact path="/products/:id/ar" component={OneAR} />
              <Route exact path="/ar/threedee" component={Threedee} />
              {/* <Route exact path="/products/:id/ar" component={HatTwo} />
              <Route exact path="/products/:id/ar" component={HatThree} />
              <Route exact path="/products/:id/ar" component={SunOne} />
              <Route exact path="/products/:id/ar" component={SunTwo} />
              <Route exact path="/products/:id/ar" component={SunThree} />
              <Route exact path="/products/:id/ar" component={WatchOne} />
              <Route exact path="/products/:id/ar" component={WatchTwo} />
              <Route exact path="/products/:id/ar" component={WatchThree} /> */}

              {/* <Route exact path="/threedee" component={ThreeDee} />
              <Route exact path="/shapes" component={Shapes} /> */}
          <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </div>
      </Router>
      </ApolloProvider>
    );
  }
export default App;
