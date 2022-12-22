import {useEffect, useState} from 'react'
import auth from "../routes/auth"
import {useNavigate} from 'react-router-dom'
import CloseSession from '../components/CloseSession'
import { Link , useParams} from 'react-router-dom'
import servicePlan from '../services/plan'
import serviceUser from '../services/user'

export default function Plan(){

    const [plan, setPlan] = useState({})
    const [user, setUser] = useState({})
    const [description, setDescription] = useState([])
    const [newPendiente, setNewPendiente] = useState(false)
    const [labelAssiggned, setLabelAssiggned] = useState([])
    const [pendient, setPendiente] = useState({
        name: '',
        status: false,
        assiggned:''
    })
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
        servicePlan.getOne(id).then(p => {
            
            setPlan(p.data)
            setDescription(p.data.description)
        })
    },[id])

    const handlePendiente = async () =>{
        setNewPendiente(!newPendiente)
        const users = await serviceUser.getAllUsers()
        const names = users.map(user => user.username)
        setLabelAssiggned(names)
    }

    const handleChange = e =>{
        setPendiente({...pendient, [e.target.name]: e.target.value})
        console.log(pendient);
    }

    const createPendiente = async () => {
        const data = {
            name: pendient.name,
            status: pendient.status === 'true'?true:false,
            assiggned: pendient.assiggned
        }
        console.log(data);
        const pendient_new = await servicePlan.addPendiente(plan._id, data)
        console.log(pendient_new);
        setPendiente({...pendient, name: '', status: '', assiggned: ''})
        setNewPendiente(!newPendiente)
        setDescription([...description, pendient_new.description])
    }

    const handleDelete = async id => {
        console.log(id);
        await servicePlan.removePendiente(plan._id, id)
        const update_description = description.filter( d => d._id !== id)
        console.log(update_description);
        setDescription(update_description)
    }

    return(
        <div id="plan" className="w-full h-screen pt-44">
            <CloseSession user={user.username} closeSession={closeSession}/>
            <div className='absolute top-5 left-20' id='link-back'>
                <Link to="/panel"> Regreasr al panel</Link>
            </div>
            <div className='bg-white p-20 pt-6 w-3/5 rounded-lg m-auto'>
                <h3 className='text-center'>{plan.name}</h3>

                <table className='w-5/6 m-auto mt-7'>
                    <thead>
                        <tr>
                            <th className='text-white text-center'>Núm</th>
                            <th className='text-white text-center'>Dato</th>
                            <th className='text-white text-center'>Status</th>
                            <th className='text-white text-center'>Asignado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {description.map((d,i) =>(
                            <tr key={d.name} onDoubleClick={() => handleDelete(d._id)}>
                                <td className='text-center'>{i+1}</td>
                                <td className='text-center'>{d.name}</td>
                                <td className='text-center'>{d.status?'Completado':'No completado'}</td>
                                <td className='text-center'>{d.assiggned === ''?'Sin asignar': d.assiggned}</td>
                            </tr>
                        ))}
                        {
                            newPendiente?(
                        <tr className='tr-new'>
                            <td>
                                {description.length+1}
                            </td>
                            <td>
                                <input onChange={handleChange} type="text"  placeholder='Pendiente...' className='new-pendiente w-11/12' name='name'/>
                            </td>
                            <td>
                                <select onChange={handleChange} name="status">
                                    <option value={false}>No completo</option>
                                    <option value={true}>Completado</option>
                                </select>
                            </td>
                            <td>
                                <select onChange={handleChange} name="assiggned">
                                    <option value="">Asignar</option>
                                    {labelAssiggned.map(l => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                    <option value="ambos">Ambos</option>
                                </select>
                            </td>
                        </tr>
                            ): null
                        }
                    </tbody>
                </table>

                {
                    !newPendiente ?(
                        <button onClick={handlePendiente} className='p-2 mt-36 btn-add rounded-lg'>Agregar pendiente +</button>
                    ):(
                     <div>
                        <button onClick={createPendiente} className='p-2 mt-36 btn-add mr-5 rounded-lg btn-create'>Crear</button>
                        <button onClick={handlePendiente} className='p-2 mt-36 btn-add rounded-lg btn-cancel'>Cancelar</button>
                     </div>   
                    )
                }
            </div>
        </div>
    )
}