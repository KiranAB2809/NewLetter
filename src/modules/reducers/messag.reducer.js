import _ from 'lodash';
export default function message({ types }) {
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error("types must be of type array");
    }
    if (!types.every(t => typeof t === 'string')) {
        throw new Error("Undefined data type");
    }

    const [successType, updateType, failureType] = types;
    return function updateMessageParams(state = {
        message: ''
    }, action) {
        switch (action.type) {
            case successType:
                return _.merge({}, state, {
                    message: action.payload
                });
            case updateType: 
                return _.merge({}, state, {
                    message: action.payload
                })
            case failureType:
                return _.merge({}, state, {
                    message: action.payload
                });
            default:
                return state;
        }
    }
}