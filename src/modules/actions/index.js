const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const UPDATE = 'UPDATE'

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, UPDATE, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

export const CATEGORY = createRequestTypes('CATEGORY');
export const ARTICLE = createRequestTypes('ARTICLE');
export const USER = createRequestTypes('USER');
export const MESSAGE = createRequestTypes('MESSAGE');

export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const LOAD_USER_ARTICLE = 'LOAD_USER_ARTICLE';
export const LOAD_USER = 'LOAD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_BLOG = 'UPDATE_BLOG';
export const UPDATE_BLOG_EDITOR = 'UPDATE_BLOG_EDITOR';
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const LOAD_ARTICLE_REVIEW = 'LOAD_ARTICLE_REVIEW';
export const LOAD_OTHER_USER = 'LOAD_OTHER_USER';
export const UPDATE_OTHER_USER = 'UPLOAD_OTHER_USER';
export const LOCATION_EVENT = '@@router/LOCATION_CHANGE';

function action(type, payload = {}) {
    return { type, payload }
}

export const category = {
    request: () => action(CATEGORY[REQUEST]),
    success: (response) => action(CATEGORY[SUCCESS], response),
    failure: (error) => action(CATEGORY[FAILURE], error)
}

export const message = {
    success: (response) => action(MESSAGE[SUCCESS], response),
    update: (update) => action(MESSAGE[UPDATE], update),
    failure: (error) => action(MESSAGE[FAILURE], error)
}

export const article = {
    request: () => action(ARTICLE[REQUEST]),
    success: (response) => action(ARTICLE[SUCCESS], response),
    update: (response) => action(ARTICLE[UPDATE], response),
    failure: (error) => action(ARTICLE[FAILURE], error)
}

export const user = {
    request: () => action(USER[REQUEST]),
    success: (response) => action(USER[SUCCESS], response),
    update: (response) => action(USER[UPDATE], response),
    failure: (error) => action(USER[FAILURE], error)
}

export const initArticles = () => action(LOAD_ARTICLES);
export const initUser = () => action(LOAD_USER);
export const initCategory = () => action(LOAD_CATEGORY);
export const updateUser = (user) => action(UPDATE_USER, user);
export const updateArticle = (article) => action(UPDATE_BLOG, article);
export const updateReviewArticle = (article) => action(UPDATE_BLOG_EDITOR, article);
export const getUserArticle = (id) => action(LOAD_USER_ARTICLE, id);
export const getArticle = (id) => action(LOAD_ARTICLE, id);
export const getReviewArticle = () => action(LOAD_ARTICLE_REVIEW);
export const getOtherUser = (empId) => action(LOAD_OTHER_USER, empId);
export const updateOtherUser = (user) => action(UPDATE_OTHER_USER, user);
export const addUserToCurrentArticle = (article) => action(ARTICLE[SUCCESS], article);
