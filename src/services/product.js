import rest from './rest-engine'

const productService = {}

productService.list = (session_id) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .get("/products")
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

productService.create = (session_id, payload) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .post("/products", payload)
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

productService.update = (session_id, id, payload) => {
    return new Promise((resolve, reject) => {
        rest
            .defaultHeader(session_id)
            .put("/products/" + id, payload)
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

export default productService;