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

      <h4>Types of Shallow Foundation:</h4>
      <ul>
        <li><strong>Wall Footing:</strong> Runs continuous along the direction of the wall.</li>
        <li><strong>Isolated Column Footing:</strong> Suitable for depths greater than 1.5m where the base of the column is enlarged.</li>
        <li><strong>Combined Footing:</strong> Made common for two or more columns in a row.</li>
        <li><strong>Strap (Cantilever) Footing:</strong> Edge footing linked with an interior footing by a strap beam.</li>
        <li><strong>Mat (Raft) Foundation:</strong> Covers the entire area beneath a structure.</li>
      </ul>

      <h3>2. Deep Foundation ($D > B$)</h3>
      <p>Deep foundations have a depth greater than their width, with a $D/B$ ratio usually around 4–5. Unlike shallow foundation, the deep foundation transmits the load of the superstructure vertically to the rock strata lying deep.</p>

      <h4>Types of Deep Foundation:</h4>
      <ul>
        <li><strong>Pile Foundation:</strong> Slender members that transfer load by friction or bearing.</li>
        <li><strong>Pier Foundation:</strong> Underground cylindrical structural members that support heavier loads.</li>
        <li><strong>Well (Caissons) Foundation:</strong> Hollow structures constructured at the site and sunk into place.</li>
      </ul>
    `
},
{
  id: "self-healing-concrete-technology",
  title: "Self-Healing Concrete: The Future of Maintenance-Free Infrastructure",
  category: "Materials",
  date: "March 4, 2026",
  excerpt: "An investigation into bio-concrete systems using Bacillus bacteria to autonomously repair structural micro-cracks and extend building lifespans.",
  content: `
    <h2>Introduction</h2>
    <p>Concrete is the most widely used construction material globally, yet it is inherently prone to cracking due to thermal expansion, shrinkage, and mechanical loading. Traditional repair methods are costly and often ineffective for internal micro-cracks. Self-healing concrete represents a revolutionary shift, utilizing biological agents to repair damage without human intervention.</p>

    
    <h2>Mechanism of Bio-Healing</h2>
    <p>The technology involves embedding specialized bacteria, such as <strong>Bacillus pseudofirmus</strong>, into the concrete mix during the batching process. These bacteria remain dormant within the alkaline environment of the concrete until a crack appears.</p>
    
    <h3>The Healing Process</h3>
    <ul>
      <li><strong>Activation:</strong> Cracks allow moisture and oxygen to enter the concrete matrix.</li>
      <li><strong>Germination:</strong> Water activates the dormant bacterial spores.</li>
      <li><strong>Precipitation:</strong> The bacteria consume a nutrient source (calcium lactate) and produce calcium carbonate (limestone).</li>
      <li><strong>Sealing:</strong> The limestone fills the crack, restoring the material's impermeability.</li>
    </ul>

    <h2>Structural Benefits</h2>
    <p>Implementing self-healing systems provides three primary advantages for global infrastructure projects:</p>
    <ul>
      <li><strong>Durability:</strong> Prevents the ingress of chlorides and sulfates that cause steel reinforcement corrosion.</li>
      <li><strong>Cost Reduction:</strong> Minimizes the need for manual inspection and repair in hard-to-reach structures like bridges and tunnels.</li>
      <li><strong>Environmental Impact:</strong> Extends the service life of buildings, significantly reducing the carbon footprint associated with demolition and reconstruction.</li>
    </ul>

    <h2>Conclusion</h2>
    <p>While the initial cost of bio-concrete is higher than conventional mixes, the long-term savings in maintenance and the increased safety of the structure make it a vital technology for 2026 and beyond. As we scale production, self-healing concrete will become the standard for resilient, sustainable civil engineering.</p>
  `
},
{
  id: "smart-foundation-monitoring-2026",
  title: "Integrated Sensor Systems for Real-Time Foundation Health Monitoring",
  category: "Geotechnical",
  date: "March 1, 2026",
  excerpt: "An analysis of fiber-optic and piezo-resistive sensor integration in deep foundation elements for predictive settlement analysis.",
  content: `
    <p><strong>Abstract:</strong> Modern high-rise structures require precision monitoring of sub-surface elements. This article investigates the integration of smart sensors directly into foundation beds to mitigate risks of differential settlement.</p>

    <h2>1. Introduction:</h2>
    <p>The stability of a superstructure is entirely dependent on the integrity of its sub-structure. Traditional inspection methods are reactive; however, smart foundation systems allow for proactive structural health monitoring (SHM).</p>

    

    <h2>2. Methodology and Materials:</h2>
    <p>For the purpose of this study, three types of sensors were evaluated for their durability in high-alkaline concrete environments.</p>

    <h3>2.1. Sensor Classification:</h3>
    <ul>
      <li><strong>Fiber-Optic Brag Gratings (FBG):</strong> Used for high-precision strain measurement.</li>
      <li><strong>Piezo-resistive Sensors:</strong> Ideal for monitoring soil pressure variations.</li>
      <li><strong>Acoustic Emission Sensors:</strong> Utilized for detecting micro-crack propagation.</li>
    </ul>

    <h2>3. Performance Analysis:</h2>
    <p>The following table illustrates the sensitivity and error margins of the sensors under axial load testing:</p>

    <table>
      <thead>
        <tr>
          <th>Sensor Type</th>
          <th>Sensitivity (mV/V)</th>
          <th>Durability (Years)</th>
          <th>Max Error (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>FBG Fiber</td>
          <td>1.24</td>
          <td>50+</td>
          <td>0.02</td>
        </tr>
        <tr>
          <td>Piezo-resistive</td>
          <td>0.85</td>
          <td>15</td>
          <td>0.15</td>
        </tr>
      </tbody>
    </table>

    <h2>4. Conclusion:</h2>
    <p>The integration of smart sensors into the foundation bed ensures that structural loads are transmitted safely without exceeding the ultimate bearing capacity. While initial installation costs increase by 12%, long-term maintenance costs are reduced significantly.</p>

    <hr />
    <h2>5. References:</h2>
    <p>[1] International Journal of Geotechnical Engineering, Vol. 14, 2025.</p>
    <p>[2] Technical Guidelines for Structural Health Monitoring, 2026.</p>
  `
  }
]; //
