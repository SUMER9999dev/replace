/// <reference types="@rbxts/testez/globals" />

import { Replace } from "../replace";

export = function () {
	const roundVector = (vector: Vector3) =>
		new Vector3(math.round(vector.X), math.round(vector.Y), math.round(vector.Z));

	it("constructor", () => {
		const exactPosition = new Replace(new Vector3(1, 2, 3)).toVector3();
		expect(exactPosition).to.equal(new Vector3(1, 2, 3));

		const rotatedPosition = new Replace(
			new CFrame(1, 2, 3).mul(CFrame.fromEulerAnglesXYZ(0, math.rad(180), 0)),
		).toRotatedVector3();

		expect(roundVector(rotatedPosition)).to.equal(new Vector3(-1, 2, -3));
	});

	it("move", () => {
		const result = new Replace(new Vector3(2, 3, 4)).move(1, 2, 3).toVector3();
		expect(result).to.equal(new Vector3(3, 5, 7));
	});

	it("forward", () => {
		const result = new Replace(CFrame.Angles(0, math.pi, 0)).forward(1).toVector3();
		expect(roundVector(result)).to.equal(new Vector3(0, 0, 1));
	});

	it("position", () => {
		const result = new Replace(new Vector3(2, 3, 4)).move(1, 2, 3).toVector3();
		expect(result).to.equal(new Vector3(3, 5, 7));
	});

	it("rotate", () => {
		const result = new Replace(new Vector3(0, 0, 1)).rotateY(180).toRotatedVector3();
		expect(roundVector(result)).to.equal(new Vector3(0, 0, -1));
	});

	it("asRelative", () => {
		const result = new Replace(new Vector3(3, 4, 5)).asRelative(new CFrame(1, 2, 3)).toVector3();
		expect(result).to.equal(new Vector3(2, 2, 2));
	});

	it("relative & world position", () => {
		const result = new Replace(new Vector3(1, 2, 3))
			.relative(new CFrame(40, 40, 40))
			.world()
			.toVector3();

		expect(result).to.equal(new Vector3(41, 42, 43));
	});

	it("relative & world angle", () => {
		const result = new Replace(new Vector3(0, 0, 1))
			.relative(CFrame.Angles(0, math.pi, 0))
			.world()
			.toVector3();

		expect(roundVector(result)).to.equal(new Vector3(0, 0, -1));
	});
};
