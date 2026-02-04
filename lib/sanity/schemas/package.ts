import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'package',
  title: 'Service Package',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'NGN (₦)', value: 'NGN' },
          { title: 'GBP (£)', value: 'GBP' },
          { title: 'EUR (€)', value: 'EUR' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'packageType',
      title: 'Package Type',
      type: 'string',
      options: {
        list: [
          { title: 'Basic', value: 'basic' },
          { title: 'Standard', value: 'standard' },
          { title: 'Premium', value: 'premium' },
        ],
      },
      initialValue: 'basic',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'features',
      title: 'Features/Inclusions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'string',
              description: 'e.g., "2 sessions", "Unlimited", etc.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Package Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'popular',
      title: 'Popular Package',
      type: 'boolean',
      initialValue: false,
      description: 'Mark this package as popular/recommended',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      currency: 'currency',
      packageType: 'packageType',
      media: 'image',
    },
    prepare(selection) {
      const { title, price, currency, packageType } = selection;
      return {
        ...selection,
        subtitle: `${currency} ${price} - ${packageType}`,
      };
    },
  },
});
