import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { useEffect, useState, useRef } from 'react'

export const getStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

const Post = ({ postData }) => {
  const ref = useRef()
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry], _) => {
      if(ref.current && entry.isIntersecting){
        setIsInView(true)
        observer.unobserve(ref.current)
      }
      console.log('hoge')
    })
    if (ref.current) {
      observer.observe(ref.current)
    }
  }, [ref])

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article id='article' style={{background: isInView ? 'yellow' : 'white'}}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
      <div ref={ref} />
    </Layout>
  )
}

export default Post
