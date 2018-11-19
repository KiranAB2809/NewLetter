import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/home';
import Header from './containers/header';
import Topic from './containers/topics';
import Article from './containers/article';
import CreateBlog from './containers/editor';
import Setting from './containers/setting';
import Cardeditor from './containers/cardeditor';
import Loading from './containers/loading';
import byothers from './containers/byothers';

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <Header />
          <Loading />
        </header>
        <main className="bodyContainer">
          <Switch>
            <Route exact path="/sa" component={Home} />
            <Route exact path="/topic/:id" component={Topic} />
            <Route exact path="/article/:id" component={Article} />
            <Route excat path="/create/:id?" component={CreateBlog} />
            <Route excat path="/setting" component={Setting} />
            <Route excat path="/cardeditor/:mode?/:type?/:id?" component={Cardeditor} />
            <Route excat path="/" component={byothers} />
            {/* <Route exact path="/doother/:type?" component={byothers}/> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

