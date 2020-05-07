import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import { useEffect, useState } from 'react'

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
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(handleIntersectionObserver, {
      threshold: [0, 1.0]
    })
    intersectionObserver.observe(document.getElementById('article'))
  }, [])

  const handleIntersectionObserver = (entries, _) => {
    entries.forEach((entry) => {
      setIsInView(true)
      console.log(entry)
      console.log('読了')
    })
  }

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
    </Layout>
  )
}

export default Post
