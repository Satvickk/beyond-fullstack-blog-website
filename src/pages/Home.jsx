import {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../store/postSlice';

function Home() {

    const dispatch = useDispatch()
    const AllPosts = useSelector((state) => state.posts.allPosts)


    useEffect(() => {
        appwriteService.getPosts()
        .then((posts) => {
            if (posts) {
                dispatch(setPost(posts.documents))
            }
        })
    }, [])
  
    if (AllPosts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {AllPosts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home