import { type MotionValue } from "motion/react";
import { useSyncExternalStore } from "react";

function useMotionValueState(motionValue: MotionValue): number {
	return useSyncExternalStore(
		(callback) => {
			const unsub = motionValue.on("change", callback);
			return unsub;
		},
		() => motionValue.get(),
		() => motionValue.get(),
	);
}

export { useMotionValueState };
