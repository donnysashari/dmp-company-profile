import { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
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
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Thumbnail image for portfolio item (recommended: 400x300px)',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Planned', value: 'planned' },
      ],
      defaultValue: 'completed',
    },
  ],
}
