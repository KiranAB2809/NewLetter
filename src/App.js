import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Topic from './containers/topics';
import Article from './components/newspage/newspage.react';
import ArticleList from './components/newslist/newslist.react';
import Main from './components/main/main.react'

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main className = "bodyContainer">
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Topic} />
          <Route exact path="/allarticles/:id" component = { ArticleList } />
        </main>
      </div>
    );
  }
}

export default App;
