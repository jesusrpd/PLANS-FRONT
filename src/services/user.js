import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/users/signin`, credentials)
    return res.data
}

export default {login}