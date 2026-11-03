"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** CSS pixels between field samples; smaller is smoother but costs more per frame. */
const CELL = 22;
/** Noise units per CSS pixel; sets how wide the hills and valleys are. */
const SCALE = 1 / 360;
/** Noise units the field drifts per second. */
const SPEED = 0.035;
const LEVELS = 8;
const LINE_ALPHA = 0.1;
const FRAME_MS = 1000 / 30;

/**
 * Contour segments per marching-squares case, as pairs of cell edges
 * (0 top, 1 right, 2 bottom, 3 left). Corner bits: top-left 8, top-right 4,
 * bottom-right 2, bottom-left 1.
 */
const SEGMENTS: readonly (readonly number[])[] = [
	[],
	[3, 2],
	[2, 1],
	[3, 1],
	[0, 1],
	[3, 0, 2, 1],
	[0, 2],
	[3, 0],
	[3, 0],
	[0, 2],
	[0, 1, 3, 2],
	[0, 1],
	[3, 1],
	[2, 1],
	[3, 2],
	[],
];

const GRAD3 = [
	[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
	[1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
	[0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1],
] as const;

/** Seeded 3D simplex noise in roughly [-1, 1]. */
function createNoise3D(seed: number) {
	const p = new Uint8Array(256);
	for (let i = 0; i < 256; i++) p[i] = i;
	let state = seed;
	const rand = () => {
		state = (state * 16807) % 2147483647;
		return state / 2147483647;
	};
	for (let i = 255; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[p[i], p[j]] = [p[j], p[i]];
	}
	const perm = new Uint8Array(512);
	for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

	const F3 = 1 / 3;
	const G3 = 1 / 6;

	const corner = (gi: number, x: number, y: number, z: number) => {
		let t = 0.6 - x * x - y * y - z * z;
		if (t < 0) return 0;
		t *= t;
		const g = GRAD3[gi % 12];
		return t * t * (g[0] * x + g[1] * y + g[2] * z);
	};

	return (x: number, y: number, z: number) => {
		const s = (x + y + z) * F3;
		const i = Math.floor(x + s);
		const j = Math.floor(y + s);
		const k = Math.floor(z + s);
		const t = (i + j + k) * G3;
		const x0 = x - (i - t);
		const y0 = y - (j - t);
		const z0 = z - (k - t);

		let i1: number, j1: number, k1: number, i2: number, j2: number, k2: number;
		if (x0 >= y0) {
			if (y0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 1, 0];
			else if (x0 >= z0) [i1, j1, k1, i2, j2, k2] = [1, 0, 0, 1, 0, 1];
			else [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 1, 0, 1];
		} else if (y0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 0, 1, 0, 1, 1];
		else if (x0 < z0) [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 0, 1, 1];
		else [i1, j1, k1, i2, j2, k2] = [0, 1, 0, 1, 1, 0];

		const ii = i & 255;
		const jj = j & 255;
		const kk = k & 255;

		return (
			32 *
			(corner(perm[ii + perm[jj + perm[kk]]], x0, y0, z0) +
				corner(
					perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]],
					x0 - i1 + G3,
					y0 - j1 + G3,
					z0 - k1 + G3,
				) +
				corner(
					perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]],
					x0 - i2 + 2 * G3,
					y0 - j2 + 2 * G3,
					z0 - k2 + 2 * G3,
				) +
				corner(
					perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]],
					x0 - 1 + 3 * G3,
					y0 - 1 + 3 * G3,
					z0 - 1 + 3 * G3,
				))
		);
	};
}

/**
 * Slowly morphing topographic lines, traced with marching squares over
 * animated noise. Colors come from the theme tokens and follow theme changes;
 * the loop pauses off screen and in hidden tabs, and reduced motion gets a
 * single still frame.
 */
