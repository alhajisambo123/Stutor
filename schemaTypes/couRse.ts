import { defineField } from "sanity";

const courseTypes = [
  { title: "Humanities", value: "Humanities" },
  { title: "Engineering", value: "Engineering" },
  { title: "Basic/Applied", value: "Basic/Applied" },
  { title: "All", value: "All" },

  { title: "Health", value: "Health" },
];

const couRse = {
  name: "couRse",
  title: "Cou Rse",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("Maximum 50 Characters"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "discount",
      title: "Discount",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            { name: "file", type: "file", title: "File" },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(3).error("Minimum of 3 images required"),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "object",
      fields: [
        { name: "url", type: "url", title: "URL" },
        { name: "file", type: "file", title: "File" },
      ],
      validation: (Rule) => Rule.required().error("Cover Image is required"),
    }),
    defineField({
      name: "type",
      title: "Course Type",
      type: "string",
      options: {
        list: courseTypes,
      },
      validation: (Rule) => Rule.required(),
      initialValue: "basic",
    }),
    
    defineField({
      name: "mysession",
      title: "Mysession",
      type: "text",
    }),
    
    defineField({
      name: "experience",
      title: "Experience",
      type: "text",
    }),
   
    defineField({
      name: "isFeatured",
      title: "Is Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "review" }],
    }),
  ],
};

export default couRse;
