import merge from 'lodash/fp/object'

export default function category({ types }) {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("types must be array type");
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error("Undefined data type");
    }

    const [requestType, successType, failureType] = types;

    return function updateCategoryParams(state = {
        categories: [],
        isFetching: false
    }, action) {
        switch (action.type) {
            case requestType:
                return Object.assign({}, state, {
                    isFetching: true
                });
            case successType:
                return Object.assign({}, state, {
                    isFetching: false,
                    category: action.payload
                });
            case failureType:
                return Object.assign({}, state, {
                    isFetching: false
                });
            default:
                return state;
        }
    }
}