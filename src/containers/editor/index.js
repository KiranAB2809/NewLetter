import React, { Component } from 'react';
import { connect } from 'react-redux';
import tinymce from 'tinymce/tinymce';
import './editor.css';
import 'tinymce/themes/modern/theme';
import AuthorInfo from '../common/authorinfo.react';
import 'tinymce/plugins/link';
import { api } from '../../services';
import ContentHeader from '../common/header.react';
import Content from '../common/desc.react';
import logo from '../../assets/images/order_IT.PNG'
import Article from '../../models/article.class';
import Overlay from '../common/overlay.react';


class CreateBlog extends Component {

    state = {
        editor: '',
        article: new Article(),
        showDialogBox: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var articleBodyConfig = {
            selector: "#article-body",
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
                'hr'
            ],
            toolbar: [
                'undo redo | bold italic underline | fontselect fontsizeselect',
                'forecolor backcolor | alignleft aligncenter alignright alignfull | link unlink | numlist bullist outdent indent'
            ],
            insert_toolbar: 'quicktable image codesample hr',
            image_dimensions: false,
            selection_toolbar: 'bold italic quicklink | blockquote h2 h3 ',
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
                var input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.onchange = function () {
                    var file = this.files[0];
                    var reader = new FileReader();
                    debugger;
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
        };
        tinymce.init(articleBodyConfig);
        this.setState({ 'editor': tinymce });
    }

    previewPublish = () => {
        let images = this.state.editor.activeEditor.dom.select('img').map(image => image.src);
        let article = Object.assign({}, this.state.article);
        article.body = this.state.editor.activeEditor.getContent();
        article.author = this.props.User._id;
        if (images.length > 0) {
            article.coverImage = images[0];
        }
        this.setState({ article: article });
        this.setDialog();
    }

    setDialog = () => {
        this.setState({ showDialogBox: !this.state.showDialogBox });
    }

    handleTextChange = (event, field) => {
        let article = Object.assign({}, this.state.article);
        article[field] = event.target.innerText.replace(/\n/g, '');
        return this.setState({ article: article });
    }

    setCategory = (categoryID) => {
        let article = Object.assign({}, this.state.article);
        article.category = categoryID;
        return this.setState({ article: article })
    }

    showDialog = () => {
        if (this.state.showDialogBox) {
            let images = this.state.editor.activeEditor.dom.select('img').map(image => image.src);
            return (
            <Overlay changeView={this.setDialog}>
                <Dialog
                    article={this.state.article}
                    images={images}
                    contentEditable={this.handleTextChange}
                    categories={this.props.categories}
                    setCategory={this.setCategory}
                />
            </Overlay>);
        }
        return null;
    }

    render() {
        return (
            <div>
                <div className='article-container'>
                    <div className={'article-u1'}>
                        <AuthorInfo showReadytoPublish={true} readyToPublish={() => this.previewPublish()} user = {this.props.User}/>
                        <div>
                            <div>
                                <h1 id="article-header" 
                                className={'mce-content-body'} 
                                contentEditable="true" 
                                spellCheck="true" 
                                style={{ outline: 'none' }} 
                                suppressContentEditableWarning={true} 
                                onInput={(event) => this.handleTextChange(event, 'title')}>
                                    {this.state.article.title}
                                </h1>
                            </div>
                            <section>
                                <div id="article-body" className={'mce-content-body article-body'} contentEditable="true" spellCheck="true" style={{ outline: 'none' }}>
                                    <p>
                                        {this.state.article.body}
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                {this.showDialog()}
            </div>
        )
    }
}

class Dialog extends Component {

    state = {
        showPreview: true,
        categorySuggestion: '',
        inputChange: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { article, categories } = this.props;
        if (article.category) {
            let category = categories.filter(ele => ele._id === article.category);
            this.setState({ categorySuggestion: category.pop().title });
        }
    }

    showPreviewImage = () => {
        if (this.state.showPreview) {
            return (<img style={{ maxHeight: '200px', maxWidth: '100%', margin: 'auto' }} src={this.props.article.coverImage} />);
        }
        return null;
    }

    showOtherPreviewImage = () => {
        const displayPreviewImage = () => {
            return ["1", "2", "3", 1, 2, 3, 4].map(ele =>
                <div className={'image-options'}>
                    <img src={logo} />
                </div>);
        }

        if (!this.state.showPreview) {
            return (
                <div className={'image-change'}>
                    <p>Done</p>
                    <div className={'width-100'} style={{ overflow: 'scroll' }}>
                        {displayPreviewImage()}
                    </div>
                </div>
            );
        }
        return null;
    }

    setSuggestion = (event) => {
        this.setState({
            categorySuggestion: event.target.value,
            inputChange: true
        });
    }

    setCategory = (category) => {
        this.setState({
            categorySuggestion: category.title,
            inputChange: false
        });
        this.props.setCategory(category._id);
    }

    categorySuggestion = () => {
        if (this.state.categorySuggestion && this.state.inputChange) {
            let options = this.props.categories.filter(option =>
                new RegExp(this.state.categorySuggestion).test(option.title)).slice(0, 5);
            return (
                <div className={'flex flex-column suggestion'}>
                    {options.map(i =>
                        <p onClick={() => this.setCategory(i)}>
                            {i.title}
                        </p>)}
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className = {'flex'}>
                <div className={'flex flex-column width-50'}>
                    <ContentHeader headername="Story Preview" className={'no-border no-margin'} />
                    <Content className={'colorBlack no-margin'} desc={'Changes here will affect how the users will see the articles in home page, Fill the details appropriately'} />
                    <div className={'flex width-100 image-preview'}>
                        {this.showPreviewImage()}
                        {this.showOtherPreviewImage()}
                    </div>
                    <div contentEditable={true} className={'editable-div'} style={{ borderBottom: '1px solid grey' }} onInput={(event) => this.props.contentEditable(event, 'subtitle')}>
                        <p style={{ margin: 0, padding: 0, maxWidth: '100%', maxHeight: '100px', overflow: 'hidden' }}>
                            Add a small desc about your article... (max of 250 characters)
                            </p>
                    </div>
                </div>
                <div className={'flex flex-column width-50'} style={{ margin: '0 0 0 30px' }}>
                    <ContentHeader headername="Prepare for main page" className={'no-border no-margin'} />
                    <Content className={'colorBlack no-margin'} desc={"Add the category to your article, so that other's can search using them"} />
                    <div className={'editable-div'} style={{ border: '1px solid grey', margin: '20px 0' }}>
                        <input
                            value={this.state.categorySuggestion}
                            style={{ border: 0, color: 'grey', width: '100%', outline: 'none' }}
                            onChange={event => this.setSuggestion(event)}
                            placeholder={'Add a category'}></input>
                    </div>
                    {this.categorySuggestion()}
                    <Content className={'colorBlack no-margin'} desc={'The article is subject to internal review from the editorial board. Once approved it will be available on the cover page'} />
                    <button className={'userButton button-publish'}>
                        Publish Now..
                        </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ Category, User }) => ({
    categories: Category.category,
    User: User.User
});

export default connect(
    mapStateToProps,
    null)(CreateBlog);