"use client"
import Form from '@/Components/Form'
import axios from 'axios'
import { useRouter,useSearchParams } from 'next/navigation'
import React,{useState,useEffect} from 'react'



const  UpdatePrompt= () => {
    const [isSubmitting, setisSubmitting] = useState(false)
    const router= useRouter();
   const searchParams = useSearchParams();
   const promptId = searchParams.get('id')
    const [post, setpost] = useState(
        {
            prompt:'',
            tag:''
        }
    )

    useEffect(() => {
      const getPromptDetails = async ()=>
      {
        const response= await fetch (`/api/prompt/${promptId}`)
        const data = await response.json()
        setpost(
            {
                prompt:data.prompt,
                tag:data.tag, 
            }
        )
      }
      if(promptId) getPromptDetails()
    
    }, [promptId])
    
    const updatePrompt=async(e)=>
    {
        e.preventDefault();
        setisSubmitting(true);
        if(!promptId) return alert ('Prompt ID not Found')
        try {

            const response = await axios.patch(`/api/prompt/${promptId}`,
                {
                            prompt:post.prompt,
                            tag:post.tag
            
                }
            )
            if(response.statusText=='OK')
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
    type="Edit"
    post={post}
    setpost={setpost}
    isSubmitting={isSubmitting}
    handleSubmit={updatePrompt}/>

  )
}

export default UpdatePrompt