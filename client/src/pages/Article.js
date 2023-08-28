import React from 'react'
import { useParams } from 'react-router-dom'
import articleContent from './article-content'
const Article = () => {
   const { name } = useParams(); 
   const article = articleContent.find(article => article.name === name)
   if(!article) return <h1>Article not found</h1>
  return (
    <div>
        <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>{article.title}</h1>
        {article.content.map((paragraph, index)=>(
            <p key={index}>{paragraph}</p>
        ))}
    </div>

  )
}

export default Article