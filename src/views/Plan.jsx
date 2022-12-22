import {useEffect, useState} from 'react'
import auth from "../routes/auth"
import {useLocation, useNavigate} from 'react-router-dom'
import CloseSession from '../components/CloseSession'
import service from '../services/plan'

export default function Plan(){

    const [plan, setPlan] = useState({})
    const [user, setUser] = useState({})
    let location = useLocation()
    const navigate = useNavigate()

    const closeSession = () => {
        auth.logout(() => {
            window.localStorage.removeItem("user")
            navigate("/")
        })
    }

    useEffect(()=> {
        const {user} = JSON.parse(window.localStorage.getItem('user'))
        setUser(user)
        const id = location.pathname.split('/')
        selectPlan(id[2])
    },[location])

    const selectPlan = async id => {
        console.log(id);
        const plan = await service.getOne(id)
        console.log(plan.data);
        setPlan(plan.data)
    }

    return(
        <div id="plan" className="w-full h-screen pt-44">
            <CloseSession user={user.username} closeSession={closeSession}/>
            <div className='bg-white p-20 pt-6 w-3/5 rounded-lg m-auto'>
                <h3 className='text-center'>{plan.name}</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Núm</th>
                            <th>Dato</th>
                            <th>Status</th>
                            <th>Asignado</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}