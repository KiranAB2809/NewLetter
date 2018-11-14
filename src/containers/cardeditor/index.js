import React, { Component } from 'react';
import { connect } from 'react-redux';

import './cardeditor.css';
import AuthorInfo from '../common/authorinfo.react';
import Card from '../common/card.react';

class Cardeditor extends Component {


    constructor(props){
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount(){
        this.inputRef.current.onchange = () => this.onImageUpload();
    }

    onImageUpload = () => {
        let file = this.inputRef.current.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {

        };
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div className={'cardeditor-container'}>
                <AuthorInfo showReadytoPublish={true} user={this.props.User} buttonText={'Save'}></AuthorInfo>
                <div style={{ padding: "10px" }}>
                    <Card>
                        
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ User }) => ({
    User: User.User
});

export default connect(
    mapStateToProps,
    null
)(Cardeditor);