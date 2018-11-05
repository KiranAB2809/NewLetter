import * as ActionTypes from '../actions';
// import merge from 'lodash/object/merge';
import { combineReducers } from 'redux';
import category from './category.reducer';
import user from './user.reducer';
import article from './article.reducer';


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
        ActionTypes.USER.FAILURE
    ]
});

const Article = article({
    types: [
        ActionTypes.ARTICLE.REQUEST,
        ActionTypes.ARTICLE.SUCCESS,
        ActionTypes.ARTICLE.UPDATE,
        ActionTypes.USER.FAILURE
    ]
});

const rootReducer = combineReducers({
    Category,
    User,
    Article
});

export default rootReducer;