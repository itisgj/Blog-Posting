import {format, formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

export default function CreatePost({_id, title, summary, cover, content, createdAt, author}){

    return(
        <div className='blog'>
          <div className='blog-image'>
            <Link to={`/post/${_id}`}>
              <img src={'http://localhost:4000/' + cover}/>
            </Link>
          </div>
          <div className='description'>
            <Link to={`/post/${_id}`}>
              <h2>{title}</h2>
            </Link>
            <p className='blogger-info'>
              <a className='blogger'>{author.username}</a>
              {/* <time>{moment(createdAt, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD HH:mm:ss')}</time> */}
              <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm:s')}</time>
            </p>
            <p className='summary'>{summary}</p>
          </div>
      </div>
    )
}