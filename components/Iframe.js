"use client";
import React from 'react'

import IframeResizer from 'iframe-resizer-react'


function Iframe({src}) {
  return (
    <IframeResizer
      heightCalculationMethod="lowestElement"
      src={src}
      inPageLinks
      log
      style={{ width: '1px', minWidth: '100%',minHeight:600}}
    ></IframeResizer>
  )
}

export default Iframe