export const blogSchema = {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Exam & Certification Prep', value: 'exam-certification-prep' },
          { title: 'Career Development', value: 'career-development' },
          { title: 'Study Tips', value: 'study-tips' },
          { title: 'Technology', value: 'technology' },
          { title: 'General', value: 'general' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'introduction',
      title: 'Blog Introduction',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'header',
              title: 'Header',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'body',
              title: 'Body',
              type: 'text',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'featuredImage',
              title: 'Featured Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
      },
      initialValue: 'draft',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
      status: 'status',
    },
  },
};
