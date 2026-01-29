import { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'category', 'featured', 'updatedAt'],
    description: 'Manage portfolio items and project showcases',
  },
  access: {
    read: () => true, // Allow public read access
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title of the portfolio project'
      }
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "my-project-name")'
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          }
        ]
      }
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief description of the project'
      }
    },
    {
      name: 'client',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the client or organization'
      }
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'AI & Machine Learning', value: 'ai' },
        { label: 'Web Development', value: 'web' },
        { label: 'Mobile App', value: 'mobile' },
        { label: 'Data Analytics', value: 'analytics' },
        { label: 'Cloud Solutions', value: 'cloud' },
        { label: 'Automation & RPA', value: 'automation' },
        { label: 'IoT Solutions', value: 'iot' },
        { label: 'Blockchain', value: 'blockchain' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Primary category for this project'
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
        description: 'Technologies used in this project'
      }
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this project on the homepage'
      }
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'completed',
      admin: {
        description: 'Current status of the project'
      }
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: {
        description: 'Project completion date'
      }
    },
    {
      name: 'projectUrl',
      type: 'text',
      admin: {
        description: 'Live URL of the project (if available)'
      }
    },
    {
      name: 'challenge',
      type: 'textarea',
      admin: {
        description: 'Main challenges faced in this project'
      }
    },
    {
      name: 'solution',
      type: 'textarea',
      admin: {
        description: 'How the challenges were addressed'
      }
    },
    {
      name: 'results',
      type: 'array',
      fields: [
        {
          name: 'result',
          type: 'text',
          required: true,
        }
      ],
      admin: {
        description: 'Key results and outcomes of the project'
      }
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        description: 'Main image for this portfolio item'
      }
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        }
      ],
      admin: {
        description: 'Additional images showcasing the project'
      }
    },
    {
      name: 'testimonial',
      type: 'group',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          admin: {
            description: 'Client testimonial quote'
          }
        },
        {
          name: 'author',
          type: 'text',
          admin: {
            description: 'Name of the person giving testimonial'
          }
        },
        {
          name: 'position',
          type: 'text',
          admin: {
            description: 'Position/title of the testimonial author'
          }
        },
        {
          name: 'company',
          type: 'text',
          admin: {
            description: 'Company of the testimonial author'
          }
        },
      ],
      admin: {
        description: 'Client testimonial for this project'
      }
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        {
          name: 'duration',
          type: 'text',
          admin: {
            description: 'Project duration (e.g., "3 months", "6 weeks")'
          }
        },
        {
          name: 'teamSize',
          type: 'number',
          admin: {
            description: 'Size of the development team'
          }
        },
        {
          name: 'budget',
          type: 'text',
          admin: {
            description: 'Project budget range (optional)'
          }
        },
      ],
      admin: {
        description: 'Project metrics and statistics'
      }
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Detailed project description and content'
      }
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'SEO title (overrides default title)'
          }
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'SEO meta description'
          }
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'SEO keywords (comma separated)'
          }
        },
      ],
      admin: {
        description: 'SEO settings for this portfolio item'
      }
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Auto-generate slug if not provided
        if (data && !data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        }
        return data
      }
    ]
  },
}
