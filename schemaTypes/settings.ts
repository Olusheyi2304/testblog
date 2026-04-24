export const settings = {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'menuLinks',
      title: 'Navigation Menu',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Link Label', type: 'string' }, // e.g., "About"
            { name: 'url', title: 'URL Path', type: 'string' },    // e.g., "/about"
          ]
        }
      ]
    }
  ]
}
