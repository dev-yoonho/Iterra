import type { SerializedEditorState, SerializedLexicalNode } from 'lexical'

import {
  consolidateHTMLConverters,
  convertLexicalToHTML,
  editorConfigFactory,
} from '@payloadcms/richtext-lexical'

import { getPayloadClient } from '@/lib/payload'
import type { RichTextValue } from '@/types/site'

type RichTextContentProps = {
  value: RichTextValue | null
}

const isSerializedEditorState = (
  value: RichTextValue | null,
): value is SerializedEditorState<SerializedLexicalNode> =>
  Boolean(value?.root && Array.isArray(value.root.children))

export const RichTextContent = async ({ value }: RichTextContentProps) => {
  if (!isSerializedEditorState(value)) {
    return null
  }

  const payload = await getPayloadClient()

  if (!payload) {
    return null
  }

  const editorConfig = await editorConfigFactory.default({
    config: payload.config,
    parentIsLocalized: false,
  })
  const html = await convertLexicalToHTML({
    converters: consolidateHTMLConverters({ editorConfig }),
    data: value,
    payload,
  })

  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: html }} />
}
