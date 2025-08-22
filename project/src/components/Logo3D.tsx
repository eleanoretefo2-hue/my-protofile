import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Logo3DProps {
	className?: string;
}

const Logo3D: React.FC<Logo3DProps> = ({ className = '' }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rafRef = useRef<number | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		camera.position.set(0, 0.3, 4.2);

		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		// Lights
		const ambient = new THREE.AmbientLight(0x7fb2ff, 0.6);
		const key = new THREE.DirectionalLight(0x8ab4ff, 0.8);
		key.position.set(3, 4, 5);
		const rim = new THREE.DirectionalLight(0x1e3a8a, 0.6);
		rim.position.set(-4, 2, -3);
		scene.add(ambient, key, rim);

		// Material (blue neon)
		const material = new THREE.MeshStandardMaterial({
			color: new THREE.Color(0x3b82f6),
			emissive: new THREE.Color(0x1e40af),
			emissiveIntensity: 0.6,
			metalness: 0.35,
			roughness: 0.25,
		});

		// Helper to make a box mesh
		const makeBox = (w: number, h: number, d: number) => new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material.clone());

		// Build 'M' using boxes
		const groupM = new THREE.Group();
		const pillarW = 0.22, pillarH = 1.2, depth = 0.25;
		const leftPillar = makeBox(pillarW, pillarH, depth);
		leftPillar.position.set(-1.1, 0, 0);
		const rightPillar = makeBox(pillarW, pillarH, depth);
		rightPillar.position.set(-0.2, 0, 0);
		const diagLeft = makeBox(0.22, 1.0, depth);
		diagLeft.rotation.z = Math.PI * 0.26;
		diagLeft.position.set(-0.82, -0.05, 0);
		const diagRight = makeBox(0.22, 1.0, depth);
		diagRight.rotation.z = -Math.PI * 0.26;
		diagRight.position.set(-0.48, -0.05, 0);
		groupM.add(leftPillar, rightPillar, diagLeft, diagRight);

		// Build 'A' using boxes
		const groupA = new THREE.Group();
		const legH = 1.2;
		const legLeft = makeBox(0.22, legH, depth);
		legLeft.rotation.z = Math.PI * 0.11;
		legLeft.position.set(0.45, -0.02, 0);
		const legRight = makeBox(0.22, legH, depth);
		legRight.rotation.z = -Math.PI * 0.11;
		legRight.position.set(1.1, -0.02, 0);
		const cross = makeBox(0.65, 0.18, depth);
		cross.position.set(0.78, -0.1, 0);
		groupA.add(legLeft, legRight, cross);

		// Combine letters
		const logo = new THREE.Group();
		logo.add(groupM, groupA);
		// Center logo roughly
		logo.position.set(0.05, 0.0, 0);
		scene.add(logo);

		// Halo sprite behind logo for glow
		const glowTex = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAA1JREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=');
		const haloMat = new THREE.SpriteMaterial({ map: glowTex, color: 0x93c5fd, transparent: true, opacity: 0.28, depthWrite: false, blending: THREE.AdditiveBlending });
		const halo = new THREE.Sprite(haloMat);
		halo.scale.set(3.6, 2.0, 1);
		halo.position.set(0, 0, -0.6);
		scene.add(halo);

		// Resize
		const fit = () => {
			const w = container.clientWidth;
			const h = container.clientHeight;
			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
		};
		fit();

		// Animate
		let t = 0;
		const animate = () => {
			t += 0.016;
			logo.rotation.y = Math.sin(t * 0.6) * 0.18;
			logo.rotation.x = Math.sin(t * 0.4) * 0.06;
			// pulse emissive
			(logo.children as THREE.Object3D[]).forEach(group => {
				(group as THREE.Group).children.forEach(child => {
					const mesh = child as THREE.Mesh;
					const m = mesh.material as THREE.MeshStandardMaterial;
					m.emissiveIntensity = 0.5 + 0.3 * (0.5 + 0.5 * Math.sin(t * 1.8 + mesh.uuid.length));
				});
			});
			renderer.render(scene, camera);
			rafRef.current = requestAnimationFrame(animate);
		};
		animate();

		const onResize = () => fit();
		window.addEventListener('resize', onResize);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			window.removeEventListener('resize', onResize);
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);

	return (
		<div ref={containerRef} className={`relative w-full h-full ${className}`} aria-label="MA 3D logo" />
	);
};

export default Logo3D;

