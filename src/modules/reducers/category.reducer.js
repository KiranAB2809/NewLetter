import _ from 'lodash';
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
                return _.merge({}, state, {
                    isFetching: true
                });
            case successType:
                return _.merge({}, state, {
                    isFetching: false,
                    categories: action.payload
                });
            case failureType:
                return _.merge({}, state, {
                    isFetching: false
                });
            default:
                return state;
        }
    }
}