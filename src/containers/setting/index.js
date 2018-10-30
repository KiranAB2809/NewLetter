import React, { Component } from 'react';
import './setting.css'
import Overlay from '../common/overlay.react';
import Logo from './../../assets/images/Kiran.jpg';

class Setting extends Component {

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
    }

    componentDidMount() {

        // var resize = new window.Croppie(this.imageRef.current, {
        //     viewport: {
        //         width: 200,
        //         height: 200,
        //         type: 'circle'
        //     },
        //     boundary: {
        //         width: 500,
        //         height: 500
        //     }
        // });
    }

    render() {
        return (
            <div className={'flex flex-row setting-container'}>
                <div className={'flex flex-row name-div width-100'}>
                    <input name={'name'} placeholder={'Enter your Name'} className={'input input-name'}></input>
                    <div>
                        <img src={Logo} className={'avatar-image'} style={{width: '100px', height: '100px'}}></img>
                    </div>
                </div>
            </div>
        )
    }
}

export default Setting;