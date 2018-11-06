import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../../services';
import { getCategory, getUser, getArticles } from '../reducers/selector.reducer';
import _ from 'lodash';

const { category, user, article } = actions;

function* fetchEntity(entity, apiFn, payloadType, id, url) {
    yield put(entity.request(id))
    let { response, error } = yield call(apiFn, url || id);   
    if (response){
        if(payloadType === 'UserArticles'){
            let apiResponse = {
                type: payloadType,
                response: response
            }
            response = Object.assign({}, apiResponse)
        } else if(payloadType === 'Articles') {
            let apiResponse = {
                type: payloadType,
                response: response
            };
            response = Object.assign({}, apiResponse);
        }
        yield put(entity.success(response));
    }
    else
        yield put(entity.failure(error))
}

function* updateEntity(entity, apiFn, data, url) {
    const { response, error } = yield call(apiFn, url || data);
    if (response)
        yield put(entity.update(response))
    else 
        yield put(entity.failure(error))
}

export const fetchCategory = fetchEntity.bind(null, category, api.fetchCategory);
export const fetchUser = fetchEntity.bind(null, user, api.fetchUser);
export const fetchArticles = fetchEntity.bind(null, article, api.fetchInitalArticle, 'Articles');
export const fetchUserArticle = fetchEntity.bind(null, article, api.fetchUserArticle, 'UserArticles');
export const updateUser = updateEntity.bind(null, user, api.updateUser);
export const updateArticle = updateEntity.bind(null, article, api.updateArtice);

function* loadCategory(){
    const categories = yield select(getCategory);
    if(categories.length > 0){
        yield put(category.success(categories));
    } else {
        yield call(fetchCategory)
    }
}

function* loadUser(){
    const user = yield select(getUser);
    if(user._id) {
        yield put(user.success(user));
    } else {
        yield call(fetchUser); 
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Watchers///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export function* watchLoadCategory(){
    yield takeLatest(actions.LOAD_CATEGORY, loadCategory)
}

export function* watchLoadUser(){
    yield takeLatest(actions.LOAD_USER, loadUser);
}

export function* watchLoadArticle(){
    yield takeLatest(actions.LOAD_ARTICLE, fetchArticles);
}

export function* watchLoadUserArticle(){
    yield takeLatest(actions.LOAD_USER_ARTICLE, fetchUserArticle);
}

export function* watchUpdateUser(){
    yield takeLatest(actions.UPDATE_USER, updateUser);
}

export function* watchUpdateArticle(){
    yield takeLatest(actions.UPDATE_BLOG, updateArticle);
}