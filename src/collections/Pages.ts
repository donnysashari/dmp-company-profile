import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages'
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'pageType', 'status', 'updatedAt'],
    group: 'Content Management',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
      admin: {
        description: 'Display title for this page'
      }
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL path (e.g., "about", "services", "contact")',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      label: 'Page Type',
      options: [
        {
          label: 'Home Page',
          value: 'home',
        },
        {
          label: 'About Us',
          value: 'about',
        },
        {
          label: 'Services',
          value: 'services',
        },
        {
          label: 'Portfolio',
          value: 'portfolio',
        },
        {
          label: 'Contact Us',
          value: 'contact',
        },
        {
          label: 'Custom Page',
          value: 'custom',
        },
      ],
      defaultValue: 'custom',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Page Status',
      options: [
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Under Maintenance',
          value: 'maintenance',
        },
        {
          label: 'Coming Soon',
          value: 'coming-soon',
        },
      ],
      defaultValue: 'published',
      admin: {
        description: 'Current status of this page'
      }
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Page Description',
      admin: {
        description: 'Brief description of what this page contains'
      }
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'Title that appears in search engines (recommended: 50-60 characters)',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'Description that appears in search engines (recommended: 150-160 characters)',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
          admin: {
            description: 'Comma-separated keywords for SEO'
          }
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Media Image',
          admin: {
            description: 'Image that appears when shared on social media (recommended: 1200x630px)'
          }
        },
      ],
    },
    {
      name: 'navigation',
      type: 'group',
      label: 'Navigation Settings',
      fields: [
        {
          name: 'showInMainMenu',
          type: 'checkbox',
          label: 'Show in Main Navigation',
          defaultValue: true,
          admin: {
            description: 'Display this page in the main website navigation'
          }
        },
        {
          name: 'showInFooter',
          type: 'checkbox',
          label: 'Show in Footer Menu',
          defaultValue: false,
          admin: {
            description: 'Display this page in the footer navigation'
          }
        },
        {
          name: 'menuOrder',
          type: 'number',
          label: 'Menu Order',
          defaultValue: 0,
          admin: {
            description: 'Order in navigation menu (lower numbers appear first)'
          }
        },
        {
          name: 'menuLabel',
          type: 'text',
          label: 'Menu Label',
          admin: {
            description: 'Custom label for navigation menu (optional, uses page title if empty)'
          }
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      label: 'Page Content Settings',
      fields: [
        {
          name: 'hasHeroSection',
          type: 'checkbox',
          label: 'Has Hero Section',
          defaultValue: true,
        },
        {
          name: 'hasContactForm',
          type: 'checkbox',
          label: 'Has Contact Form',
          defaultValue: false,
        },
        {
          name: 'enableComments',
          type: 'checkbox',
          label: 'Enable Comments',
          defaultValue: false,
        },
        {
          name: 'customCSS',
          type: 'textarea',
          label: 'Custom CSS',
          admin: {
            description: 'Custom CSS styles for this page (advanced users only)'
          }
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      label: 'Analytics & Tracking',
      fields: [
        {
          name: 'trackPageViews',
          type: 'checkbox',
          label: 'Track Page Views',
          defaultValue: true,
        },
        {
          name: 'conversionGoals',
          type: 'array',
          label: 'Conversion Goals',
          fields: [
            {
              name: 'goalName',
              type: 'text',
              label: 'Goal Name',
            },
            {
              name: 'goalType',
              type: 'select',
              options: [
                { label: 'Contact Form Submit', value: 'contact' },
                { label: 'Download', value: 'download' },
                { label: 'Newsletter Signup', value: 'newsletter' },
                { label: 'Service Inquiry', value: 'service' },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Auto-generate slug from title if not provided
        if (data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        
        // Auto-generate meta title from title if not provided
        if (data?.title && !data?.seo?.metaTitle) {
          data.seo = {
            ...data.seo,
            metaTitle: data.title
          }
        }
        
        return data
      }
    ]
  },
}
