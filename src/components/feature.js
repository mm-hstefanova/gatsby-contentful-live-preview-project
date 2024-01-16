import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  Flex,
  Box,
  Subhead,
  Kicker,
  Text,
  ButtonList,
} from "./ui"

import { useContentfulLiveUpdates } from "@contentful/live-preview/react"

export default function Feature({ contentful_id, ...props }) {
  const updatedData = useContentfulLiveUpdates({
    ...props,
    sys: { id: contentful_id },
  })
  console.log("feature:", updatedData)
  return (
    <Section padding={4} background="muted">
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half" order={updatedData.flip ? 1 : null}>
            {updatedData.image && (
              <GatsbyImage
                alt={updatedData.image.alt}
                image={getImage(updatedData.image.gatsbyImageData)}
              />
            )}
          </Box>
          <Box width="half">
            <Subhead>
              {updatedData.kicker && <Kicker>{updatedData.kicker}</Kicker>}
              {updatedData.heading}
            </Subhead>
            <Text variant="lead">{updatedData.text}</Text>
            <ButtonList links={updatedData.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageFeatureContent on HomepageFeature {
    id
    contentful_id
    kicker
    heading
    text
    links {
      id
      href
      text
    }
    image {
      id
      gatsbyImageData
      alt
    }
  }
`
