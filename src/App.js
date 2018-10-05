import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './components/home/home.react';
import Header from './components/header/header.react';
import Article from './components/newspage/newspage.react'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/article" component={Article} />
        </main>
      </div>
    );
  }
}

export default App;
