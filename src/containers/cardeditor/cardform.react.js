import React, { Component } from 'react';
import ImageUpload from '../common/imageupload.react';

export class CardFormBlog extends Component {

    showBlog = () => {
        let { data, index, doUpload, className, uploadImageSrc, editImage } = this.props;
        let { title, body, coverImage, type } = data;
        coverImage = coverImage || (this.props.type === 'didyouknow' ? 'http://segotn14123:85/static/defaultDidYouKnow.jpg' : 'http://segotn14123:85/static/defaultUser.png');
        let input;
        let textArea;
        let select;
        if (doUpload) {
            input = <input name={'title'} value={title} placeholder={'Title'} className={'input input-email'} style={{ marginBlockEnd: '15px' }} onChange={(event) => this.props.onEdit(event, index)}></input>;
            textArea = <textarea name={'body'} value={body} style={{ width: '100%', resize: 'vertical', minHeight: '110px' }} onChange={(event) => this.props.onEdit(event, index)}></textarea>
            if(this.props.type === 'awards'){
                select = 
                <select name={'type'} style={{marginBottom: '15px', padding: '5px', width: '200px'}} value={type} onChange={(event) => this.props.onEdit(event, index)}>
                    <option value='S'>Spot award</option>
                    <option value='T'>Star award</option>
                </select>
            }
        } else {
            input = <h3 style={{ margin: 0 }}>{title}</h3>;
            textArea = <p style={{ margin: 0 }}>
                {body}
            </p>
        }
        return (
            <div className={'flex flex-row'} style={{ padding: "10px" }}>
                <ImageUpload uploadImageSrc={(data) => uploadImageSrc(data, index)} className={className} doUpload={doUpload} img={coverImage} editImage={editImage || false}/>
                <div className={'flex flex-column'} style={{ padding: '0 10px', flex: '1 1' }}>
                    {input}
                    {select}
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
