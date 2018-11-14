import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../common/header.react';
import Content from '../common/desc.react';
import Article from '../../models/article.class';
import Overlay from '../common/overlay.react';
import { updateArticle, getArticle, updateReviewArticle } from '../../modules/actions'
import User from '../../models/user.class';
import tinymce from 'tinymce/tinymce';
import './editor.css';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import AuthorInfo from '../common/authorinfo.react';
import TinyEditorComponent from '../common/editor';
import OverlayCross from '../common/overlay.cross.react';


class CreateBlog extends Component {

    editor = ''
    autoDraft = false;
    state = {
        article: new Article(),
        showDialogBox: false,
        articleId: '',
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
    }

    componentDidUpdate(prevProps) {
        if (prevProps.Article.currentArticleId && this.state.article._id !== this.props.Article.currentArticleId) {
            let article = Object.assign({}, this.state.article);
            article['_id'] = this.props.Article.currentArticleId;
            this.setState({ article: Object.assign({}, article) });
        }

        if (Object.keys(this.props.Article.displayArticle).length > 0 && prevProps.Article.displayArticle._id !== this.props.Article.displayArticle._id) {
            this.setState({ article: this.props.Article.displayArticle });
        }
    }

    previewPublish = () => {
        let images = tinymce.activeEditor.dom.select('img').map(image => image.src);
        let article = Object.assign({}, this.state.article);
        article.author = article.author ? article.author : this.props.User._id;
        if(images.length > 0){
            article.coverImage = images[0];
        }
        this.setState({article: article});
        this.postArticle(article);
        this.setDialog();
    }

    postArticle = (article) => {
        // let article = Object.assign({}, this.state.article);
        if (this.state.articleId && this.props.User.isEditor) {            
            this.props.updateReviewArticle(article);
        } else
            this.props.updateArticle(article);
        // this.setState({ article: article });
    }

    draftorPublish = () => {
        let article = Object.assign({}, this.state.article);
        if(this.props.User.isEditor){
            if(this.state.articleId){
                if(this.state.article.isDraft){
                    article.isDraft = false;
                } else 
                    article.isPublished = true;
            } else {
                article.isDraft = false;
            }
        } else {
            article.isDraft = false;
        }
        this.setState({article : article});
        this.postArticle(article);
    }

    setDialog = () => {
        this.setState({ showDialogBox: !this.state.showDialogBox });
    }

    handleTextChange = (event) => {
        let field = event.target.name;
        this.modifyArticle(field, event.target.value.replace(/\n/g, ''))
    }

    setCategory = (categoryID) => {
        this.modifyArticle('category', categoryID);
    }

    changePreviewImage = (event) => {
        this.modifyArticle('coverImage', event.target.src);
    }

    modifyArticle = (field, value) => {
        let article = Object.assign({}, this.state.article);
        article[field] = value;
        this.setState({ article: article });
    }

    setContent = (content) => {
        this.modifyArticle('body', content);
    }

    showDialog = () => {
        if (this.state.showDialogBox) {
            let images = tinymce.activeEditor.dom.select('img').map(image => image.src);
            if (images.length === 0) {
                images.push(this.state.article.coverImage)
            }
            return (
                <Overlay >
                    <OverlayCross changeView={this.setDialog} />
                    <Dialog
                        article={this.state.article}
                        images={images}
                        contentEditable={this.handleTextChange}
                        categories={this.props.categories}
                        setCategory={this.setCategory}
                        publishArticle={this.draftorPublish}
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
                        <AuthorInfo showReadytoPublish={true} readyToPublish={() => this.previewPublish()} user={user} buttonText={(this.state.article.isDraft ? 'Save as Draft' : 'Review for Publish')} />
                        <div>
                            <div style={{ padding: '10px 0' }}>
                                <input name={'title'} onChange={(event) => this.handleTextChange(event)} className={'input input-name width-100'} value={this.state.article.title} placeholder={'Title of the article'}></input>
                            </div>
                            <section>
                                <div>
                                    <TinyEditorComponent id="article-body"
                                        value={this.state.article.body}
                                        onEditorChange={content => this.setContent(content)} />
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