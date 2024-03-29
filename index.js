import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import manifest from './xmind/manifest'
import metadata from './xmind/metadata'
import content from './xmind/content'

function generateUUID() {
  return (
    new Date().getTime().toString(16) + Math.random().toString(16).substr(2)
  ).substr(2, 16)
}

function convert(data) {
  data.title = data.topic
  delete data.topic
  if (data.style) {
    const style = data.style
    const properties = {}
    if (style.fontSize) {
      properties['fo:font-size'] = style.fontSize
    }
    if (style.fontWeight) {
      properties['fo:font-weight'] = style.fontWeight
    }
    if (style.color) {
      properties['fo:color'] = style.color
    }
    if (style.background) {
      properties['svg:fill'] = style.background
      properties['fill-pattern'] = 'solid'
    }
    data.style = { properties }
  }
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      convert(data.children[i])
    }
    data.children = {
      attached: data.children,
    }
  }
}

export function data2Xmind(data, version) {
  const zip = new JSZip()
  const id = generateUUID()

  if (version) {
    metadata.creator.version = version
  }
  metadata.activeSheetId = id
  const c0 = content[0]
  c0.id = id
  c0.title = data.nodeData.topic
  convert(data.nodeData)
  c0.rootTopic = data.nodeData
  zip.file('manifest.json', JSON.stringify(manifest))
  zip.file('metadata.json', JSON.stringify(metadata))
  zip.file('content.json', JSON.stringify(content))

  return zip.generateAsync({ type: 'blob' })
}

export default function (me) {
  me.exportXmind = function () {
    const data = me.getData()
    return data2Xmind(data, me.version)
  }
  me.exportXmindFile = async function (fileName) {
    const data = me.getData()
    const file = await data2Xmind(data, me.version)
    // `topic` had renamed to `title`
    saveAs(file, (fileName || data.nodeData.title) + '.xmind')
  }
}
