export const noop = () => {}

export function printRenderTimings(id, phase, actualDuration, baseDuration) {
  id, phase, actualDuration, baseDuration
  console.log(`[${phase}] ${id} actual ${actualDuration}ms base ${baseDuration}ms`)
}

export function articleToMarkdown(img, title, content) {
  return $text.HTMLEscape(`![](${img})\n### ${title}\n${content}`)
}
