const REQUEST = 'REQUEST';
const SUCCESS  = 'SUCCESS';
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

export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const LOAD_USER_ARTICLE = 'LOAD_USER_ARTICLE';
export const LOAD_USER = 'LOAD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_BLOG = 'UPDATE_BLOG';

function action(type, payload = {}) {
    return { type, payload } 
}

export const category = {
    request: () => action(CATEGORY[REQUEST]),
    success: ( response ) => action(CATEGORY[SUCCESS], response),
    failure: ( error ) => action(CATEGORY[FAILURE], error)
}

export const article = {
    request: () => action(ARTICLE[REQUEST]),
    success: (response) => action(ARTICLE[SUCCESS], response),
    failure: (error) => action(ARTICLE[FAILURE], error)
}

export const user = {
    request: () => action(USER[REQUEST]),
    success: (response) => action(USER[SUCCESS], response),
    failure: (error) => action(USER[FAILURE], error)
}

export const initArticles = () => action(LOAD_ARTICLE);
export const initUser = () => action(LOAD_USER);
export const initCategory = () => action(LOAD_CATEGORY);
export const updateUser = (user) => action(UPDATE_USER, user);
export const updateArticle = (article) => action(UPDATE_BLOG, article);
export const getUserArticle = (id) => action(LOAD_USER_ARTICLE, id);