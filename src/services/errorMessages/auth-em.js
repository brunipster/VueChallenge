const messages = {
    404: "Error Authentication",
    500: "Internal Server Error",
    401: "Not Authorized",
    400: "Bad Request",
    DEFAULT: "Unknown Error"
};

export default (status) => {
    let error = messages[status]
    if (error) {
        return error
    } else {
        return messages["DEFAULT"]
    }
}