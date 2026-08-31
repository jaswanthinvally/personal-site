import React from 'react'

function RichText({ items = [] }) {
  return items.map((item, index) => {
    const { annotations = {}, href, plain_text: text } = item
    let node = text

    if (annotations.code) {
      node = (
        <code key={`code-${index}`} className="rounded bg-code px-1 font-mono text-sm text-heading">
          {node}
        </code>
      )
    }
    if (annotations.bold) {
      node = <strong key={`bold-${index}`}>{node}</strong>
    }
    if (annotations.italic) {
      node = <em key={`italic-${index}`}>{node}</em>
    }
    if (annotations.strikethrough) {
      node = <s key={`strike-${index}`}>{node}</s>
    }
    if (href) {
      node = (
        <a
          key={`link-${index}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-accent underline decoration-accent/40 hover:text-link-hover"
        >
          {node}
        </a>
      )
    }

    return <React.Fragment key={index}>{node}</React.Fragment>
  })
}

function blockText(block) {
  return block[block.type]?.rich_text || []
}

function imageUrl(block) {
  const image = block.image
  if (!image) {
    return ''
  }
  return image.type === 'external' ? image.external.url : image.file?.url
}

function ListItems({ blocks, ordered }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={`my-4 space-y-2 pl-6 text-copy ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {blocks.map((block) => (
        <li key={block.id}>
          <RichText items={blockText(block)} />
          {block.children?.length ? <NotionBlocks blocks={block.children} /> : null}
        </li>
      ))}
    </Tag>
  )
}

export default function NotionBlocks({ blocks = [] }) {
  const rendered = []

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i]
    const type = block.type

    if (type === 'bulleted_list_item' || type === 'numbered_list_item') {
      const grouped = []
      while (i < blocks.length && blocks[i].type === type) {
        grouped.push(blocks[i])
        i += 1
      }
      i -= 1
      rendered.push(
        <ListItems
          key={grouped[0].id}
          blocks={grouped}
          ordered={type === 'numbered_list_item'}
        />
      )
      continue
    }

    if (type === 'paragraph') {
      rendered.push(
        <p key={block.id} className="my-4 leading-relaxed text-copy">
          <RichText items={blockText(block)} />
        </p>
      )
    } else if (type === 'heading_1') {
      rendered.push(
        <h1 key={block.id} className="mb-4 mt-8 font-display text-3xl font-bold text-heading">
          <RichText items={blockText(block)} />
        </h1>
      )
    } else if (type === 'heading_2') {
      rendered.push(
        <h2 key={block.id} className="mb-3 mt-7 font-display text-2xl font-bold text-heading">
          <RichText items={blockText(block)} />
        </h2>
      )
    } else if (type === 'heading_3') {
      rendered.push(
        <h3 key={block.id} className="mb-2 mt-6 font-display text-xl font-bold text-heading">
          <RichText items={blockText(block)} />
        </h3>
      )
    } else if (type === 'quote') {
      rendered.push(
        <blockquote
          key={block.id}
          className="my-4 border-l-4 border-accent pl-4 font-display italic text-copy"
        >
          <RichText items={blockText(block)} />
        </blockquote>
      )
    } else if (type === 'code') {
      rendered.push(
        <pre
          key={block.id}
          className="my-4 overflow-x-auto rounded-lg bg-code p-4 font-mono text-sm text-heading"
        >
          <code>
            <RichText items={block.code?.rich_text || []} />
          </code>
        </pre>
      )
    } else if (type === 'image') {
      const src = imageUrl(block)
      if (src) {
        rendered.push(
          <img key={block.id} src={src} alt="" className="my-6 w-full rounded-lg" />
        )
      }
    } else if (type === 'divider') {
      rendered.push(<hr key={block.id} className="my-8 border-line" />)
    } else if (type === 'callout') {
      rendered.push(
        <div key={block.id} className="my-4 rounded-lg border border-line bg-card p-4 text-copy">
          <RichText items={block.callout?.rich_text || []} />
        </div>
      )
    } else if (type === 'to_do') {
      rendered.push(
        <label key={block.id} className="my-2 flex items-start gap-2 text-copy">
          <input type="checkbox" checked={Boolean(block.to_do?.checked)} readOnly className="mt-1" />
          <span>
            <RichText items={block.to_do?.rich_text || []} />
          </span>
        </label>
      )
    } else if (block.children?.length) {
      rendered.push(<NotionBlocks key={block.id} blocks={block.children} />)
    }
  }

  return <>{rendered}</>
}
