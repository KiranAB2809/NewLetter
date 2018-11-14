import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';
import volvoLogo from './../../assets/images/volvoLogo.jpg';
import { withRouter } from 'react-router-dom';
import { getUserArticle } from '../../modules/actions';


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.popoverRef = React.createRef();
    }

    showPopOver = () => {
        this.popoverRef.current.style.visibility = !this.popoverRef.current.style.visibility ? 'visible' : '';
    }

    onUserClick = (route) => {
        if (!this.props.User.name) {
            this.props.history.push("/setting");
        } else {
            this.props.history.push(route);
        }
    }

    onNavClick = (route) => {
        if (route)
            this.props.history.push('/topic/' + route)
        else
            this.props.history.push('/');
    }

    editorOptions = () => {
        if (this.props.User.isEditor) {
            return (
                <ul>
                    <li style={{ borderBottom: '0.5px solid grey', padding: '5px 0' }}></li>
                    <li onClick={() => this.showPopOver()}>
                        <span className={'popover-text'}>
                            <a href="javascript:void(0)" onClick={() => this.onUserClick("/topic/editor")}>Review Articles</a>
                        </span>
                    </li>
                    <li onClick={() => this.showPopOver()}>
                        <span className={'popover-text'}>
                            <a href="javascript:void(0)" onClick={() => this.onUserClick("/topic/editor")}>Add article by others</a>
                        </span>
                    </li>
                    <li onClick={() => this.showPopOver()}>
                        <span className={'popover-text'}>
                            <a href="javascript:void(0)" onClick={() => this.onUserClick("/topic/editor")}>Add awards</a>
                        </span>
                    </li>
                    <li onClick={() => this.showPopOver()}>
                        <span className={'popover-text'}>
                            <a href="javascript:void(0)" onClick={() => this.onUserClick("/topic/editor")}>Add Did you know by others?</a>
                        </span>
                    </li>
                </ul>
            )
        }
        return null;
    }

    renderSubDiv = () => {
        if (this.props.categories.length > 0) {
            return (
                <div className="flexTop">
                    <li>
                        <span className="navText">
                            <a href="javascript:void(0)" onClick={() => this.onNavClick()}>Home</a>
                        </span>
                    </li>
                    {this.props.categories.map(ele =>
                        <li>
                            <span className="navText">
                                <a href="havascript:void(0)" onClick={() => this.onNavClick(ele._id)}>{ele.title}</a>
                            </span>
                        </li>
                    )}
                    <li>
                        <span className="navText">
                            <a href="">Archive</a>
                        </span>
                    </li>
                </div>
            )
        }
        return null;
    }

    render() {
        return (
            <div className="topDiv">
                <div className="subDiv brandDiv">
                    <div className="positionRelative">
                        <img src={volvoLogo} className="brandLogo" alt="brand logo" />
                    </div>
                    <div className="positionRelative title">
                        .Net Connect
                    </div>
                    <div className="positionRelative">
                        <button className={'profile-button'} onClick={() => this.showPopOver()}>
                            <img className={'avatar-image default-image'} src={this.props.User.img || 'http://localhost:8000/static/defaultUser.png'} style={{ width: '35px', height: '35px' }}></img>
                        </button>
                        <div className="popover" ref={this.popoverRef}>
                            <ul>
                                <li onClick={() => this.showPopOver()}>
                                    <span className={'popover-text'}>
                                        <a href="javascript:void(0)" onClick={() => this.onUserClick('/create')}>New Article</a>
                                    </span>
                                </li>
                                <li onClick={() => this.showPopOver()}>
                                    <span className={'popover-text'}>
                                        <a href="javascript:void(0);" onClick={() => this.onUserClick('/topic/user')}>Your Articles</a>
                                    </span>
                                </li>
                                <li onClick={() => this.showPopOver()}>
                                    <span className={'popover-text'}>
                                        <a href="javascript:void(0)" onClick={() => this.onUserClick("/topic/editor")}>Add Did you know?</a>
                                    </span>
                                </li>
                            </ul>
                            {this.editorOptions()}
                            <ul>
                                <li style={{ borderBottom: '0.5px solid grey', padding: '5px 0' }}></li>
                                <li onClick={() => this.showPopOver()}>
                                    <span className={'popover-text'}>
                                        <a href="#">Bookmarks</a>
                                    </span>
                                </li>
                                <li onClick={() => this.showPopOver()}>
                                    <span className={'popover-text'}>
                                        <a href="#">Help</a>
                                    </span>
                                </li>
                                <li onClick={() => this.showPopOver()}>
                                    <span className={'popover-text'}>
                                        <a href="javascript:void()" onClick={() => this.onUserClick('/setting')}>Setting</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="subDiv">
                    <nav>
                        {this.renderSubDiv()}
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ Category, User }) => ({
    categories: Category.categories,
    User: User.User
});


export default withRouter(connect(
    mapStateToProps,
    {
        getUserArticle
    }
)(Header));
