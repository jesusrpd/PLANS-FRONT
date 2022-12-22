import axios from 'axios'
const baseUrl = process.env.REACT_APP_URI_API

const getAll = async () => {
    const res = await axios.get(`${baseUrl}/plans`)
        return res.data
}

const getOne = async id => {
    const res = await axios.get(`${baseUrl}/plans/${id}`)
    return res.data
}

export default {getAll, getOne}