# Aelion | Sonic Architect

## 1. Project Overview
**Aelion | Sonic Architect** is a premium, design-driven digital experience crafted for the modern multifaceted musician. It transcends the traditional portfolio by blending high-end aesthetics with generative AI and interactive 3D environments. Built for artists who bridge the gap between organic composition and digital synthesis, this platform serves as both a professional discography and an experimental creative laboratory.

## 2. Key Features
- **3D Particle Hero Area**: An immersive, interactive 3D background built with Three.js featuring Fibonacci-distributed particle systems and wave-based physics.
- **AI Muse (Le Laboratoire)**: A specialized creative agent powered by the **DeepSeek API** that translates user-provided moods into sonic concepts, including technical synth settings, instrumentations, and visual color gradients.
- **Interactive Discography**: A custom-built audio engine with real-time playback, vinyl rotation animations, and dynamic equalizers.
- **Parallax Visual Gallery**: A high-contrast "Visual Frequencies" gallery utilizing horizontal parallax scrolling and grayscale-to-color transitions.
- **Modern Design Language**: Implementation of glassmorphism, golden accents, and premium typography (Cormorant Garamond & Manrope) for a high-end agency look.

## 3. Tech Stack
### Frontend
- **React 19** & **TypeScript**
- **Vite** (Build Tooling)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Orchestrated Animations)
- **Three.js** (WebGL/3D Rendering)

### AI / APIs
- **DeepSeek API** (Generative AI for sonic conceptualization)
- **Lucide React** (Iconography)

### Hosting / Tools
- **Node.js**
- **Vercel** (Recommended for deployment)

## 4. Architecture
The application follows a component-based architecture with a centralized AI service layer:

- **Services Layer**: `geminiService.ts` (now optimized for DeepSeek) handles asynchronous API calls, error dampening, and persona-driven prompting.
- **Component Layer**: Modular React components for each section (Hero, About, SonicLab, etc.), utilizing Framer Motion for scroll-linked animations.
- **Environment Management**: Vite-powered environment variable injection ensures secure API communication.

## 5. Installation & Setup
### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Local Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/aelion-sonic-architect.git
   cd aelion-sonic-architect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your DeepSeek API key:
   ```env
   DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 6. Usage
Once the server is running, navigate to `http://localhost:3000`.

- **Scroll** through the site to experience current-linked 3D distortions.
- **Interact** with the "Sonic Lab" by entering prompts like *"Ethereal dawn in a crystal cave"* to see the AI generate a complete musical concept.
- **Play** tracks in the recordings section to see the vinyl visualizer in action.

## 7. Deployment
The project is optimized for deployment on **Vercel** or **Netlify**.

### Deploying to Vercel
1. Push your code to a GitHub repository.
2. Connect the repo to Vercel.
3. Add your `DEEPSEEK_API_KEY` in the Vercel "Environment Variables" settings.
4. Deploy.

## 8. Screenshots / Demo
| Hero Section | AI Muse Lab | Discography |
| :---: | :---: | :---: |
| ![Hero Placeholder](https://via.placeholder.com/300x200?text=3D+Particle+Hero) | ![Lab Placeholder](https://via.placeholder.com/300x200?text=AI+Muse+Concept) | ![Audio Placeholder](https://via.placeholder.com/300x200?text=Interactive+Audio) |

*Live Demo: [https://aelion-sonic-architect.vercel.app](https://aelion-sonic-architect.vercel.app)*

## 9. Roadmap
- [ ] Integration of Web Audio API for real-time frequency data visualization.
- [ ] Multi-language support (English/French/German).
- [ ] Mobile-first performance optimization for low-end devices.
- [ ] Exportable AI concept cards for sharing on social platforms.

## 10. Contributing
Contributions are welcome to further bridge acoustics and aesthetics.
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 11. License
Distributed under the MIT License. See `LICENSE` for more information.

---
Created by [Your Name/Brand] — *Bridging the organic and the synthetic.*
