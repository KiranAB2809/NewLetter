import React, { Component } from 'react';
import ImageUpload from '../common/imageupload.react';

export class CardFormBlog extends Component {

    uploadImageSrc = (data) => {
        console.log(data);
    }

    showBlog = () => {
        let { data, index, doUpload, className, uploadImageSrc } = this.props;
        let { title, body, image } = data;
        image = image || 'http://localhost:8000/static/defaultDidYouKnow.jpg';
        let input;
        let textArea;
        if (doUpload) {
            input = <input name={'title'} value={title} placeholder={'Title'} className={'input input-email'} style={{ marginBlockEnd: '15px' }} onChange={(event) => this.props.onEdit(event, index)}></input>;
            textArea = <textarea name={'body'} value={body} style={{ width: '100%', resize: 'vertical', minHeight: '110px' }} onChange={(event) => this.props.onEdit(event, index)}></textarea>
        } else {
            input = <h3 style={{margin: 0}}>{title}</h3>;
            textArea = <p style={{margin: 0}}>
                {body}
                </p>
        }
        return (
            <div className={'flex flex-row'} style={{ padding: "10px" }}>
                <ImageUpload uploadImageSrc={(data) => uploadImageSrc(data, index)} className={className} doUpload={doUpload} img={image} />
                <div className={'flex flex-column'} style={{ padding: '0 10px', flex: '1 1' }}>
                    {input}
                    {textArea}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.showBlog()}
            </div>
        )
    }
}
