"use client"
import Form from '@/Components/Form'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'


const  CreatePrompt= () => {
    const [isSubmitting, setisSubmitting] = useState(false)
    const router= useRouter();
    const {data:session}=useSession();
   
    const [post, setpost] = useState(
        {
            prompt:'',
            tag:''
        }
    )
    const createPrompt=async(e)=>
    {
        e.preventDefault();
        setisSubmitting(true);
        try {

            const response = await fetch('/api/prompt/new',
                {
                    method:'POST',
                    body:JSON.stringify(
                        {
                            prompt:post.prompt,
                            u:session?.user?.id,
                            tag:post.tag
                        }
                    )
                }
            )
            if(response.ok)
            {
                router.push('/')
            }
        } catch (error) {
           console.log(error) 
        }finally{
            setisSubmitting(false)
        }

    }
  return (
    <Form
    type="create"
    post={post}
    setpost={setpost}
    isSubmitting={isSubmitting}
    handleSubmit={createPrompt}/>

  )
}

export default CreatePrompt