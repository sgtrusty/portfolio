'use client'
 
const EXTERNAL_DOMAIN = "https://ik.imagekit.io/sgtrusty/portfolio";

export default function myImageLoader({ src, width, quality }) {
  const prod = process.env.NODE_ENV == 'production';

  if (prod) {
    return `${EXTERNAL_DOMAIN}${src}?tr=w-${width},q-${quality ?? 75}`
  }

  return `${src}?w=${width}&q=${quality ?? 75}`
}