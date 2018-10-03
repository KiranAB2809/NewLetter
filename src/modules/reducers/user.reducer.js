import merge from 'lodash/object/merge';

export default function user({ types }) {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("types must be array type");
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error("Undefoned data type")
    }

    const [requestType, successType, failureType] = types;

    return function updateCategoryParams(state = {
        user: [],
        isFetching: false
    }, action) {
        switch (action.type) {
            case requestType:
                return merge({}, state, {
                    isFetching: true
                });
            case successType:
                return merge({}, state, {
                    isFetching: false,
                    user: action.response
                });
            case failureType:
                return merge({}, state, {
                    isFetching: false
                });
            default:
                return state;
        }
    }
}