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
                        <div className={'flex flex-row'} style={{ padding: "10px" }}>
                            <div style={{ width: '200px', padding: '0 10px', position: 'relative', height: '150px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${'http://localhost:8000/static/defaultUser.png'})`, backgroundSize: '200px 150px', position: "relative", opacity: 0.7 }}>
                                <div className={'flex'} style={{ height: '150px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '4%', backgroundColor: 'rgba(0,0,0,0.64)', cursor: 'pointer' }} onClick={() => this.onImageClick()}>
                                    <i className="fas fa-camera" style={{ margin: 'auto', color: 'white', fontSize: '35px' }}></i>
                                    <input type="file" id="my_file" style={{ display: "none" }} ref={this.inputRef} accept={'.png, .jpg, .jpeg, .gif'} />
                                </div>
                            </div>
                            <div className={'flex flex-column'} style={{ padding: '0 10px', flex: '1 1'}}>
                                <input placeholder={'Title'} className={'input input-email'} style={{marginBlockEnd: '10px'}} disabled={'true'}></input>
                                <textarea style={{width: '100%', resize: 'vertical', minHeight: '100px'}}></textarea>
                            </div>
                        </div>
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