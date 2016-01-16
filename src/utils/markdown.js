import marked from 'marked';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

function renderMarkdown(markdown) {
  return marked(markdown, { renderer, sanitize: true });
}

export { renderMarkdown };
