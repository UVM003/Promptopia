"use client"
import Profile from '@/Components/Profile'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React,{useState,useEffect} from 'react'



const UserProfile = () => {
  const {data:session , status}=useSession()
  const [posts, setposts] = useState([])
  const router = useRouter()
  const fetchPosts = async ()=>
    {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data=await res.json();
      setposts(data)
    }
  useEffect(() => {
     fetchPosts();
  }, [session])
  const handleEdit = async(post)=>
  {
   router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async(post)=>
    {
      const hasConfirmed= confirm("Are You Sure you want to delete this prompt")
      if(hasConfirmed)
      {
        try {
          await axios.delete(`/api/prompt/${post._id}`)
        const filteredPosts= posts.filter((p)=>p._id!==post._id)
        setposts(filteredPosts)
      }
          
 catch (error) {
          console.log(error)
        }
      }
  
    }
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}/>
  )
}

export default UserProfile
