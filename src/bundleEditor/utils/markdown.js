import marked from 'marked';

// TODO: Ensure security
const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

function renderMarkdown(markdown) {
  return marked(markdown, { renderer });
}

export default { renderMarkdown };
