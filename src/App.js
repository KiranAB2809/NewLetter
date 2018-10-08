import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Article from './components/newspage/newspage.react';
import ArticleList from './components/newslist/newslist.react';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main className = "bodyContainer">
          <Route exact path="/" component={Home} />
          <Route exact path="/article" component={Article} />
          <Route exact path="/allarticles/:id" component = { ArticleList } />
        </main>
      </div>
    );
  }
}

export default App;
