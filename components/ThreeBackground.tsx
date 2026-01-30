import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3.5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Geometry - Create a sphere of particles
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3); // Store base positions for wave calculation

    for (let i = 0; i < count; i++) {
        // Fibonacci sphere distribution for even spread
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        
        const r = 1.6; // Radius
        
        const x = r * Math.cos(theta) * Math.sin(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
    const material = new THREE.PointsMaterial({
        color: 0xC4A968, // Gold-400
        size: 0.012,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
        mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
        const time = clock.getElapsedTime();
        requestAnimationFrame(animate);

        // Smooth mouse following
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Rotate the entire particle system slightly based on mouse
        particles.rotation.y = time * 0.1 + targetX;
        particles.rotation.x = targetY;

        // Animate individual particles (Wave effect)
        const posAttr = geometry.attributes.position;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const ox = originalPositions[ix];
            const oy = originalPositions[ix + 1];
            const oz = originalPositions[ix + 2];

            // Calculate wave based on position and time
            // Creates a "breathing" or "pulsing" distortion traveling across the sphere
            const distortion = Math.sin(ox * 2 + time * 1.5) * Math.cos(oy * 2 + time * 1.5) * 0.15;

            // Apply distortion along the normal (radially outward/inward)
            // Since it's a sphere at 0,0,0, normal is just normalized position. 
            // We can approximate direction by just adding to the original coordinates since they are relative to center.
            const scale = 1 + distortion;

            posArray[ix] = ox * scale;
            posArray[ix + 1] = oy * scale;
            posArray[ix + 2] = oz * scale;
        }

        posAttr.needsUpdate = true;

        // Gentle camera sway
        camera.position.x += (targetX * 2 - camera.position.x) * 0.02;
        camera.position.y += (-targetY * 2 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
        if (!mountRef.current) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" />;
};

export default ThreeBackground;