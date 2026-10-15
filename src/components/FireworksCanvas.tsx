import React, { useEffect, useRef, useCallback } from 'react';
import { soundFx } from '../utils/audio';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
  drag: number;
  flicker: boolean;
  trail: { x: number; y: number }[];
  isWillow?: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  shellType: string;
  trail: { x: number; y: number }[];
}

interface FireworksCanvasProps {
  interactive?: boolean;
  activeShellColor?: string;
  activeShellType?: string;
  ambientMode?: boolean;
  isLightMode?: boolean;
  onExplode?: (x: number, y: number, color: string) => void;
  className?: string;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  interactive = true,
  activeShellColor = '#d97706',
  activeShellType = 'kamuro',
  ambientMode = false,
  isLightMode = true,
  onExplode,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastAutoLaunchRef = useRef<number>(Date.now());

  // Function to create burst particles based on shell type
  const createExplosion = useCallback((x: number, y: number, color: string, shellType: string) => {
    const isKamuro = shellType === 'kamuro';
    const isCrackle = shellType === 'crackle';
    const isFountain = shellType === 'fountain';
    const isStage = shellType === 'stage';

    const particleCount = isStage ? 65 : isKamuro ? 135 : 100;

    // Trigger audio based on type
    if (isStage) {
      soundFx.playFountain();
    } else {
      soundFx.playBoom(isKamuro ? 1.1 : 0.9);
      if (isKamuro || isCrackle) {
        soundFx.playCrackle();
      }
    }

    if (onExplode) {
      onExplode(x, y, color);
    }

    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() * 0.16 - 0.08);
      let speed = Math.random() * 5.5 + 2;

      if (isKamuro) {
        speed = Math.random() * 4.8 + 1.8;
      } else if (isFountain) {
        const spreadAngle = -Math.PI / 2 + (Math.random() * 0.7 - 0.35);
        const fSpeed = Math.random() * 6 + 3.5;
        newParticles.push({
          x,
          y,
          vx: Math.cos(spreadAngle) * fSpeed,
          vy: Math.sin(spreadAngle) * fSpeed,
          alpha: 1,
          color,
          size: Math.random() * 2.8 + 1.4,
          decay: Math.random() * 0.015 + 0.01,
          gravity: 0.11,
          drag: 0.97,
          flicker: Math.random() > 0.3,
          trail: [],
        });
        continue;
      }

      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      newParticles.push({
        x,
        y,
        vx,
        vy,
        alpha: 1,
        color,
        size: isKamuro ? Math.random() * 2.6 + 1.4 : Math.random() * 3.0 + 1.6,
        decay: isKamuro ? Math.random() * 0.007 + 0.004 : Math.random() * 0.018 + 0.012,
        gravity: isKamuro ? 0.048 : 0.075,
        drag: isKamuro ? 0.985 : 0.965,
        flicker: Math.random() > 0.25,
        trail: [],
        isWillow: isKamuro,
      });
    }

    // Add bright flash center core
    for (let c = 0; c < 16; c++) {
      const cAngle = Math.random() * Math.PI * 2;
      const cSpeed = Math.random() * 2.5 + 0.8;
      newParticles.push({
        x,
        y,
        vx: Math.cos(cAngle) * cSpeed,
        vy: Math.sin(cAngle) * cSpeed,
        alpha: 1,
        color: isLightMode ? '#ea580c' : '#ffffff',
        size: 2.8,
        decay: 0.038,
        gravity: 0.03,
        drag: 0.92,
        flicker: true,
        trail: [],
      });
    }

    particlesRef.current.push(...newParticles);
  }, [onExplode, isLightMode]);

  // Launch a rocket to target
  const launchRocket = useCallback((targetX: number, targetY: number, color?: string, type?: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    soundFx.playLift();

    const startX = targetX + (Math.random() * 60 - 30);
    const startY = canvas.height;
    const distanceY = startY - targetY;
    const flightTime = Math.max(30, Math.min(65, distanceY / 14));
    const vy = -(distanceY / flightTime);
    const vx = (targetX - startX) / flightTime;

    rocketsRef.current.push({
      x: startX,
      y: startY,
      targetY,
      vx,
      vy,
      color: color || activeShellColor,
      size: 3.5,
      shellType: type || activeShellType,
      trail: [],
    });
  }, [activeShellColor, activeShellType]);

  // Canvas click handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    launchRocket(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth * dpr : window.innerWidth * dpr;
      canvas.height = canvas.parentElement ? canvas.parentElement.clientHeight * dpr : window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation Loop
    const loop = () => {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // Motion trail fade color based on theme
      if (isLightMode) {
        ctx.fillStyle = ambientMode ? 'rgba(250, 248, 245, 0.25)' : 'rgba(255, 255, 255, 0.28)';
      } else {
        ctx.fillStyle = ambientMode ? 'rgba(7, 7, 9, 0.22)' : 'rgba(7, 7, 9, 0.25)';
      }
      ctx.fillRect(0, 0, width, height);

      // Ambient auto launcher if in ambient mode
      if (ambientMode) {
        const now = Date.now();
        if (now - lastAutoLaunchRef.current > 2400) {
          lastAutoLaunchRef.current = now;
          const targetX = Math.random() * (width * 0.75) + width * 0.12;
          const targetY = Math.random() * (height * 0.42) + height * 0.08;
          const colors = isLightMode
            ? ['#d97706', '#dc2626', '#b45309', '#ea580c', '#0284c7', '#9333ea']
            : ['#d4af37', '#e11d48', '#06b6d4', '#f59e0b', '#facc15'];
          const chosenColor = colors[Math.floor(Math.random() * colors.length)];
          launchRocket(targetX, targetY, chosenColor, Math.random() > 0.4 ? 'kamuro' : 'aerial');
        }
      }

      // Update and draw Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        r.x += r.vx;
        r.y += r.vy;

        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        for (let t = r.trail.length - 1; t >= 0; t--) {
          ctx.lineTo(r.trail[t].x, r.trail[t].y);
        }
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = isLightMode ? '#ea580c' : '#ffffff';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (r.y <= r.targetY || r.vy >= 0) {
          createExplosion(r.x, r.y, r.color, r.shellType);
          rocketsRef.current.splice(i, 1);
        }
      }

      // Update and draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.isWillow) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 5) p.trail.shift();
        }

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);

        if (p.isWillow && p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          for (let t = p.trail.length - 1; t >= 0; t--) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.size;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.flicker && Math.random() > 0.4 ? p.size * 1.3 : p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [ambientMode, createExplosion, launchRocket, isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className={`w-full h-full block ${interactive ? 'cursor-crosshair' : 'pointer-events-none'} ${className}`}
    />
  );
};
