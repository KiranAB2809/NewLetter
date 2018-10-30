import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Topic from './containers/topics';
import Article from './containers/article';
import CreateBlog from './containers/editor';
import Setting from './containers/setting';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
        <main className="bodyContainer">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/topic" component={Topic} />
            <Route exact path="/article" component={Article} />
            <Route excat path="/article/create" component={CreateBlog} />
            <Route excat path="/setting" component = {Setting} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
