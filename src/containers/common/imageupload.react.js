import React, { Component } from 'react';
import Overlay from './overlay.react';
import OverlayCross from './overlay.cross.react';
import './common.css';

class ImageUpload extends Component {

    state = {
        showDialog: false
    }

    constructor(props) {
        super(props);
        this.imageRef = React.createRef();
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.doUpload)
            this.inputRef.current.onchange = () => this.onImageUpload();
    }

    onImageClick = () => {
        this.inputRef.current.click();
    }

    onImageUpload = () => {
        let file = this.inputRef.current.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
            if (this.props.editImage) {
                this.setState({ showDialog: true });
                this.imageRef.current.src = reader.result;
            } else {
                this.props.uploadImageSrc(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    onSuccessUpload = () => {
        if (this.props.editImage && this.state.showDialog) {
            let resize = null;
            setTimeout(() => {
                resize = new window.Croppie(this.imageRef.current, {
                    viewport: {
                        width: 200,
                        height: 200,
                        type: 'circle'
                    },
                    boundary: {
                        width: 300,
                        height: 300
                    }
                });
            }, 100);

            const getCroppedImage = () => {
                resize.result({ type: 'blob', circle: true }).then(data => {
                    this.props.uploadImageSrc(data);
                });
                setDialogState();
            }

            const setDialogState = () => {
                this.setState({ showDialog: false })
            }
            return (
                <Overlay >
                    <OverlayCross changeView={setDialogState} />
                    <div className={'flex flex-column width-100'} style={{ height: '450px', position: 'relative' }}>
                        <img src={'#'} alt={"articlepicn"} ref={this.imageRef} />
                        <div className={'flex flex-row'} style={{ width: '220px', justifyContent: 'space-between', position: 'absolute', bottom: '0', left: '40%' }}>
                            <button className={'userButton'} style={{ borderColor: 'green', color: 'green' }} onClick={() => getCroppedImage()}>Save</button>
                            <button className={'userButton'} style={{ borderColor: 'grey', color: 'grey' }}>Cancel</button>
                        </div>
                    </div>
                </Overlay>);
        }
        return null;
    }

    doUpload = () => {
        if (this.props.doUpload) {
            return (
                <div style={{ width: 'inherit', height: 'inherit', borderRadius: 'inherit' }}>
                    <div className={'flex'} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 'inherit', backgroundColor: 'rgba(0,0,0,0.64)', cursor: 'pointer' }} onClick={() => this.onImageClick()}>
                        <i className="fas fa-camera" style={{ margin: 'auto', color: 'white', fontSize: '35px' }}></i>
                    </div>
                    <input type="file" id="my_file" style={{ display: "none" }} ref={this.inputRef} accept={'.png, .jpg, .jpeg, .gif'} />

                </div>
            )
        }
        return null;
    }

    render() {
        let { className, img } = this.props;
        return (
            <div>
                <div className={className} style={{ backgroundImage: `url(${(img)})`, position: "relative"}}>
                    {this.doUpload()}
                </div>
                {this.onSuccessUpload()}
            </div>
        )
    }
}

export default ImageUpload;