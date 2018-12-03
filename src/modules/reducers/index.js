import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';
import category from './category.reducer';
import user from './user.reducer';
import article from './article.reducer';
import message from './messag.reducer';


const Category = category({
    types: [
        ActionTypes.CATEGORY.REQUEST,
        ActionTypes.CATEGORY.SUCCESS,
        ActionTypes.CATEGORY.FAILURE
    ]
});

const User = user({
    types: [
        ActionTypes.USER.REQUEST,
        ActionTypes.USER.SUCCESS,
        ActionTypes.USER.UPDATE,
        ActionTypes.USER.FAILURE
    ]
});

const Article = article({
    types: [
        ActionTypes.ARTICLE.REQUEST,
        ActionTypes.ARTICLE.SUCCESS,
        ActionTypes.ARTICLE.UPDATE,
        ActionTypes.ARTICLE.FAILURE
    ]
});

const Message = message({
    types: [
        ActionTypes.MESSAGE.SUCCESS,
        ActionTypes.MESSAGE.UPDATE,
        ActionTypes.MESSAGE.FAILURE,
    ]
})

const rootReducer = combineReducers({
    Category,
    User,
    Article,
    Message
});

export default rootReducer;