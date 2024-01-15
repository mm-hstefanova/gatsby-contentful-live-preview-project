import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import {
  Box,
  ButtonList,
  Container,
  Flex,
  Heading,
  Kicker,
  Section,
  Subhead,
  Text,
} from "./ui"

import {
  useContentfulLiveUpdates,
  useContentfulInspectorMode,
} from "@contentful/live-preview/react"

export default function Hero({ contentful_id, ...props }) {
  const inspectorProps = useContentfulInspectorMode()
  const data = useContentfulLiveUpdates({
    ...props,
    sys: { id: contentful_id },
  })

  return (
    <Section>
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half">
            {data.image && (
              <GatsbyImage
                alt={data.image.alt}
                image={getImage(props.image.gatsbyImageData)}
              />
            )}
          </Box>
          <Box width="half">
            <Heading as="h1">
              {props.kicker && <Kicker>{data.kicker}</Kicker>}
              {data.h1}
            </Heading>
            <Subhead as="h2">{data.subhead}</Subhead>
            <Text
              as="p"
              {...inspectorProps({
                entryId: contentful_id,
                fieldId: "text",
              })}
            >
              {data.text}
            </Text>
            <ButtonList links={data.links} />
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageHeroContent on HomepageHero {
    __typename
    contentful_id
    id
    kicker
    h1: heading
    subhead
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
