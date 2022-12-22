export default function closeSession({user, closeSession}){
    return(
        <div className="absolute right-2 top-2 bg-white p-3 rounded-lg flex items-center">
            <p className="mb-1 mr-4">Usuario: <strong>{user}</strong></p>
            <button className="px-3 py-1 rounded-lg btn-sesion" onClick={closeSession}>Cerrar sesión</button>
        </div>
    )
}