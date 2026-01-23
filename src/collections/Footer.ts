import { CollectionConfig } from 'payload'

export const Footer: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'updatedAt'],
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    // Company Information Section
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
      defaultValue: 'PT. Digital Mahadata Prima'
    },
    {
      name: 'companyDescription',
      label: 'Company Description',
      type: 'textarea',
      required: true,
      defaultValue: 'Kami membantu organisasi mentransformasikan bisnis mereka melalui perangkat lunak digital dan layanan TIK yang unggul.'
    },
    
    // Navigation Links Section
    {
      name: 'navigationTitle',
      label: 'Navigation Section Title',
      type: 'text',
      required: true,
      defaultValue: 'Perusahaan'
    },
    {
      name: 'navigationLinks',
      label: 'Navigation Links',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'label',
          label: 'Link Label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'Link URL',
          type: 'text',
          required: true,
        }
      ],
      defaultValue: [
        { label: 'Beranda', href: '/' },
        { label: 'Tentang', href: '/about' },
        { label: 'Portofolio', href: '/portfolio' },
        { label: 'Contact', href: '/contact' }
      ]
    },

    // Contact Information Section
    {
      name: 'contactTitle',
      label: 'Contact Section Title',
      type: 'text',
      required: true,
      defaultValue: 'Contact Us'
    },
    {
      name: 'address',
      label: 'Company Address',
      type: 'textarea',
      required: true,
      defaultValue: 'No.10 Blok A3, Ruko Dewe Square\nJl. Raya, Bedrek, Siwalanpanji,\nKec. Buduran, Kabupaten Sidoarjo,\nJawa Timur 61252, Indonesia'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      required: true,
      defaultValue: '021-22212552'
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: false,
    },

    // Google Maps Section
    {
      name: 'mapsEmbedUrl',
      label: 'Google Maps Embed URL',
      type: 'textarea',
      required: true,
      defaultValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2291804495444!2d112.72694777603003!3d-7.439875473307659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e700258d7d87%3A0xc6079ab1e6e22364!2sPT%20DIGITAL%20MAHADATA%20PRIMA%20(CABANG)!5e0!3m2!1sid!2sid!4v1769160832621!5m2!1sid!2sid'
    },

    // Social Media Links (Optional)
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      required: false,
      maxRows: 5,
      fields: [
        {
          name: 'platform',
          label: 'Social Media Platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' }
          ]
        },
        {
          name: 'url',
          label: 'Social Media URL',
          type: 'text',
          required: true,
        }
      ]
    },

    // Display Settings
    {
      name: 'showLogo',
      label: 'Show Large Background Logo',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'logoOpacity',
      label: 'Logo Opacity (0-100)',
      type: 'number',
      min: 0,
      max: 100,
      defaultValue: 20,
      admin: {
        condition: (data) => data.showLogo === true
      }
    }
  ],
  timestamps: true,
}
