import React, { Component } from 'react';
import tinymce from 'tinymce/tinymce';
// import './editor.css';
import 'tinymce/themes/modern/theme';
import { api } from '../../services';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';

class Editor extends Component {

    constructor(props) {
        super(props);
        this.editorRef = React.createRef();
    }

    componentDidMount() {
        this.initalizeEditor();
    }

    initalizeEditor = () => {
        const finalIntialize = {
            target: this.editorRef,
            menubar: false,
            inline: true,
            theme: 'inlite',
            min_height: 400,
            plugins: [
                'autolink',
                'codesample',
                'contextmenu',
                'link',
                'lists',
                'table',
                'textcolor',
                'image',
                'hr',
                'paste'
            ],
            toolbar: [
                'undo redo | bold italic underline | fontselect fontsizeselect',
                'forecolor backcolor | alignleft aligncenter alignright alignfull | link unlink | numlist bullist outdent indent'
            ],
            insert_toolbar: 'quicktable image codesample hr',
            selection_toolbar: 'bold italic quicklink | blockquote h2 h3',
            paste_data_images: true,
            paste_as_text: true,
            image_dimensions: false,
            automatic_uploads: true,
            image_class_list: [
                {title: '', value: 'defaultImageSize'}
            ],
            file_picker_types: 'image',
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
            },
            setup: (editor) => {
                this.editor = editor;
                editor.on('init', (e) => {
                    this.initEditor(e, editor);
                });
            }
        }

        tinymce.init(finalIntialize);
    }

    initEditor = (initE, editor) => {
        console.log(this.props.initalValue);
        const value = typeof this.props.initalValue === 'string' ? this.props.initalValue : '';
        editor.setContent(value);

        if (typeof this.props.onEditorChange === 'function'){
            editor.on('change keyup setcontent', (e) => {
                this.props.onEditorChange(editor.getContent());
            })
        }
    }

    render(){
        return (
            <div contentEditable={true} ref={this.editorRef} id="article-body" className={'mce-content-body article-body'} spellCheck="true" style={{outline: 'none'}}></div>
        )
    }
}

export default Editor;