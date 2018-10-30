import React from 'react';
import './common.css';
import logo from './../../assets/images/volvoLogo.jpg';
import Content from './desc.react';


const Row = (props) => {
    const addDescripion = () => {
        if(props.showDescription){
            return(
                <Content className = {'articleSubtitle colorGrey'} desc = {'Contradicting its own election code, Texas rejects thousands of voter registration forms mere days before the deadline'} />
            ); 
        }
       return null;
    }
    return(
        <div className={`mearger ${props.rowreverse ? props.rowreverse: ''} ${props.height ? props.height : ''} ${props.border ? props.border: ''}`}>
            <div className="mearger-0">
                <img src={logo} className = {`article-logo ${props.imageClass ? props.imageClass : ''}`} alt = {'article image'}/>
            </div>
            <div className="mearger-1">
                <h3 className = {`headerh3 ${props.height18 ? props.height18 : ''}`} style={{WebkitBoxOrient: 'vertical'}}>We found a way to increase voter turnout in Texas and lets play</h3>
                {addDescripion()}
                <Content className = {'colorBlack'} desc = {'Nandan A'}/>
                <Content className = {'colorGrey'} desc = {'Oct 8 - Reported by Bala'} />
            </div>
        </div>
    )
}

export default Row;