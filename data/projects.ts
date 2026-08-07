import type { Project } from "@/types";

export const PROJECTS: readonly Project[] = [
	{
		id: "mediverse",
		name: "MediVerse",
		tagline: "Blockchain medical records that travel with the patient",
		description:
			"A blockchain-based platform for storing patient medical records so hospitals can share them without duplication. Records live on-chain for integrity, while access management stays in the patient's hands.",
		year: "2024",
		highlights: [
			"Seamless record transfer between hospitals, removing duplicate intake paperwork.",
			"Solidity smart contracts guarantee record integrity and a tamper-evident audit trail.",
			"Patient-facing access management so consent is explicit rather than assumed.",
		],
		stack: ["Next.js", "React", "Node.js", "Solidity", "CSS"],
		links: {
			live: "https://mediverse-dyiscoverers.vercel.app/",
			docs: "https://drive.google.com/file/d/1qg0xOnIrg08JPtOPzaFapj6TCQnTtHmL/view?usp=drive_link",
		},
	},
	{
		id: "killer-sudoku",
		name: "Killer Sudoku Solver",
		tagline: "Solving Killer Sudoku with the Power of Linear Programming",
		description:
			"Developed a 4×4 and 9×9 Killer Sudoku Solver that models the puzzle as a Binary Integer Linear Programming (BILP) problem. The application translates Sudoku rules and Killer Sudoku cage constraints into linear equations, enabling an optimization solver to efficiently compute valid solutions. The project demonstrates how mathematical optimization techniques can solve complex combinatorial problems with accuracy and speed.",
		year: "2024",
		highlights: [
			"Solves both 4×4 and 9×9 Killer Sudoku puzzles.",
			// "Formulates Sudoku constraints using Binary Integer Linear Programming (BILP).",
			"Efficiently computes solutions while satisfying row, column, block, and cage-sum constraints.",
			// "Produces accurate solutions through mathematical optimization rather than brute-force search.",
			// "Includes a user-friendly interface for solving and interacting with puzzles.",
			"Demonstrates the practical application of Linear Programming in combinatorial optimization and algorithm design.",
		],
		stack: ["Python", "PyGame", "NumPy", "Pandas", "Pulp"],
		preview: {
			src: "/projects/killer-sudoku.png",
			width: 1278,
			height: 745,
			alt: "The Killer Sudoku Solver title screen, listing menu entries for 9×9 puzzles, 4×4 puzzles, controls and quit.",
		},
		links: {
			source: "https://github.com/J1nWo0/Killer-Sudoku-Solver-For-9x9_4x4",
			docs: "https://drive.google.com/file/d/1a9_7yfo9c_dDXkCr3ng2BOaiv8kYsBvY/view?usp=drive_link",
		},
	},
	{
		id: "boxedin",
		name: "BoxedIn",
		tagline: "Real-Time People Detection and Counting with YOLOv8",
		description:
			"Developed BoxedIn, a computer vision application that detects and counts people in video streams using YOLOv8 and PyTorch. The system processes video input to identify individuals with bounding boxes, track entry and exit points, and generate accurate people counts. Built with a PyQt5 desktop interface, the project demonstrates the practical application of deep learning for surveillance, occupancy monitoring, and crowd analytics.",
		year: "2023",
		highlights: [
			"Built a real-time people detection and counting system using YOLOv8.",
			"Detects people in video streams with bounding box localization.",
			"Tracks entrance and exit points to count people entering and leaving a defined area.",
		],
		stack: [
			"Python",
			"YOLOv8",
			"PyTorch",
			"PyQt5",
			"Roboflow",
			"Computer Vision",
			"Object Detection",
			"Deep Learning",
		],
		links: {
			source: "https://github.com/J1nWo0/Person-Counting-Detection",
			docs: "https://drive.google.com/file/d/1txHyfHL1yqRxww0mPy1Oh8jH-MSKAlf4/view?usp=drive_link",
		},
	},
] as const;
