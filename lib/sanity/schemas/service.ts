import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      rows: 6,
      description: 'Brief description of the service',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 8,
      description: 'Detailed description of the service',
    }),
    defineField({
      name: 'whatsIncluded',
      title: "What's Included",
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'serviceImages',
      title: 'Service Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'packages',
      title: 'Service Packages',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'package' } }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      media: 'serviceImages.0',
    },
    prepare(selection) {
      const { title, status } = selection;
      return {
        ...selection,
        subtitle: status ? `Status: ${status}` : 'No status',
      };
    },
  },
});
