import * as React from "react"
import { graphql } from "gatsby"
import { Container, Box, Kicker, Heading, Text } from "./ui"
import Feature from "./feature"
import { useContentfulLiveUpdates } from "@contentful/live-preview/react"

export default function FeatureList({ contentful_id, ...props }) {
  const updatedData = useContentfulLiveUpdates({
    ...props,
    sys: { id: contentful_id },
  })
  return (
    <Container width="fullbleed">
      <Box background="muted" radius="large">
        <Box center paddingY={5}>
          <Heading>
            {updatedData.kicker && <Kicker>{updatedData.kicker}</Kicker>}
            {updatedData.heading}
          </Heading>
          {updatedData.text && <Text>{updatedData.text}</Text>}
        </Box>
        {updatedData.content.map((feature, i) => (
          <Feature key={feature.id} {...feature} flip={Boolean(i % 2)} />
        ))}
      </Box>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageFeatureListContent on HomepageFeatureList {
    id
    contentful_id
    kicker
    heading
    text
    content {
      id
      ...HomepageFeatureContent
    }
  }
`
