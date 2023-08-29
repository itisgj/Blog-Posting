import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom'
import Editor from '../Editor'

export default function Post(){

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function newPost(e){

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file',file[0])

        e.preventDefault()

        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials:'include'
        })
        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={newPost}>
            <input 
            type="title" 
            placeholder={'Enter Title'} 
            value={title} 
            onChange={e => setTitle(e.target.value)}/>
            <input 
            type="summary" 
            placeholder={'Enter Summary'}
            value={summary}
            onChange={e => setSummary(e.target.value)}/>
            <input type="file" onChange={e => setFile(e.target.files)}/>
            <Editor onChange={setContent} value={content}/>
            <button style={{marginTop: '5px'}}>Create Post</button>
        </form>
    )
}