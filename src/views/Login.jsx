import UserSVG from '../img/user.svg'
import PasswordSVG from '../img/password.svg'
import { useEffect, useState } from 'react'
import services from '../services/user'
import auth from '../routes/auth'

export default function Login(){

    const [user, setUser] = useState({username: '', password: ''})
    const [error, setError] = useState({show: false, message: ''})

    const onSubmit = async e => {
        e.preventDefault()
        console.log(user)
        try {
            const res = await services.login(user)
            setUser({...user,username:'', password: ''})
            console.log(res)
            if(!res.success){
                setError(!error)
                return
            }
            
            auth.login(() => {
                window.localStorage.setItem('user', JSON.stringify(res.data))
                window.location = "/panel"
            })
        } catch (err) {
            setError({...error, show: !error.show, message: err.response.data.error})
        }
    }

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
        setError({...error, show: false, message: ''})
    }

    useEffect(()=> {
        if(auth.isAuthenticated()){
            window.location = "/panel"
        }
    })

    return(
        <div id='home' className="w-full h-screen flex items-center">
                <div id='form' className="bg-white w-80 m-auto p-5 rounded-2xl flex flex-col justify-center items-center">
                    <small>Iniciar sesión</small>
                    {error?<p className='text-red-600'>{error.message}</p>:null}
                    <form onSubmit={onSubmit}>
                        <div className='relative'>
                            <img id='icon-form' src={UserSVG} alt="user icon" width={30} className='absolute top-2 left-1'/>
                            <input required name='username' type="text" placeholder='Username' onChange={handleChange} value={user.username}/>
                        </div>
                        <div className='relative'>
                            <img id='icon-form' src={PasswordSVG} alt="user icon" width={30} className='absolute top-2 left-1'/>
                            <input name='password' required type="text" placeholder='Password' onChange={handleChange} value={user.password}/>
                        </div>
                        <input type="submit" value="Iniciar sesión"/>
                    </form>
                </div>
        </div>
    )
}