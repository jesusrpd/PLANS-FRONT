import axios from 'axios'
const baseUrl = process.env.REACT_APP_URI_API

const login = async credentials => {
    const res = await axios.post(`${baseUrl}/users/signin`, credentials)
        return res.data
        
}

export default {login}