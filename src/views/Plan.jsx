import {useEffect, useState} from 'react'
import auth from "../routes/auth"
import {useNavigate} from 'react-router-dom'
import CloseSession from '../components/CloseSession'
import { Link , useParams} from 'react-router-dom'
import servicePlan from '../services/plan'
import serviceUser from '../services/user'
import serviceData from '../services/data'
import WolfPNG from '../img/lobo.png'
import RacconPNG from '../img/raccoon.png'

export default function Plan(){

    const [plan, setPlan] = useState({})
    const [user, setUser] = useState({})
    const [description, setDescription] = useState([])
    const [newPendiente, setNewPendiente] = useState(false)
    const [labelAssiggned, setLabelAssiggned] = useState([])
    const [pendient, setPendiente] = useState({
        plan: '',
        description: '',
        status: false,
        assiggned: []
    })
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate()
    const  {id} = useParams()

    const closeSession = () => {
        auth.logout(() => {
            window.localStorage.removeItem("user")
            navigate("/")
        })
    }

    useEffect(()=> {
        const {user} = JSON.parse(window.localStorage.getItem('user'))
        setUser(user)
        servicePlan.getOne(id).then(plan => {
            serviceData.getByPlan(id).then(d => {
                setPlan(plan.data)
                setDescription(d.data)
                setLoader(false)
            })
        })
    },[id])

    const handlePendiente = async () =>{
        setNewPendiente(!newPendiente)
        const users = await serviceUser.getAllUsers()
        console.log(users);
        setLabelAssiggned(users)
    }

    const handleChange = e =>{
        setPendiente({...pendient, [e.target.name]: e.target.value})
        console.log(pendient);
    }

    const createPendiente = async () => {

        if(pendient.assiggned === 'Ambos'){
            pendient.assiggned = [labelAssiggned[0]._id, labelAssiggned[1]._id]
        }else{
            pendient.assiggned = [pendient.assiggned]
        }
        console.log(pendient.assiggned);
        setLoader(true)
        const data = {
            plan: plan._id,
            description: pendient.description,
            status: pendient.status?true:false,
            assiggned: pendient.assiggned
        }
        const pendient_new = await serviceData.createData(data)
        console.log(pendient_new);
        setNewPendiente(!newPendiente)
        servicePlan.getOne(id).then(plan => {
            serviceData.getByPlan(id).then(d => {
                setPlan(plan.data)
                setDescription(d.data)
                setLoader(false)
            })
        })
        setLoader(false)
    }

    const handleDelete = async id => {
        setLoader(true)
        const res = await serviceData.deleteData(id)
        const updateDatas = description.filter( d => d._id !== id)
        console.log(updateDatas);
        setDescription(updateDatas)
        setLoader(false)
    }

    return(
        <div id="plan" className="w-full pt-32 min-h-screen pb-32">
            {loader?(<span className="loader"></span>):(
                <>
                <CloseSession user={user.username} closeSession={closeSession}/>
                <div className='absolute top-5 left-20' id='link-back'>
                <Link to="/panel"> Regreasr al panel</Link>
            </div>
            <div className='bg-white p-20 pt-6 w-4/5 rounded-lg m-auto'>
                <h3 className='text-center'>{plan.name}</h3>

                <table className='w-11/12 m-auto mt-7'>
                    <thead>
                        <tr>
                            <th className='text-white text-center'>Núm</th>
                            <th className='text-white text-center'>Dato</th>
                            <th className='text-white text-center'>Status</th>
                            <th className='text-white text-center'>Asignado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            description.map( (d,i) =>(
                                <tr key={d._id} onDoubleClick={()=> handleDelete(d._id)}>
                                    <td>{i+1}</td>
                                    <td>{d.description}</td>
                                    <td>{d.status?'Listo':'No Listo'}</td>
                                    <td className='flex justify-center items-center'>{d.assiggned.map(a=> <p key={a._id} className="flex mx-1">{a.username === 'jesus'?<img src={WolfPNG} alt="wolf icon" width={25}/>: <img src={RacconPNG} alt="raccoon icon" width={25}/>}</p>)}</td>
                                </tr>
                            ))
                        }
                        {
                        newPendiente?(
                        <tr className='tr-new'>
                            <td>
                                {description.length+1}
                            </td>
                            <td>
                                <input autoComplete='off' onChange={handleChange} type="text"  placeholder='Pendiente...' className='new-pendiente w-11/12' name='description'/>
                            </td>
                            <td>
                                <select onChange={handleChange} name="status">
                                    <option value={false}>No Listo</option>
                                    <option value={true}>Listo</option>
                                </select>
                            </td>
                            <td>
                                <select onChange={handleChange} name="assiggned">
                                    <option value="">Asignar</option>
                                    {labelAssiggned.map(l => (
                                        <option key={l._id} value={l._id}>{l.username.charAt(0).toUpperCase() + l.username.slice(1)}</option>
                                    ))}
                                    <option value="Ambos">Ambos</option>
                                </select>
                            </td>
                        </tr>
                            ): null
                        }
                    </tbody>
                </table>

                {
                    !newPendiente ?(
                        <button onClick={handlePendiente} className='p-2 mt-9 btn-add rounded-lg'>Agregar pendiente +</button>
                    ):(
                     <div>
                        <button onClick={createPendiente} className='p-2 mt-9 btn-add mr-5 rounded-lg btn-create'>Crear</button>
                        <button onClick={handlePendiente} className='p-2 mt-9 btn-add rounded-lg btn-cancel'>Cancelar</button>
                     </div>   
                    )
                }
            </div>
                </>
            )}
        </div>
    )
}