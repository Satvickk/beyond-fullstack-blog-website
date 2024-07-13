import Service from '../appwrite/config'
import { Link } from 'react-router-dom'


function PostCard({ $id, featuredImage, title}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-900 rounded-md p-2'>
            <div className='w-full justify-center mb-4 '>
                <img src={Service.getFilePreview(featuredImage)} alt={title} className='rounded-md w-full h-full' />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
