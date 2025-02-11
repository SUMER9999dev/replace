import { Replace } from "./replace";

export function replace(base: CFrame | Vector3 | undefined = undefined) {
	return new Replace(base);
}

export { formatCFrame } from "./formatCFrame";
