export const articleToMarkdown = (img, title, content) => $text.HTMLEscape(`![](${img})\n### ${title}\n${content}`)
