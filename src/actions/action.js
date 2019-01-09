export const nextPage = (response) => {
    return {
        type: 'NEXT_PAGE',
        payload: response
    }
}
export const initPage = (response) => {
    return {
        type:'INIT_PAGE',
        payload: response.data
    };
}