import Head from 'next/head'

import { fetchEntries } from '@utils/contentfulPosts'
import { fetchCategories } from '@utils/contentfulCategories'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Post from '@components/Post'
import Category from '@components/Category'

export default function Home({ posts, categories }) {
  return (
    <div className="container">
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header text={'Products'}/>
        <div className="posts">
          {posts.map((p) => {
            return <Post key={p.slug} image={p.image.fields} title={p.title} />
          })}
        </div>

        <Header text={'Categories'}/>
        <div className="categories">
          {categories.map((p) => {
            return <Category key={p.id} title={p.title} description={p.description} />
          })}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .posts {
          display: flex;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  let res = await fetchEntries()
  const posts = await res.map((p) => {
    return p.fields
  })

  res = await fetchCategories()
  const categories = await res.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
      categories
    },
  }
}
