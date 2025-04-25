import { defineType, defineField } from "sanity";

export default defineType({
  name: "car",
  title: "Cars",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Car Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price per Day",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Car Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
