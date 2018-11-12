import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Topic from './containers/topics';
import Article from './containers/article';
import CreateBlog from './containers/editor';
import Setting from './containers/setting';
import Cardeditor from './containers/cardeditor';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main className="bodyContainer">
            <Route exact path="/ff" component={Home} />
            <Route exact path="/topic/:id" component={Topic} />
            <Route exact path="/article/:id" component={Article} />
            <Route excat path="/create/:id?" component={CreateBlog} />
            <Route excat path="/setting" component = {Setting} />
            <Route excat path="/" component = {Cardeditor} />
        </main>
      </div>
    );
  }
}

export default App;
