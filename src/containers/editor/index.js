import React, { Component } from 'react';
import { connect } from 'react-redux';
import { api } from '../../services';
import ContentHeader from '../common/header.react';
import Content from '../common/desc.react';
import Article from '../../models/article.class';
import Overlay from '../common/overlay.react';
import { updateArticle, getArticle, updateReviewArticle } from '../../modules/actions'
import User from '../../models/user.class';
import Editor from '../common/editor';
import tinymce from 'tinymce/tinymce';
import './editor.css';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import AuthorInfo from '../common/authorinfo.react';


class CreateBlog extends Component {

    editor = ''

    state = {
        article: new Article(),
        showDialogBox: false,
        articleId: ''
    }


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var articleId = this.props.match.params.id;
        if (articleId) {
            this.setState({ articleId: articleId });
            this.props.getArticle(articleId);
        }
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
                'hr',
                'paste'
            ],
            toolbar: [
                'undo redo | bold italic underline | fontselect fontsizeselect',
                'forecolor backcolor | alignleft aligncenter alignright alignfull | link unlink | numlist bullist outdent indent'
            ],
            setup: (editor) => {
                editor.on('init', (e) => {
                    editor.setContent("<p>" + this.state.article.body + "</p>");
                    this.editor = editor;
                });
            },
            paste_data_images: true,
            paste_as_text: true,
            insert_toolbar: 'quicktable image codesample hr',
            image_dimensions: false,
            selection_toolbar: 'bold italic quicklink | blockquote h2 h3 ',
            automatic_uploads: true,
            image_class_list: [
                { title: '', value: 'defaultImageSize' }
            ],
            file_picker_types: 'image',
            file_picker_callback: function (cb, value, meta) {
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
        };
        tinymce.init(articleBodyConfig);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.Article.currentArticleId && this.state.article._id !== this.props.Article.currentArticleId) {
            let article = Object.assign({}, this.state.article);
            article['_id'] = this.props.Article.currentArticleId;
            this.setState({ article: Object.assign({}, article) });
        }

        if (Object.keys(this.props.Article.displayArticle).length > 0 && prevProps.Article.displayArticle._id !== this.props.Article.displayArticle._id) {
            this.setState({ article: this.props.Article.displayArticle });
            this.editor.setContent("<p>Looks cool and beautiful, thanks to tinyMCE in react docs</p>");
        }
    }

    previewPublish = () => {
        let images = tinymce.activeEditor.dom.select('img').map(image => image.src);
        let article = Object.assign({}, this.state.article);
        article.body = tinymce.activeEditor.getContent();
        if (Object.keys(article.author).length === 0)
            article.author = this.props.User._id;
        if (images.length > 0) {
            article.coverImage = images[0];
        }
        this.publishDraftOrArticle();
        this.setState({ article: article });
        this.setDialog();
    }

    publishDraftOrArticle = () => {
        let article = Object.assign({}, this.state.article);
        if (this.state.articleId) {
            this.props.updateReviewArticle(article);
        } else
            this.props.updateArticle(article);
    }

    setDialog = () => {
        this.setState({ showDialogBox: !this.state.showDialogBox });
    }

    handleTextChange = (event) => {
        let article = Object.assign({}, this.state.article);
        let field = event.target.name;
        article[field] = event.target.value.replace(/\n/g, '');
        return this.setState({ article: article });
    }

    setCategory = (categoryID) => {
        let article = Object.assign({}, this.state.article);
        article.category = categoryID;
        return this.setState({ article: article })
    }

    changePreviewImage = (event) => {
        let article = Object.assign({}, this.state.article);
        article.coverImage = event.target.src;
        return this.setState({ article: article });
    }

    showDialog = () => {
        if (this.state.showDialogBox) {
            let images = tinymce.activeEditor.dom.select('img').map(image => image.src);
            if (images.length === 0) {
                images.push(this.state.article.coverImage)
            }
            return (
                <Overlay changeView={this.setDialog}>
                    <Dialog
                        article={this.state.article}
                        images={images}
                        contentEditable={this.handleTextChange}
                        categories={this.props.categories}
                        setCategory={this.setCategory}
                        publishArticle={this.publishDraftOrArticle}
                        changePreviewImage={this.changePreviewImage}
                    />
                </Overlay>);
        }
        return null;
    }

    render() {
        let user = new User();
        if (this.state.article.isDraft) {
            user = this.props.User;
        } else {
            user = this.state.article.author;
        }
        return (
            <div>
                <div className='article-container'>
                    <div className={'article-u1'}>
                        <AuthorInfo showReadytoPublish={true} readyToPublish={() => this.previewPublish()} user={user} />
                        <div>
                            <div style={{ padding: '10px 0' }}>
                                <input name={'title'} onChange={(event) => this.handleTextChange(event)} className={'input input-name width-100'} value={this.state.article.title} placeholder={'Title of the article'}></input>
                            </div>
                            <section>
                                <Editor initalValue={"<p>Testing</p>"}/>
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
            return (
                <div className={'flex width-100'} style={{ position: 'relative' }}>
                    <div className={'changePreview'}>
                        <button className={'changePreviewButton userButton'} onClick={() => this.setState({ showPreview: false })}>
                            Change Preview
                    </button>
                    </div>
                    <img style={{ maxHeight: '200px', maxWidth: '100%', margin: 'auto' }} src={this.props.article.coverImage} />
                </div>
            );
        }
        return null;
    }

    showOtherPreviewImage = () => {
        const displayPreviewImage = () => {
            return this.props.images.map(ele =>
                <div className={'image-options'} onClick={(event) => this.props.changePreviewImage(event)}>
                    <img src={ele} />
                </div>);
        }

        if (!this.state.showPreview) {
            return (
                <div className={'image-change'}>
                    <p onClick={() => this.setState({ showPreview: true })}>Done</p>
                    <div className={'width-100'} style={{ overflow: 'scroll', height: '300px', maxHeight: '300px' }}>
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
            <div className={'flex'}>
                <div className={'flex flex-column width-50'}>
                    <ContentHeader headername="Story Preview" className={'no-border no-margin'} />
                    <Content className={'colorBlack no-margin'} desc={'Changes here will affect how the users will see the articles in home page, Fill the details appropriately'} />
                    <div className={'flex width-100 image-preview'} style={{ position: 'relative' }}>
                        {this.showPreviewImage()}
                        {this.showOtherPreviewImage()}
                    </div>
                    <div className={'editable-div'} style={{ borderBottom: '1px solid grey' }}>
                        <input
                            placeholder="Add a small desc about your article... (max of 250 characters)"
                            className={'input input-email width-100'}
                            name={'subtitle'}
                            style={{ fontSize: '14px', maxWidth: '100%' }}
                            value={this.props.article.subtitle}
                            onChange={(event) => this.props.contentEditable(event)}>
                        </input>
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
                    <button className={'userButton button-publish'} onClick={() => this.props.publishArticle()}>
                        Publish Now..
                        </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ Category, User, Article }) => ({
    categories: Category.categories,
    User: User.User,
    Article: Article
});

export default connect(
    mapStateToProps,
    {
        updateArticle,
        getArticle,
        updateReviewArticle
    }
)(CreateBlog);