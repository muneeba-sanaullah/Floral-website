Project Name: bloom&blossom
A responsive, high-performance E-commerce UI for a premium flower boutique. This project showcases modern frontend development practices, focusing on smooth user interactions, mobile-first design, and clean component architecture.

Live Demo

[Link]

🛠 Tech Stack
Frontend: React.js

Styling: Tailwind CSS (Mobile-first, responsive design)

Routing: React Router

Icons/Assets: Unsplash API / Custom Assets

Deployment: [Vercel / Netlify]

Key Features
Custom Carousel Engine: Built from scratch with useRef and useEffect to manage infinite looping, auto-play, and drag-to-scroll gestures without heavy external dependencies.

Responsive Category Browsing: A touch-friendly, snap-scroll horizontal layout for categories, optimized for seamless navigation on mobile devices.

Component-Based Architecture: Modular design with reusable UI components for Banners, Categories, and Product sections.

Interactive UX: Fluid animations using custom cubic-bezier transitions, backdrop-blur effects, and consistent hover-state feedback.

Technical Challenges & Solutions

The "Infinite" Scroll: Managing the carousel state without using external libraries required implementing a cloning logic (cloning the first and last slides) to ensure smooth infinite transitions.

Touch Optimization: Solving the "sticky" feel of mobile scrolling by implementing snap-x and snap-mandatory CSS properties combined with manual drag-event listeners for a native app-like experience.

State Synchronization: Handling navigation and scroll visibility (showLeft/showRight arrow states) using requestAnimationFrame to ensure performance and prevent re-render flickers.

Markdown
![Project Preview](link-to-your-screenshot.png)
Getting Started
Clone the repository:

Bash
git clone https://github.com/yourusername/your-repo-name.git
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Contact
Portfolio:

LinkedIn: [Link to your LinkedIn]

Email: [Your email address]
