import rest from './rest-engine'

const authService = {}

authService.login = (payload) => {
    return new Promise((resolve, reject) => {
        rest.defaultHeader().post("/auth/login", payload).then((response) => {
            if (response.status == 200 && response.data) {
                resolve(response)
            }
            reject(response)
        }).catch((error) => {
            error.response.message = error.response.data.error;
            reject(error.response)
        })
    })
}

authService.register = (payload) => {
    return new Promise((resolve, reject) => {
        rest.defaultHeader().post("/auth/signup", payload).then((response) => {
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

export default authService