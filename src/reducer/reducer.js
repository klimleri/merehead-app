const initialState = {
    users: [],
    currentPage: 1,
    step: 5
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEXT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            }
        case 'INIT_PAGE':
            return {
                ...state,
                users: action.payload.users,
            };
        default:
            return state
    }
}

export default reducer;