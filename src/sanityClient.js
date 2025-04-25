import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "by2bvrrp", // Replace with your actual project ID
  dataset: "production",
  useCdn: true,
});
