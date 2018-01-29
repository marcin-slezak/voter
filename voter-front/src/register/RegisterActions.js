import {registerAPI} from '../app/backendAPI'

export function register(username, password){
    return (dispatch, getState) => {
        return registerAPI(username, password).then( (resp) => {
            return resp
        })
    }
}