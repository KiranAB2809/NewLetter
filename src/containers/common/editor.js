import React, { Component } from 'react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/lists';
import { api } from '../../services';


class TinyEditorComponent extends Component {
    constructor(props) {
        super(props);
        this.editor = null;
        this.inputRef = null;
        this.currentContent = '';
    }
    componentDidMount() {

        this.initalizeEditor();
    }

    initalizeEditor = () => {
        console.log(`${process.env.PUBLIC_URL}`);
        let initalizeEditor = {
            target: this.inputRef,
            menubar: false,
            inline: true,
            theme: 'inlite',
            min_height: 400,
            plugins: `autolink codesample media contextmenu link lists table textcolor hr paste image`,
            selection_toolbar: 'bold italic quicklink | blockquote h2 h3 | bullist numlist',
            insert_toolbar: 'quicktable image media codesample hr',
            contextmenu: 'quicktable image media',
            setup: editor => {
                this.editor = editor;
                this.currentContent = this.props.value;
                editor.on('init', () => {
                    if (typeof this.props.value === 'string') {
                        this.setContent(editor);
                    }
                })
                editor.on('keyup change', () => {
                    const content = editor.getContent();
                    this.currentContent = content;
                    if (typeof this.props.onEditorChange === 'function')
                        this.props.onEditorChange(content);
                    else
                        console.log('Cannot emit the event');
                });
            },
            paste_data_images: true,
            paste_as_text: true,
            image_dimensions: false,
            automatic_uploads: true,
            image_class_list: [
                { title: '', value: 'defaultImageSize' }
            ],
            file_picker_type: 'image',
            file_picker_callback: (cb, value, meta) => {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    reader.onload = function () {
                        var name = file.name;
                        var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                        var base64 = reader.result.split(',')[1];
                        var blobInfo = blobCache.create(name, file, base64);
                        api.uploadBlogImage(blobInfo.blob())
                            .then(data => cb(data.response.location, { title: file.name }))
                            .catch(err => console.log(err));
                    };
                    reader.readAsDataURL(file);
                };
                input.click();
            }
        }
        tinymce.init(initalizeEditor)
    }

    componentWillUnmount() {
        tinymce.remove(this.editor);
    }

    componentDidUpdate() {
        if (this.currentContent !== this.props.value) {
            this.setContent(this.editor);
        }
    }

    setContent = (editor) => {
        if (typeof this.props.value === 'string') {
            try {
                editor.setContent(this.props.value);
            } catch(ex){
                editor.on('init', () => {
                    if (typeof this.props.value === 'string') {
                        this.setContent(editor);
                    }
                });
            }
        } else {
            console.log("Error");
        }
    }

    render() {
        return (
            <div id={this.props.id} suppressContentEditableWarning={true} ref={(elm) => { this.inputRef = elm }} id="article-body" contentEditable={true} style={{ outline: 'none' }} className={'mce-content-body article-body'}>

            </div>
        );
    }
}

export default TinyEditorComponent;