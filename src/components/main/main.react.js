import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../home/home.react'
import List from './../newslist/newslist.react'
import Article from './../newspage/newspage.react'

const Main = () => (
    <route>
        <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/articles' component = {List} />
            <Route exact path='/article' component = {Article} />
        </Switch>        
    </route>
)

export default Main