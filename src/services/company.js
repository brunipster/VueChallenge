import rest from './rest-engine'

const companyService = {}

companyService.list = (session_id) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .get("/companies")
            .then((response) => {
                if (response.status == 200 && response.data) {
                    resolve(response)
                }
                reject(response)
            })
            .catch((error) => {
                if (error.response) {
                    error.response.message = error.response.data.error;
                    reject(error.response)
                } else {
                    reject(error)
                }
            })
    })
}

companyService.create = (session_id, payload) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .post("/companies/create_join", payload)
            .then((response) => {
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

companyService.join = (session_id, payload) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .post("/companies/join", payload)
            .then((response) => {
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

companyService.update = (session_id, id, payload) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .put("/companies/" + id, payload)
            .then((response) => {
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

companyService.leave = (session_id) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .post("/companies/leave")
            .then((response) => {
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

export default companyService