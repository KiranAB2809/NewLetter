import _ from 'lodash';

export default function article({ types }) {
    if (!Array.isArray(types) || types.length !== 4) {
        throw new Error("types must be array type");
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error("Undefoned data type")
    }

    const [requestType, successType, updateType, failureType] = types;

    return function updateCategoryParams(state = {
        UserArticles: [],
        Articles: [],
        isFetching: false,
        currentArticleId: '',
        displayArticle: {},
        articlesForReview: []
    }, action) {
        let payloadType = '', newState = '';
        switch (action.type) {
            case requestType:
                return _.merge({}, state, {
                    isFetching: true
                });
            case successType:
                payloadType = action.payload.type;
                newState = Object.assign({}, state);
                newState[payloadType] = action.payload.response;
                newState.isFetching = false;
                return Object.assign({}, state, newState);
            case updateType:
                payloadType = action.payload.type;
                newState = Object.assign({}, state);
                newState.displayArticle = _.merge({}, action.payload.response);
                newState.isFetching = false;
                // delete action.payload.response
                newState[payloadType] = _.unionBy(newState[payloadType], action.payload.response, '_id');
                return Object.assign({}, state, newState);
            case failureType:
                return _.merge({}, state, {
                    isFetching: false
                })
            default:
                return state;
        }
    }
}