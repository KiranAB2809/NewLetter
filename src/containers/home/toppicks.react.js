import React, { Component } from 'react';
import NewsRow from './newsrows.react';


class TopPicks extends Component {

    renderGist = () => {
        return (
            ['1', '2', '3'].map(elemment => <NewsRow height={'height100'}/>)
        )
    }

    render(){
        return (
            <div className="homeDiv-1">
                {this.renderGist()}
            </div>
        )
    }
}

export default TopPicks;