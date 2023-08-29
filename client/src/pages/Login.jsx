import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export default function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)
    async function login(e){
        e.preventDefault()
        const response = await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({
                username,
                password
            }),
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include'
        })
        if(response.ok){
            response.json().then(info =>{
            setUserInfo(info)
            setRedirect(true)
            })
        }else{
            alert('Incorrect username or password')
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input 
            type="text" 
            placeholder="Enter Username" 
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="Enter Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    )
}