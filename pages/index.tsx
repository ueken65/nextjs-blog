import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import PostUtil from "../lib/postUtil";
import Date from "../components/date";

interface Post {
  id: string;
  date: string;
  title: string;
}

export const getStaticProps = async () => {
  const postUtil = new PostUtil();
  const allPostsData = postUtil.getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

const Home = ({ allPostsData }: { allPostsData: Post[] }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Web Application Developer</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        {allPostsData.map(({ id, date, title }) => (
          <div className={utilStyles.listItem} key={id}>
            <h3 className={utilStyles.listItemTitle}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
            </h3>
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Home;
