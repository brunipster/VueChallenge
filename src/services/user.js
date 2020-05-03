import rest from './rest-engine'

const userService = {}

userService.getUser = (session_id) => {
    return new Promise((resolve, reject) => {
        rest.defaultHeader(session_id).get("/users/me").then((response) => {
            if (response.status == 200 && response.data) {
                resolve(response)
            }
            reject(response)
        }).catch((error) => {
            if (error.response) {
                error.response.message = error.response.data.error;
                reject(error.response)
            } else {
                reject(error)
            }
        })
    })
}

export default userService