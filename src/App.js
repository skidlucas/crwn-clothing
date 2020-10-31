import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { createStructuredSelector } from 'reselect';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const stripePromise = loadStripe('pk_test_51HZxIlFf9GBKRaZ6kZUDfWCh5UJUo6afhUFhueekiNojPImca6HerzjXPxXiJExSt71lFz6Z4GEbqWQmbg0jvqwa00TOD2PIuq');

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Elements stripe={stripePromise}>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin'
                 render={() => currentUser ? <Redirect to='/'/> : <SignInAndSignUpPage/>}/>
        </Switch>
      </Elements>
    </div>
  );

};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
