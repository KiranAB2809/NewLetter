import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import { api } from '../../services';
import { getCategory, getUser, getArticles } from '../reducers/selector.reducer';
import _ from 'lodash';

const { category, user, article } = actions;

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
    const { response, error } = yield call(apiFn, url || data);
    if (response)
        {
            let apiResponse = {
                type: payload,
                response: Object.assign({}, response)
            }
            yield put(entity.update(apiResponse));
        }
    else
        yield put(entity.failure(error))
}

export const fetchCategory = fetchEntity.bind(null, category, api.fetchCategory);
export const fetchUser = fetchEntity.bind(null, user, api.fetchUser);
export const fetchArticles = fetchEntity.bind(null, article, api.fetchInitalArticle, 'Articles');
export const fetchUserArticle = fetchEntity.bind(null, article, api.fetchUserArticle, 'UserArticles');
export const fetchArticle = fetchEntity.bind(null, article, api.fetchArticle, 'displayArticle');
export const fetchArticleReview = fetchEntity.bind(null, article, api.getArticleForReview, 'articlesForReview');
export const updateUser = updateEntity.bind(null, user, api.updateUser);
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


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Watchers///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export function* watchLoadCategory() {
    yield takeLatest(actions.LOAD_CATEGORY, loadCategory)
}

export function* watchLoadUser() {
    yield takeLatest(actions.LOAD_USER, loadUser);
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