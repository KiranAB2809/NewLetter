import _ from 'lodash';
import User from '../../models/user.class';

export default function user({ types }) {
    if (!Array.isArray(types) || types.length !== 4) {
        throw new Error("types must be array type");
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error("Undefoned data type")
    }

    const [requestType, successType, updateType, failureType] = types;

    return function updateCategoryParams(state = {
        User: new User(),
        oUser: new User(),
        isFetching: false
    }, action) {
        let payloadType = '', newState = '';
        switch (action.type) {
            case requestType:
                return _.merge({}, state, {
                    isFetching: true
                })
            case successType:
                payloadType = action.payload.type;
                newState = Object.assign({}, state);
                newState[payloadType] = action.payload.response;
                newState.isFetching = false;
                return Object.assign({}, state, newState);
            case updateType:
                payloadType = action.payload.type;
                newState = Object.assign({}, state);
                newState[payloadType] = action.payload.response;
                newState.isFetching = false;
                return Object.assign({}, state, newState);
            case failureType:
                return _.merge({}, state, {
                    isFetching: false
                });
            default:
                return state;
        }
    }
}