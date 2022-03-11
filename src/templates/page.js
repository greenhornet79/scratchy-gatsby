import React from 'react';
import Layout from '../components/layout';
import Seo from '../components/seo';
import Bio from '../components/bio';
import { graphql } from 'gatsby';
import parse from "html-react-parser"

export default function AboutPage({ data } ) {

    const page = data.page

    return (
        <Layout>
        <Seo title="About" description="About myself" />
  
        <article
          className="page"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1 itemProp="headline">{parse(page.title)}</h1>
          </header>
  
          
        <section itemProp="articleBody">
           {parse(page.content)}
        </section>
          
  
          <hr />
  
         
        </article>
  
      </Layout>
    )
}


export const pageQuery = graphql`
  query PageById(
    $id: String!
  ) {
    page: wpPage(id: { eq: $id }) {
      id
      content
      title
    }
  }
`
