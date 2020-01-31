

export const localState = () => {
    let state = localStorage.getItem('state')
    if(state === null){
        return undefined
    }else{
        return state
    }
}


export const updateStorage = (state) => {
    localStorage.setItem('state', state)
}