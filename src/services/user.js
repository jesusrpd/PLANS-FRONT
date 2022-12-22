import axios from 'axios'
const baseUrl = process.env.REACT_APP_URI_API

const login = async credentials => {
    console.log(baseUrl)
    const res = await axios.post(`${baseUrl}/users/signin`, credentials)
    // fetch(`${baseUrl}/users/signin`,{
    //     method: "POST",
    //     body: credentials
    // }).then(response => {
    //     console.log(response);
    // }).catch(err => console.log(err))
        return res.data
        
}

export default {login}