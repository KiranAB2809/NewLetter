export default function router(type) {
    if (typeof type !== 'string') {
        throw new Error("Undefined data type");
    }

    const event = type;
    return function updateRoute(state = {
        previousRoute: '',
        nextRoute: ''
    }, action) {
        switch (action.type) {
            case event:
                return {
                    ...state,
                    previousRoute: state.newRoute,
                    newRoute: action.payload.pathname
                }
            default:
                return state
        }
    }
}