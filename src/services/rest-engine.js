import axios from "axios";

const instance = {};

instance.defaultHeader = (session) => {
    const hd = { "Content-Type": "application/json" };
    if (session) hd.Authorization = session;

    return axios.create({
        baseURL: "http://localhost:3000",
        timeout: 1000,
        headers: hd
    });
}


export default instance