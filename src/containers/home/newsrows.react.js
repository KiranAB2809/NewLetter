import React from 'react';
import './home.css';
import logo from './../../assets/images/volvoLogo.jpg';


const NewsRow = (props) => {
    const addDescripion = () => {
        if(props.showDescription){
            return(
            <p className="player" style={{color:'#777777', fontSize: '15px', marginBottom: '20px'}}>
                Contradicting its own election code, Texas rejects thousands of voter registration forms mere days before the deadline
            </p>); 
        }
       return null;
    }
    return(
        <div className={`mearger ${props.rowreverse ? props.rowreverse: ''} ${props.height ? props.height : ''}`}>
            <div className="mearger-0">
                <img src={logo} className = {`article-logo ${props.imageClass ? props.imageClass : ''}`}/>
            </div>
            <div className="mearger-1">
                <h3 className = {`headerh3 ${props.height18 ? props.height18 : ''}`}>We found a way to increase voter turnout in Texas </h3>
                {addDescripion()}
                <p className="player" style={{color: '#000000'}}>Nandan A</p>
                <p className="player" style={{color:'#777777', fontSize: '13px'}}>Oct 8 - Reported by Bala</p>
            </div>
        </div>
    )
}

export default NewsRow;