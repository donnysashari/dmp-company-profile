import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { About } from './collections/About'
// import { fileURLToPath } from 'url'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
  },
  collections: [
    About,
    // Users collection for admin authentication
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
          ],
          defaultValue: 'editor',
          required: true,
        },
      ],
    },
    // Portfolio collection
    {
      slug: 'portfolio',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'client',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Web Development', value: 'web' },
            { label: 'Mobile App', value: 'mobile' },
            { label: 'Data Analytics', value: 'analytics' },
            { label: 'Cloud Solutions', value: 'cloud' },
          ],
          required: true,
        },
        {
          name: 'technologies',
          type: 'array',
          fields: [
            {
              name: 'technology',
              type: 'text',
            }
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'completedAt',
          type: 'date',
        },
        {
          name: 'projectUrl',
          type: 'text',
        },
        {
          name: 'challenge',
          type: 'textarea',
        },
        {
          name: 'solution',
          type: 'textarea',
        },
        {
          name: 'results',
          type: 'array',
          fields: [
            {
              name: 'result',
              type: 'text',
            }
          ],
        },
        {
          name: 'featuredImage',
          type: 'relationship',
          relationTo: 'media',
        },
        {
          name: 'gallery',
          type: 'array',
          fields: [
            {
              name: 'image',
              type: 'relationship',
              relationTo: 'media',
            }
          ],
        },
        {
          name: 'testimonial',
          type: 'group',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
            },
            {
              name: 'author',
              type: 'text',
            },
            {
              name: 'position',
              type: 'text',
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
        },
      ],
    },
    // Services collection
    {
      slug: 'services',
      admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          defaultValue: '🚀',
          admin: {
            description: 'Emoji icon for the service (e.g., 🤖, 💻, 🎓)'
          }
        },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Artificial Intelligence', value: 'ai' },
            { label: 'Automation', value: 'automation' },
            { label: 'Education Technology', value: 'edtech' },
            { label: 'Financial Technology', value: 'fintech' },
            { label: 'Software Development', value: 'software' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            }
          ],
          admin: {
            description: 'List of key features for this service'
          }
        },
        {
          name: 'benefits',
          type: 'array',
          fields: [
            {
              name: 'benefit',
              type: 'text',
              required: true,
            }
          ],
          admin: {
            description: 'List of benefits clients get from this service'
          }
        },
        {
          name: 'technologies',
          type: 'array',
          fields: [
            {
              name: 'technology',
              type: 'text',
              required: true,
            }
          ],
          admin: {
            description: 'Technologies used in this service'
          }
        },
        {
          name: 'serviceImage',
          type: 'relationship',
          relationTo: 'media',
          admin: {
            description: 'Featured image for this service'
          }
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show this service on homepage'
          }
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Display order (lower numbers appear first)'
          }
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Coming Soon', value: 'coming-soon' },
            { label: 'Inactive', value: 'inactive' },
          ],
          defaultValue: 'active',
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
          admin: {
            description: 'Detailed content about the service'
          }
        },
      ],
    },
    // Team collection
    {
      slug: 'team',
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    // Pages collection
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          unique: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
        },
      ],
    },
    // Media collection - simplified
    {
      slug: 'media',
      access: {
        read: () => true, // Allow public read access to all media files
        create: ({ req: { user } }) => !!user, // Only authenticated users can upload
        update: ({ req: { user } }) => !!user, // Only authenticated users can edit
        delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
      },
      upload: {
        staticDir: 'media',
        imageSizes: [
          {
            name: 'thumbnail',
            width: 400,
            height: 300,
            position: 'centre',
          },
        ],
        adminThumbnail: 'thumbnail',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key',
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/dmp-compro',
  }),
})
