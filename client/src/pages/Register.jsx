import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export default function Register(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function register(e){
        e.preventDefault()
        const response = await fetch('http://localhost:4000/register',{
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
        }
        else{
            alert('Registration failed!!!')
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
    <form className="register" onSubmit={register}>
        <h1>Register</h1>
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
        <button>Register</button>
    </form>
    )
}