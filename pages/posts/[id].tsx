import Head from 'next/head'
import Layout from '../../components/layout'
import Date from '../../components/date'
import PostUtil from '../../lib/postUtil'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'

interface PostType {
  title: string;
  date: string;
  contentHtml: string;
}

const postUtil = new PostUtil

const Post = ({ postData }: { postData: PostType }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postUtil.getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await postUtil.getPostData(params?.id as string)
  return {
    props: {
      postData
    }
  }
}

export default Post
