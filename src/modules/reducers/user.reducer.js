import _ from 'lodash';
import User from '../../models/user.class';

export default function user({ types }) {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("types must be array type");
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error("Undefoned data type")
    }

    const [requestType, successType, failureType] = types;

    return function updateCategoryParams(state = {
        User: new User(),
        isFetching: false
    }, action) {
        switch (action.type) {
            case requestType:
                return _.merge({}, state, {
                    isFetching: true
                })
            case successType:
                return Object.assign({}, state, {
                    isFetching: false,
                    User: action.payload
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