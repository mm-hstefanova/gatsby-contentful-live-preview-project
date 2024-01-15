import "@fontsource/dm-sans"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/700.css"
import "@fontsource/dm-mono"
import "@fontsource/dm-mono/500.css"
import "@contentful/live-preview/style.css"

import React from "react"
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react"

export const wrapRootElement = ({ element }) => (
  <ContentfulLivePreviewProvider locale="en-US">
    {element}
  </ContentfulLivePreviewProvider>
)
