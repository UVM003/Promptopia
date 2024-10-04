"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, {useState,useEffect} from 'react'


const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {
  const {data:session}=useSession();
const [copied, setcopied] = useState("")
const router=useRouter()
const pathname=usePathname()
const handleCopy=()=>
{
  setcopied(post.prompt)
  console.log(copied)
  navigator.clipboard.writeText(post.prompt)
  setTimeout(()=>setcopied(""),3000);
}
  return (
    <div className="prompt_card">
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
       {session && <Image
        src={session?.user?.image}
        alt="user_image"
        width={40}
        height={40}
        className='rounded-full object-contain'/>}
        <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {session?.user.username}</h3>
            <p className='font-inter text-sm text-gray-500'>
              {session?.user.email}</p>
        </div>
</div>
<div className='copy_btn' onClick={handleCopy}>
<Image
src={copied===post.prompt ? "assets/icons/tick.svg":"assets/icons/copy.svg"}
alt="copy_icon"
width={12}
height={12}
/>
</div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700 '>
        {post.prompt}
      </p>
      <p  className='blue_gradient cursor-pointer font-inter text-sm'
      onClick={()=>handleTagClick && handleTagClick(post.tag)}>
        #{post.tag}
      </p>
      {session?.user.id===post.creator._id && pathname==='/profile' &&
      (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p 
          className='font-inter text-sm green_gradient cursor-pointer'
          onClick={handleEdit}>
            Edit
          </p>
          <p 
          className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={handleDelete}>
            Delete
          </p>
          </div>
      )}
    </div>
  )
}

export default PromptCard
