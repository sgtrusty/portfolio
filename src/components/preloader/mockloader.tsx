// components/MockLoader.js
// This is a Server Component

export default async function MockLoader() {
  // Simulate a 3-second network delay to see the loading state
  // This operation happens on the server
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return;
}