import axios from 'axios'
const baseUrl = process.env.REACT_APP_URI_API

const getByPlan = async id_plan => {
    const res = await axios.get(`${baseUrl}/data/${id_plan}`)
    return res.data
}

const createData = async data => {
    const res = await axios.post(`${baseUrl}/data/`, data)
    return res.data
}

const deleteData = async id => {
    const res = await axios.delete(`${baseUrl}/data/${id}`)
    return res.data
}

export default {getByPlan, createData, deleteData}