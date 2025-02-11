export function formatCFrame(cframe: CFrame) {
	const [x, y, z] = cframe.ToEulerAnglesXYZ();
	return `CFrame(Position = [${cframe.X}, ${cframe.Y}, ${cframe.Z}], Angle = [${math.deg(x)}, ${math.deg(y)}, ${math.deg(z)}])`;
}
