import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Topic from './containers/topics';
import Article from './containers/article';
// import Article from './components/newspage/newspage.react';
// import ArticleList from './components/newslist/newslist.react';
// import Main from './components/main/main.react'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main className="bodyContainer">
          <Route exact path="/dsd" component={Home} />
          <Route exact path="/dsdsd" component={Topic} />
          <Route exact path="/" component={Article} />
        </main>
      </div>
    );
  }
}

export default App;
