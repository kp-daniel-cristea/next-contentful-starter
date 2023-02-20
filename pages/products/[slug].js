import { useRouter } from 'next/router'
import { fetchEntry } from '@utils/contentfulGetEntry'
import { fetchEntries } from '@utils/contentfulPosts'

export default function Product({ product }) {
    let { file, imageDescription } = product.fields.image.fields

    return (
      <div className="post">
        <div className="text">
          <h2>{product.fields.title}</h2>
        </div>
        <img alt={imageDescription} src={`https:${file.url}`} width={400} />
        <div className="description">Description: {product.fields.description.content[0].content[0].value}</div>
        <div className="price">Price: ${product.fields.price}</div>
        <div className="category">Categories:&nbsp;
        {product.fields.categories.map((category, index) => {
          {return category.fields.title + (index < product.fields.categories.length - 1 ? ", " : "")};
        })}
        </div>


        <style jsx>{`
        .post {
          display: flex;
          align-items: center;
          flex-direction: column
        }
        .description {
          margin-top: 10px;
        }
      `}</style>
      </div>
    )
}

export async function getStaticPaths() {
  let res = await fetchEntries()
  const paths = await res.map((p) => {
    return '/products/' + p.sys.id
  })

  return {
    paths, 
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  let product = await fetchEntry(params.slug)
  return {
    props: {
      product,
    },
  }
}