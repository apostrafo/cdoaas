import { GitContentSource } from '@stackbit/cms-git';

export default {
  stackbitVersion: '~0.6.0',
  ssgName: 'astro',
  nodeVersion: '18',
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ['content'],
      models: [
        {
          name: 'page',
          label: 'Page',
          match: {
            exclude: ['blog/**/*', 'services.md', 'approach.md', 'about.md', 'index.md']
          },
          fields: [
            { name: 'title', type: 'string', label: 'Title', required: true },
            { name: 'subtitle', type: 'string', label: 'Subtitle' },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        },
        {
          name: 'index',
          label: 'Home Page',
          match: 'content/index.md',
          fields: [
            { name: 'title', type: 'string', label: 'Title', required: true },
            { name: 'subtitle', type: 'string', label: 'Subtitle' },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        },
        {
          name: 'services',
          label: 'Services',
          match: 'content/services.md',
          fields: [
            { name: 'title', type: 'string', label: 'Title', required: true },
            { name: 'subtitle', type: 'string', label: 'Subtitle' },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        },
        {
          name: 'approach',
          label: 'Our Approach',
          match: 'content/approach.md',
          fields: [
            { name: 'title', type: 'string', label: 'Title', required: true },
            { name: 'subtitle', type: 'string', label: 'Subtitle' },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        },
        {
          name: 'about',
          label: 'About Us',
          match: 'content/about.md',
          fields: [
            { name: 'title', type: 'string', label: 'Title', required: true },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        },
        {
          name: 'blog',
          label: 'Blog Post',
          match: 'content/blog/**/*.md',
          fields: [
            { name: 'title', type: 'string', label: 'Title', required: true },
            { name: 'date', type: 'date', label: 'Date', required: true },
            { name: 'author', type: 'string', label: 'Author' },
            { name: 'image', type: 'image', label: 'Featured Image' },
            { name: 'excerpt', type: 'text', label: 'Excerpt' },
            { name: 'body', type: 'markdown', label: 'Content' }
          ]
        }
      ]
    })
  ],
  presets: [
    {
      label: 'Typography',
      global: true,
      styles: {
        h1: { fontFamily: 'sans-serif', fontSize: '2.5em', fontWeight: 'bold' },
        h2: { fontFamily: 'sans-serif', fontSize: '2em', fontWeight: 'bold' },
        h3: { fontFamily: 'sans-serif', fontSize: '1.75em', fontWeight: 'bold' },
        h4: { fontFamily: 'sans-serif', fontSize: '1.5em', fontWeight: 'semibold' },
        h5: { fontFamily: 'sans-serif', fontSize: '1.25em', fontWeight: 'semibold' },
        h6: { fontFamily: 'sans-serif', fontSize: '1em', fontWeight: 'semibold' },
        p: { fontFamily: 'sans-serif', fontSize: '1em' }
      }
    }
  ]
}; 