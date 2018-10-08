import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './../home/home.react'
import List from './../newslist/newslist.react'
import Article from './../newspage/newspage.react'
import Awards from './../awards/awards.react'
import DYK from './../didyouknow/didyouknow.react'

const Main = () => (
    <route>
        <Switch>
            <Route exact path='/' component = {Home} />
            <Route exact path='/articles' component = {List} />
            <Route exact path='/article' component = {Article} />
            <Route exact path='/awards' component = {Awards} />
            <Route exact path='/didyouknow' component = {DYK} />
        </Switch>        
    </route>
)

export default Main