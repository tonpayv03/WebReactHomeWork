import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/page_components/Home';
import ProductDetail from './components/page_components/ProductDetail';
import ProductSummary from './components/page_components/ProductSummary';
import './components/assets/index.css'
import './components/assets/index'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/product-detail' component={ProductDetail} />
        <Route exact path='/product-summary' component={ProductSummary} />
      </Switch>
    );
  }
}
