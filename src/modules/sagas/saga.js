import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../../services';
import { Article } from '../../models/article.class'
import { getCategory, getUser, getOtherUser, getPrevRoute } from '../reducers/selector.reducer';

const { category, user, article, message } = actions;

function* fetchEntity(entity, apiFn, payloadType, id, url) {
    yield put(entity.request(id));
    let { response, error } = yield call(apiFn, url || id);
    if (response) {
        if (payloadType === 'Articles') {
            let apiResponse = {
                type: payloadType,
                response: response
            };
            response = Object.assign({}, apiResponse);
        } else if (payloadType) {
            let apiResponse = {
                type: payloadType,
                response: response
            }
            response = Object.assign({}, apiResponse)
        }
        yield put(entity.success(response));
    }
    else
        yield put(entity.failure(error))
}

function* updateEntity(entity, apiFn, payload, data, url) {
    yield put(entity.request());
    let { response, error } = yield call(apiFn, url || data);
    if (response) {
        if (payload) {
            let apiResponse = {
                type: payload,
                response: Object.assign({}, response)
            }
            response = Object.assign({}, apiResponse);
        }
        yield put(entity.update(response));
        let displayMsg = 'Success !!!!'
        if(payload === 'User' || payload === 'oUser'){
            displayMsg += ', User Updated';
        } else if(payload === 'articlesForReview' || payload === 'UserArticles'){
            displayMsg += ', Article Updated';
        }
        yield put(message.success(displayMsg))
    }
    else {
        yield put(entity.failure(error))
        yield put(message.failure('Ohhh!!!!' + error))
    }
}

export const fetchCategory = fetchEntity.bind(null, category, api.fetchCategory);
export const fetchUser = fetchEntity.bind(null, user, api.fetchUser, 'User');
export const fetchOtherUser = fetchEntity.bind(null, user, api.fetchOtherUser, 'oUser');
export const fetchArticles = fetchEntity.bind(null, article, api.fetchInitalArticle, 'Articles');
export const fetchUserArticle = fetchEntity.bind(null, article, api.fetchUserArticle, 'UserArticles');
export const fetchArticle = fetchEntity.bind(null, article, api.fetchArticle, 'displayArticle');
export const fetchArticleReview = fetchEntity.bind(null, article, api.getArticleForReview, 'articlesForReview');
export const updateUser = updateEntity.bind(null, user, api.updateUser, 'User');
export const updateOtherUser = updateEntity.bind(null, user, api.updateOtherUser, 'oUser');
export const updateArticle = updateEntity.bind(null, article, api.updateArticle, 'UserArticles');
export const updateReviewArticle = updateEntity.bind(null, article, api.updateArticle, 'articlesForReview');

function* loadCategory() {
    const categories = yield select(getCategory);
    if (categories.length > 0) {
        yield put(category.success(categories));
    } else {
        yield call(fetchCategory)
    }
}

function* loadUser() {
    const user = yield select(getUser);
    if (user._id) {
        yield put(user.success(user));
    } else {
        yield call(fetchUser);
    }
}

function* loadOtherUser({ payload }) {
    const oUser = yield select(getOtherUser, payload);
    if (oUser) {
        yield put(user.success(user));
    } else {
        yield call(fetchOtherUser, payload);
    }
}

function* eventLocation(){
    let response = {
        type: 'displayArticle',
        response: new Article()
    }
    const prevRoute = yield select(getPrevRoute);
    if(typeof prevRoute === 'string'){
        if(!prevRoute.includes('doother')){
            yield put(article.success(response));
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Watchers///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export function* watchLoadCategory() {
    yield takeLatest(actions.LOAD_CATEGORY, loadCategory)
}

export function* watchLoadUser() {
    yield takeLatest(actions.LOAD_USER, loadUser);
}

export function* watchLoadOtherUser() {
    yield takeLatest(actions.LOAD_OTHER_USER, loadOtherUser)
}

export function* watchLoadArticle() {
    yield takeLatest(actions.LOAD_ARTICLES, fetchArticles);
}

export function* watchLoadUserArticle() {
    yield takeLatest(actions.LOAD_USER_ARTICLE, fetchUserArticle);
}

export function* watchUpdateUser() {
    yield takeLatest(actions.UPDATE_USER, updateUser);
}

export function* watchUpdateArticle() {
    yield takeLatest(actions.UPDATE_BLOG, updateArticle);
}

export function* watchGetArticle() {
    yield takeLatest(actions.LOAD_ARTICLE, fetchArticle);
}

export function* watchLoadArticleReview() {
    yield takeLatest(actions.LOAD_ARTICLE_REVIEW, fetchArticleReview);
}

export function* watchReviewUpdateArticle() {
    yield takeLatest(actions.UPDATE_BLOG_EDITOR, updateReviewArticle)
}

export function* watchUpdateOtherUser() {
    yield takeLatest(actions.UPDATE_OTHER_USER, updateOtherUser);
}

export function* watchLoactionChange() {
    yield takeLatest(actions.LOCATION_EVENT, eventLocation);
}