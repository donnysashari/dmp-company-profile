import { CollectionConfig } from 'payload'

export const About: CollectionConfig = {
  slug: 'about',
  labels: {
    singular: 'About',
    plural: 'About'
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
      defaultValue: 'About Digital Mahadata Prima',
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'Hero Title',
      required: true,
      defaultValue: 'About Digital Mahadata Prima',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      label: 'Hero Description',
      required: true,
    },
    {
      name: 'ourStory',
      type: 'group',
      label: 'Our Story Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'Our Story',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Story Content',
          required: true,
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Company Values',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon (Emoji)',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Value Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
    {
      name: 'timeline',
      type: 'array',
      label: 'Company Timeline',
      minRows: 1,
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Year',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Milestone Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
    {
      name: 'team',
      type: 'array',
      label: 'Leadership Team',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          label: 'Position',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Biography',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Photo',
        },
      ],
    },
    {
      name: 'statistics',
      type: 'group',
      label: 'Statistics Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          defaultValue: 'By the Numbers',
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistics',
          fields: [
            {
              name: 'number',
              type: 'text',
              label: 'Number (e.g., 50+)',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'CTA Title',
          defaultValue: 'Ready to Work With Us?',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'CTA Description',
        },
        {
          name: 'primaryButtonText',
          type: 'text',
          label: 'Primary Button Text',
          defaultValue: 'Get In Touch',
        },
        {
          name: 'secondaryButtonText',
          type: 'text',
          label: 'Secondary Button Text',
          defaultValue: 'View Our Work',
        },
      ],
    },
  ],
}
