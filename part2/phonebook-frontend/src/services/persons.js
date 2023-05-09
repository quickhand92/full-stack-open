import axios from "axios";

const baseURL = '/api/persons'

const add = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}


export default { add, baseURL }