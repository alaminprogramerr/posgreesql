
const login = (user) =>{
    return({
        type: 'LOGIN',
        loggedIn: true,
        user: user
    })
}

export default login