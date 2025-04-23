import { defineCollection, z } from 'astro:content';

// Page collection schema
const pageCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
  }),
});

// Blog collection schema
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    image: z.string().optional(),
    excerpt: z.string().optional(),
  }),
});

// About collection schema
const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

// Services collection schema
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

// Approach collection schema
const approachCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
});

// Case Studies collection schema
const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    cases: z
      .array(
        z.object({
          name: z.string(),
          logo: z.string().optional(),
          description: z.string(),
          challenges: z.string(),
          solutions: z.string(),
          results: z.string(),
        })
      )
      .optional(),
  }),
});

// Team collection schema
const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    position: z.string(),
    photo: z.string().optional(),
    linkedin: z.string().optional(),
    bio: z.string().optional(),
    order: z.number().optional(),
  }),
});

// Export collections
export const collections = {
  'blog': blogCollection,
  'about': aboutCollection,
  'services': servicesCollection,
  'approach': approachCollection,
  'case-studies': caseStudiesCollection,
  'team': teamCollection,
}; 