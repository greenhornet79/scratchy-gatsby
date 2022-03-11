import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import styled from 'styled-components';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PostStyles = styled.article`
  background: #181E2C;
  padding: 20px;
  border-radius: 0.5rem;
  h2 a {
    color: #fff;
  }
  p {
    color: rgb(148, 163, 184);
  }
  .post-date {
    color: rgb(148, 163, 184);
  }
  .tags {
    margin-top: 10px;
    
    
    span {
      background: #202737;
      padding: 5px 10px;
      border-radius: 0.5rem;
      color: rgb(148, 163, 184);
      font-size: .875em;
      margin-right: 5px;
    }
  }
`;

export default function BlogTagIndex({ data } ) {

  console.log( data )

  const posts = data.posts.nodes 



  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title="All posts" />

      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title

          const featuredImage = {
            data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
            alt: post.featuredImage?.node?.alt || ``,
          }

          const tags = post.tags.nodes

          return (
            <li key={post.uri}>
              <PostStyles
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                {featuredImage?.data && (
                  <GatsbyImage
                    image={featuredImage.data}
                    alt={featuredImage.alt}
                    style={{ marginBottom: 50 }}
                  />
                )}
                  <h2>
                    <Link to={post.uri} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small className="post-date">{post.date}</small>
                </header>
                <section itemProp="description">{parse(post.excerpt)}</section>
                <div className="tags">
                  
                  {tags.map(tag => {
                    return (
                      <span key={tag.name}><a href={tag.link}>{tag.name}</a></span>  
                    )
                  })}

                </div>
              </PostStyles>
            </li>
          )
        })}
      </ol>

    </Layout>
  )
}

export const query = graphql`
  query WordPressPostTagArchive($id: Int!) {
    posts: allWpPost(
      filter: {tags: {nodes: {elemMatch: {termTaxonomyId: {eq: $id}}}}}
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
        tags {
          nodes {
            name
            link
          }
        }
        featuredImage {
          node {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData(
                  quality: 100
                  placeholder: TRACED_SVG
                  layout: FULL_WIDTH
                )
              }
            }
          }
        }
      }
    }
  }
`
