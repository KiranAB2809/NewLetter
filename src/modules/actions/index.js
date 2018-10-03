const REQUEST = 'REQUEST';
const SUCCESS  = 'SUCCESS';
const FAILURE = 'FAILURE';
// const CATEGORY = 'CATEGORY';
// const ARTICLE = 'ARTICLE';
const FIND = 'FIND';
const FILTER = 'FILTER';

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE, FIND, FILTER].reduce((acc, type) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {});
}

export const CATEGORY = createRequestTypes('CATEGORY');
export const ARTICLE = createRequestTypes('ARTICLE');
export const USER = createRequestTypes('USER');

export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const LOAD_USER = 'LOAD_USER';

function action(type, payload = {}) {
    return { type, payload } 
}

export const category = {
    request: () => action(CATEGORY[REQUEST]),
    success: () => action(CATEGORY[SUCCESS], response),
    failure: () => action(CATEGORY[FAILURE], error)
}

export const article = {
    request: () => action(ARTICLE[REQUEST]),
    requestbycategory: (category_id) => action(ARTICLE[REQUEST], category_id),
    requestbyid: (id) => action(ARTICLE[REQUEST], id),
    success: (response) => action(ARTICLE[SUCCESS], response),
    successbycategory: (response) => action(ARTICLE[SUCCESS], response),
    successbyid: (response) => action(ARTICLE[SUCCESS], response),
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