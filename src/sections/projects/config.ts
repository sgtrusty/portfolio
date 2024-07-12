import { Project } from '@/types/project';

const projects: Project[] = [
  {
    name: 'Portfolio',
    slug: 'portfolio',
    description:
      'A personal portfolio to showcase your coding projects, resume, and skills in a beautifully designed format.',
    thumbnail: '/images/projects/portfolio/cover.jpg'
  },
  {
    name: 'User Dashboard',
    slug: 'user_dashboard',
    description:
      'A web app used to track user conversion rates with modern UI elements and libraries.',
    thumbnail: '/images/projects/user_dashboard/cover.jpg'
  },
  {
    name: 'Eco-friendly Marketplace',
    slug: 'eco_marketplace',
    description:
      'An e-commerce platform dedicated to eco-friendly products where users can buy, sell, and learn about sustainable living.',
    thumbnail: '/images/projects/eco_marketplace/cover.jpg'
  },
  {
    name: 'LLM Model Training',
    slug: 'coding_tutorials',
    description:
      'Conducted research regarding large language model training and best practices regarding scalable AI adaptation for advanced use cases.',
    thumbnail: '/images/projects/coding_tutorials/cover.jpg'
  }
];

export { projects };