export function HeroContours({ className }: { className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const noise = createNoise3D(20_250_811);
		const root = document.documentElement;
		const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

		let width = 0;
		let height = 0;
		let cols = 0;
		let rows = 0;
		let field = new Float32Array(0);
		let lineColor = "";
		let time = 0;
		let frame = 0;
		let last = 0;
		let onScreen = true;

		const readColors = () => {
			lineColor =
				getComputedStyle(root).getPropertyValue("--foreground").trim() || "#888";
		};

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			cols = Math.ceil(width / CELL) + 1;
			rows = Math.ceil(height / CELL) + 1;
			field = new Float32Array((cols + 1) * (rows + 1));
		};

		const sample = () => {
			const stride = cols + 1;
			for (let y = 0; y <= rows; y++) {
				for (let x = 0; x <= cols; x++) {
					const nx = x * CELL * SCALE;
					const ny = y * CELL * SCALE;
					const value =
						noise(nx, ny, time) + 0.12 * noise(nx * 2.1, ny * 2.1, time * 1.4 + 9);
					field[y * stride + x] = value / 1.12;
				}
			}
		};

		const draw = () => {
			sample();
			ctx.clearRect(0, 0, width, height);
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			ctx.strokeStyle = lineColor;
			ctx.globalAlpha = LINE_ALPHA;
			ctx.lineWidth = 1;

			const stride = cols + 1;

			for (let level = 0; level < LEVELS; level++) {
				const threshold = -0.8 + (1.6 * level) / (LEVELS - 1);
				ctx.beginPath();
				for (let y = 0; y < rows; y++) {
					for (let x = 0; x < cols; x++) {
						const a = field[y * stride + x];
						const b = field[y * stride + x + 1];
						const c = field[(y + 1) * stride + x + 1];
						const d = field[(y + 1) * stride + x];
						const index =
							(a > threshold ? 8 : 0) |
							(b > threshold ? 4 : 0) |
							(c > threshold ? 2 : 0) |
							(d > threshold ? 1 : 0);
						const segments = SEGMENTS[index];
						if (segments.length === 0) continue;

						const x0 = x * CELL;
						const y0 = y * CELL;

						const point = (edge: number): [number, number] => {
							switch (edge) {
								case 0:
									return [x0 + (CELL * (threshold - a)) / (b - a), y0];
								case 1:
									return [x0 + CELL, y0 + (CELL * (threshold - b)) / (c - b)];
								case 2:
									return [x0 + (CELL * (threshold - d)) / (c - d), y0 + CELL];
								default:
									return [x0, y0 + (CELL * (threshold - a)) / (d - a)];
							}
						};

						for (let s = 0; s < segments.length; s += 2) {
							const [fx, fy] = point(segments[s]);
							const [tx, ty] = point(segments[s + 1]);
							ctx.moveTo(fx, fy);
							ctx.lineTo(tx, ty);
						}
					}
				}

				ctx.stroke();
			}
			ctx.globalAlpha = 1;
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const elapsed = now - last;
			if (elapsed < FRAME_MS) return;
			// Clamp so a long stall resumes where it left off instead of jumping.
			time += (Math.min(elapsed, 100) / 1000) * SPEED;
			last = now;
			draw();
		};

		const shouldRun = () => onScreen && !document.hidden && !motion.matches;

		const sync = () => {
			cancelAnimationFrame(frame);
			frame = 0;
			if (shouldRun()) {
				last = performance.now();
				frame = requestAnimationFrame(tick);
			}
		};

		readColors();
		resize();
		draw();
		sync();

		const resizeObserver = new ResizeObserver(() => {
			resize();
			draw();
		});
		resizeObserver.observe(canvas);

		const intersection = new IntersectionObserver(([entry]) => {
			onScreen = entry.isIntersecting;
			sync();
		});
		intersection.observe(canvas);

		const themeObserver = new MutationObserver(() => {
			readColors();
			draw();
		});
		themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

		document.addEventListener("visibilitychange", sync);
		motion.addEventListener("change", sync);

		return () => {
			cancelAnimationFrame(frame);
			resizeObserver.disconnect();
			intersection.disconnect();
			themeObserver.disconnect();
			document.removeEventListener("visibilitychange", sync);
			motion.removeEventListener("change", sync);
		};
	}, []);

	return <canvas ref={canvasRef} aria-hidden className={cn("block", className)} />;
}
