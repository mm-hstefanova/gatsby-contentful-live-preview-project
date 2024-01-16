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

import {
  useContentfulLiveUpdates,
  useContentfulInspectorMode,
} from "@contentful/live-preview/react"

function Product(props) {
  return (
    <Box center>
      {props.image && (
        <Icon
          alt={props.image.alt}
          image={props.image.gatsbyImageData}
          size="large"
        />
      )}
      <Subhead>{props.heading}</Subhead>
      <Text>{props.text}</Text>
      <LinkList links={props.links} />
    </Box>
  )
}

export default function ProductList({ contentful_id, ...props }) {
  console.log("product list: ", contentful_id)
  const updatedData = useContentfulLiveUpdates({
    ...props,
    sys: { id: contentful_id },
  })

  console.log("updatedData: ", updatedData)
  return (
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {updatedData.kicker && <Kicker>{updatedData.kicker}</Kicker>}
            {updatedData.heading}
          </Heading>
          {updatedData.text && <Text>{updatedData.text}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {updatedData.content.map((product) => (
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
