import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../Editor'

export default function EditPosts(){

    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(()=>{
        fetch('http://localhost:4000/post/'+id)
        .then(response =>{
            response.json().then(postInfo =>{
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })
    },[])

    async function updatePost(e){
        e.preventDefault()

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id',id)
        if(file?.[0]){
        data.set('file',file?.[0])
        }

        const response = await fetch('http://localhost:4000/post',{
            method:'PUT',
            body:data,
            credentials:'include'
        })
        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }

    return (
        <form onSubmit={updatePost}>
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
            <button style={{marginTop: '5px'}}>Update Post</button>
        </form>
    )
}