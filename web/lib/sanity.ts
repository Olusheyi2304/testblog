import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "8bw95kis",
  dataset: "production",
  apiVersion: "2024-04-23",
  useCdn: false, // Set to false for real-time updates
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
