
const INITIAL_STATE = {
    isLoggedIn: false,
    user: undefined
}
const authentication = (state = INITIAL_STATE,  action) => {

    switch(action.type){
        case 'LOGIN':
            return ({
                ...state,   
                isLoggedIn: true,
                user: action.user
                
            })
        case 'LOGOUT':
            return ({
                isLoggedIn: false,
                user: undefined
            })
        default:
            return state
    }
   
}

export default authentication