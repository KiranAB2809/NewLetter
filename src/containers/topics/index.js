import React, { Component } from 'react';
import { connect } from 'react-redux';
import Article from '../common/article.react';
import logo from '../../assets/images/DidYouKnow.jpg';
import { getUserArticle } from '../../modules/actions'
import './topic.css';
import User from '../../models/user.class';
// import { getUserArticle } from '../../modules/actions';
 
class Topic extends Component {

    componentDidMount(){
        this.props.getUserArticle(this.props.user._id);
    }

    render() {
        return (
            <div className="topic-container">
                <div style={{ position: 'realtive' }}>
                    <div style={{ position: 'sticky', top: 0 }}>
                        <img src = {logo} className={'banner'}/>
                    </div>
                </div>
                <Article />
            </div>
        )
    }
}

const mapStateToProps = ({ User }) => ({
    user: User.User
});

export default connect(
    mapStateToProps,
    {
        getUserArticle
    }
)(Topic);