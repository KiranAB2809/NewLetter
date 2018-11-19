import React, { Component } from 'react';
import ImageUpload from '../common/imageupload.react';

export class CardFormBlog extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    uploadImageSrc = (data) => {
        console.log(data);
    }

    // showBlog = () => {
    //     if (this.props.showImageUpload) {
    //         return (
    //             <div className={'flex flex-row'} style={{ padding: "10px" }}>
    //                 <div style={{ padding: '0 10px', position: 'relative', position: "relative" }}>
    //                     <div className={'flex'} style={{ height: '150px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '4%', backgroundColor: 'rgba(0,0,0,0.64)', cursor: 'pointer' }} onClick={() => this.onImageClick()}>
    //                         <i className="fas fa-camera" style={{ margin: 'auto', color: 'white', fontSize: '35px' }}></i>
    //                     </div>
    //                     <input type="file" id="my_file" style={{ display: "none" }} ref={this.inputRef} accept={'.png, .jpg, .jpeg, .gif'} />
    //                 </div>
    //                 <div className={'flex flex-column'} style={{ padding: '0 10px', flex: '1 1' }}>
    //                     <input placeholder={'Title'} className={'input input-email'} style={{ marginBlockEnd: '10px' }} disabled={'true'}></input>
    //                     <textarea style={{ width: '100%', resize: 'vertical', minHeight: '100px' }}></textarea>
    //                 </div>
    //             </div>
    //         )
    //     }
    //     return (
    //         <div className={'flex flex-row'} style={{ padding: "10px" }}>
    //             <div style={{ width: '200px', padding: '0 10px', position: 'relative', height: '150px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url(${'http://localhost:8000/static/defaultUser.png'})`, backgroundSize: '200px 150px' }}>
    //             </div>
    //             <div className={'flex flex-column'} style={{ padding: '0 10px', flex: '1 1' }}>
    //                 <input placeholder={'Title'} className={'input input-email'} style={{ marginBlockEnd: '10px' }} disabled={'true'}></input>
    //                 <textarea style={{ width: '100%', resize: 'vertical', minHeight: '100px' }}></textarea>
    //             </div>
    //         </div>
    //     );
    // }

    // showProfile = () => {
    //     if (this.props.showProfileUpload) {
    //         <div className={'avatar-image default-image'} style={{ width: '100px', height: '100px', backgroundImage: `url(${(img ? img : 'http://localhost:8000/static/defaultUser.png')})`, backgroundSize: '100px 100px', position: "relative", opacity: 0.7 }}>
    //             <div className={'flex'} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 'inherit', backgroundColor: 'rgba(0,0,0,0.64)', cursor: 'pointer' }} onClick={() => this.onImageClick()}>
    //                 <i className="fas fa-camera" style={{ margin: 'auto', color: 'white', fontSize: '35px' }}></i>
    //             </div>
    //             <input type="file" id="my_file" style={{ display: "none" }} ref={this.inputRef} accept={'.png, .jpg, .jpeg, .gif'} />
    //         </div>
    //     } else {
    //         <div className={'avatar-image default-image'} style={{ width: '100px', height: '100px', backgroundImage: `url(${(img ? img : 'http://localhost:8000/static/defaultUser.png')})`, backgroundSize: '100px 100px' }}>
    //         </div>
    //     }
    // }

    showBlog = () => {
        let { data, index, doUpload, className, uploadImageSrc } = this.props;
        let { title, body, image } = data;
        image = image || 'http://localhost:8000/static/defaultDidYouKnow.jpg';
        return (
            <div className={'flex flex-row'} style={{ padding: "10px" }}>
                <ImageUpload uploadImageSrc={(data) => uploadImageSrc(data, index)} className={className} doUpload={doUpload} img={image} />
                <div className={'flex flex-column'} style={{ padding: '0 10px', flex: '1 1' }}>
                    <input name={'title'} value={title} placeholder={'Title'} className={'input input-email'} style={{ marginBlockEnd: '15px' }} onChange={(event) => this.props.onEdit(event, index)}></input>
                    <textarea name={'body'} value={body} style={{ width: '100%', resize: 'vertical', minHeight: '110px' }} onChange={(event) => this.props.onEdit(event, index)}></textarea>
                </div>
            </div>
        )
    }

    // renderWhat = () => {
    //     if (this.props.showProfile) {
    //         return (
    //             <div>
    //                 {this.showProfile()}
    //             </div>)
    //     }
    //     return (
    //         <div>
    //             {this.showBlog()}
    //         </div>)
    // }

    render() {
        return (
            <div>
                {this.showBlog()}
            </div>
        )
    }
}
