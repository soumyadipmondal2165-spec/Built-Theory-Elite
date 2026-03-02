export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "types-of-foundation",
    title: "Types of Foundation: A Comprehensive Guide",
    author: "Abhash Acharya",
    category: "Geo",
    date: "March 2, 2026",
    excerpt: "Foundation is that part of the structure that connects and transmits the load from the structure to the ground soil...",
    content: `
      <h2>What is Foundation?</h2>
      <p>Foundation (aka footing) is defined as that part of the structure that connects and transmits the load from the structure to the ground soil. The solid ground on which the foundation rests is termed as the foundation bed.</p>
      
      <h3>Classification of Foundation</h3>
      <p>Foundations are generally classified into two sub-categories:</p>
      <ul>
        <li><strong>Shallow Foundation:</strong> Depth is less than width (D < B).</li>
        <li><strong>Deep Foundation:</strong> Depth is greater than width (D > B).</li>
      </ul>

      <h2>Shallow Foundation Types</h2>
      <p>Shallow foundations transmit the load of the super structure laterally into the ground.</p>
      <ul>
        <li><strong>Wall Footing:</strong> Runs continuous along the direction of the wall.</li>
        <li><strong>Isolated Column Footing:</strong> Suitable for depths greater than 1.5m where the base of the column is enlarged.</li>
        <li><strong>Mat (Raft) Foundation:</strong> Covers the entire area beneath a structure to support all walls and columns.</li>
      </ul>
    `
  },
  // Add more articles here by copying the block above!
];
