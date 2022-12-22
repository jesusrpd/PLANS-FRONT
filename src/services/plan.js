import axios from 'axios'
const baseUrl = process.env.REACT_APP_URI_API

const getAll = async () => {
    console.log(baseUrl);
    const res = await axios.get(`${baseUrl}/plans`)
    console.log(res);
        return res.data
}

const getOne = async id => {
    const res = await axios.get(`${baseUrl}/plans/${id}`)
    return res.data
}

const addPendiente = async (id, data) => {
    const res = await axios.put(`${baseUrl}/plans/${id}`, data)
    return res.data
}

const removePendiente = async (id, pent) => {
    const res = await axios.delete(`${baseUrl}/plans/${id}/${pent}`, )
    return res.data
}

export default {getAll, getOne, addPendiente, removePendiente}