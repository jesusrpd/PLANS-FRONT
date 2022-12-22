export default function closeSession({user, closeSession}){
    return(
        <div className="absolute right-20 top-5 bg-white p-3 rounded-lg">
            <p className="mb-5">Usuario: <strong>{user}</strong></p>
            <button className="px-3 py-1 rounded-lg btn-sesion" onClick={closeSession}>Cerrar sesión</button>
        </div>
    )
}