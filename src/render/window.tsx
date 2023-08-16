import { useEffect, useRef, useState } from "react"
import {
  highlightSpecialChars,
  drawSelection,
  keymap,
  ViewUpdate,
  EditorView,
} from "@codemirror/view"
import { Extension, EditorState, Compartment } from "@codemirror/state"
import { defaultHighlightStyle, syntaxHighlighting, syntaxTree } from "@codemirror/language"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { search } from '@codemirror/search'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { myTheme } from "./theme"
import { ayuLight } from "./theme"


const minimalSetup: Extension = [
  highlightSpecialChars(),
  history(),
  drawSelection(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  keymap.of([
    ...defaultKeymap,
    ...historyKeymap,
  ])
]

export default function WindowMain(): JSX.Element {
  const [content, _] = useState(`# A first-level heading
## A second-level heading
### A third-level heading

Styling text
----
- **bold**
- *Italic* or _Italic 2_
- ~~Strikethrough~~
- **Bold and nested _italic_**
- ***All bold and italic***
- Use in line \`code\` style .

\`\`\`js
consle.log('hello')
\`\`\`
`)
  const [editView, setView] = useState<EditorView | null>(null)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (domRef.current === null) { return }
    if (editView !== null) {
      editView.destroy()
    }
    const state = EditorState.create({
      doc: content,
      extensions: [
        minimalSetup,
        markdown({
          base: markdownLanguage,
          addKeymap: true,
          codeLanguages: languages
        }),
        myTheme(),
        ayuLight
      ]
    })
    const view = new EditorView({
      state,
      parent: domRef.current
    })
    setView(view)
  }, [domRef])
  return (
    <div 
      onMouseDown={e => {
        e.preventDefault()
      }}
      onMouseUp={e => {
        e.preventDefault()
        editView?.focus()
      }}
      className='p-10'>
      <div
        ref={domRef}
        className=''>
      </div>
    </div>
  )
}
