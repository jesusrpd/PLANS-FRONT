import axios from 'axios'
const baseUrl = process.env.REACT_APP_URI_API

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/users/signin`, credentials)
        return res.data
        
}

const getUser = async id => {
    const res = await axios.get(`${baseUrl}/users/${id}`)
    return res.data
}

const getAllUsers = async () => {
    const res = await axios.get(`${baseUrl}/users`)
    return res.data
}

export default {login, getUser, getAllUsers}