import axios from 'axios'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import notavailable from '../assets/Image_not_available.png'

const NewsCard = lazy(() => import('../Components/NewsCard'));
const News = () => {
  const [news,setNews] = useState([]);
  const apikey = import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY;
  const FetchNews = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`);
    setNews(response.data.articles)
    } catch (error) {
     console.error(error)
    }
  }
  useEffect(() => {
    FetchNews()
  }, [])

  return (
    <div className='py-16 text-center'>
      <h1 className="text-2xl font-poppins font-bold ">Latest News</h1>
     <div className='flex justify-center gap-2 flex-wrap py-2'>
     {news && news.map(article => (
         <div key={article.title} className='max-w-[280px] border rounded-lg m-3 shadow hover:cursor-pointer font-poppins'>
         <Suspense fallback={<div>Loading...</div>}>
           <NewsCard
             image={article.urlToImage ? article.urlToImage : notavailable}
             title={article.title}
             link={article.url}
           />
         </Suspense>
       </div>
      ))}
     </div>
    </div>
  )
}

export default News
