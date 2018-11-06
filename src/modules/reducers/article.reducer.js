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
        currentArticleId: ''
    }, action) {
        switch (action.type) {
            case requestType:
                return _.merge({}, state, {
                    isFetching: true
                });
            case successType:
                let payloadType = action.payload.type;
                let newState = Object.assign({}, state);
                newState[payloadType] = action.payload.response;
                newState.isFetching = false;
                return _.merge({}, state, newState);
            case updateType:
                return _.merge({}, state, {
                    isFetching: false,
                    currentArticleId: action.payload._id,
                    UserArticles: _.unionBy(state.UserArticles, [action.payload], '_id')
                });
            case failureType:
                return _.merge({}, state, {
                    isFetching: false
                })
            default:
                return state;
        }
    }
}