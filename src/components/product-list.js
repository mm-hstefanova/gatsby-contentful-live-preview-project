import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Subhead,
  Box,
  Icon,
  LinkList,
} from "./ui"

import { useContentfulLiveUpdates } from "@contentful/live-preview/react"

function Product({ contentful_id, ...props }) {
  const data = useContentfulLiveUpdates({
    ...props,
    sys: { id: contentful_id },
  })
  console.log("product: ", data)
  return (
    <Box center>
      {data.image && (
        <Icon
          alt={data.image.alt}
          image={data.image.gatsbyImageData}
          size="large"
        />
      )}
      <Subhead>{data.heading}</Subhead>
      <Text>{data.text}</Text>
      <LinkList links={data.links} />
    </Box>
  )
}

export default function ProductList({ contentful_id, ...props }) {
  const data = useContentfulLiveUpdates({
    ...props,
    sys: { id: contentful_id },
  })

  console.log("data: ", data)

  return (
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {data.kicker && <Kicker>{data.kicker}</Kicker>}
            {data.heading}
          </Heading>
          {data.text && <Text>{data.text}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {data.content.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageProductListContent on HomepageProductList {
    id
    contentful_id
    kicker
    heading
    text
    content {
      id
      contentful_id
      heading
      text
      image {
        alt
        id
        gatsbyImageData
      }
      links {
        id
        href
        text
      }
    }
  }
`
