import React, { Component } from 'react';
import './home.css';
import logo from './../../assets/images/volvoLogo.jpg';


class Featured extends Component{
    render(){
        return(
            <div className={`homeDiv ${this.props.additionalClass}`}>
                <div className = "featured">
                    <div>
                        <img src={logo} className = "featuredImage"/>
                    </div>
                    <div style={{margin: '20px 0'}}>
                        <h3 className = "headerh3 height18" style={{WebkitBoxOrient: 'vertical'}}>We found a way to increase voter turnout in Texas </h3>
                        <p className="player" style={{color:'#777777', fontSize: '15px'}}>Contradicting its own election code, Texas rejects thousands of voter registration forms mere days before the deadline </p>
                        <div style={{marginTop: '20px'}}>
                            <p className="player" style={{color: '#000000'}}>Nandan A</p>
                            <p className="player" style={{color:'#777777', fontSize: '13px'}}>Oct 8 - Reported by Bala</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Featured;