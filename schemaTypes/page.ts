export const page = {
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    { name: 'title', title: 'Page Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
  ]
}
