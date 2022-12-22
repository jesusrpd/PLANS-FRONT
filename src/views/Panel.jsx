import { useEffect, useState } from "react"
import service from '../services/plan'
import auth from '../routes/auth'
import {useNavigate, Outlet} from 'react-router-dom'
import CloseSession from "../components/CloseSession"

export default function Panel(){

    const [user, setUser] = useState({})
    const [plans, setPlans] = useState([])
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(()=> {
        const {user} = JSON.parse(window.localStorage.getItem('user'))
        setUser(user)
        getPlans()
        setLoader(false)
    },[])

    const getPlans = async () => {
        const plans = await service.getAll()
        setPlans(plans.data)
    }

    const closeSession = () => {
        auth.logout(() => {
            window.localStorage.removeItem("user")
            navigate("/")
        })
    }

    return(
        <div className="w-full h-screen" id="banner-panel">
            {loader?(<span class="loader"></span>):(
                    <>
                    <CloseSession user={user.username} closeSession={closeSession}/>
            <div className="w-full text-center flex flex-col justify-center pt-28">
                <h2 className="mb-12 text-white">PLANES</h2>
                <div className="w-full flex items-center justify-around">
                    {
                        plans.map( plan =>(
                            <div key={plan._id} className="w-fit bg-white px-4 py-2 rounded-lg plan" onClick={() => navigate(`/plan/${plan._id}`)}>
                                <p className="plan-tittle">{plan.name}</p>
                                <p className="plan-user">Creado por {plan.user_create.username}</p>
                                <p className="plan-description">Ver plan</p>
                            </div>
                        ))
                    }
                    <Outlet/>
                </div>
            </div>
                    </>
                )
            }
        </div>
    )
}