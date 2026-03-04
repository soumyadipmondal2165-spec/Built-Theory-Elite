export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
  id: "types-of-foundation-complete-guide",
  title: "Types of Foundation: A Comprehensive Engineering Guide",
  category: "Geotechnical",
  date: "March 2, 2026",
  image: "https://built-theory.com/images/foundation-main.jpg", 
  excerpt: "Foundation is that part of the structure that connects and transmits the load from the structure to the ground soil. Explore shallow and deep foundation classifications.",
  content: `
    <p>Before moving into types of foundation, let’s learn what is foundation or footing. Most of the structure consist of two parts, one above the ground which is known as super structure and the other sub-structure of the foundation which lies below the ground level.</p>

    <p>Foundation (aka footing) is defined as that part of the structure that connects and transmits the load from the structure to the ground soil. The solid ground on which the foundation rests is termed as the foundation bed. The foundation transmits the load of the structure and it’s self-weight to the soil such that the ultimate bearing capacity of the soil is not exceeded and the settlement is tolerable.</p>

    

    <h2>Objectives and Purposes of Foundation</h2>
    <p>Every structure is provided with a foundation at the base to fulfill the following objectives and purposes:</p>
    <ul>
      <li>To distribute the load of the structure over a large bearing area.</li>
      <li>To load the bearing surface at a uniform rate so as to avoid unequal settlement.</li>
      <li>To prevent the lateral movement of the supporting material.</li>
      <li>To increase the stability of the structure as a whole.</li>
    </ul>

    <h2>Classification of Foundations</h2>
    <p>Foundations are classified on the basis of load transmission into two sub-categories: <strong>Shallow Foundation</strong> and <strong>Deep Foundation</strong>.</p>

    <h3>1. Shallow Foundation ($D < B$)</h3>
    <p>Shallow foundation are those in which the depth (D) at which the foundation is placed is less than the width of the foundation (D < B). Shallow foundations are generally termed as spread footing as they transmit the load of the super structure laterally into the ground.</p>

    [Image showing types of shallow foundations like wall footing and isolated footing]

    <h4>Types of Shallow Foundation:</h4>
    <ul>
      <li><strong>Wall Footing:</strong> Runs continuous along the direction of the wall; economical in dense sands and gravels.</li>
      <li><strong>Isolated Column Footing:</strong> Suitable for depths greater than 1.5m where the base of the column is enlarged.</li>
      <li><strong>Combined Footing:</strong> Made common for two or more columns in a row.</li>
      <li><strong>Strap (Cantilever) Footing:</strong> Edge footing linked with an interior footing by a strap beam.</li>
      <li><strong>Mat (Raft) Foundation:</strong> Covers the entire area beneath a structure; used when bearing pressure is low or the structure is heavy.</li>
    </ul>

    <h3>2. Deep Foundation ($D > B$)</h3>
    <p>Deep foundations have a depth greater than their width, with a $D/B$ ratio usually around 4–5. Unlike shallow foundation, the deep foundation transmits the load of the superstructure vertically to the rock strata lying deep.</p>

    

    <h4>Types of Deep Foundation:</h4>
    <ul>
      <li><strong>Pile Foundation:</strong> Slender members that transfer load by friction or bearing. Used when granular soils need compaction.</li>
      <li><strong>Pier Foundation:</strong> Underground cylindrical structural members that support heavier loads than shallow foundations.</li>
      <li><strong>Well (Caissons) Foundation:</strong> Hollow structures constructed at the site and sunk into place; used for bridge piers and abutments.</li>
    </ul>

    <h2>Factors Affecting Foundation Selection</h2>
    <p>The selection depends on ground conditions and building loads:</p>
    <ul>
      <li><strong>Soil Condition:</strong> Shallow foundations for stable ground close to surface; deep foundations for filled-up ground or weak layers.</li>
      <li><strong>Building Loads:</strong> Shallow foundations for low-rise buildings; deep foundations for high-rise structures with high load intensity.</li>
    </ul>
  `
}
