import { formatCFrame } from "formatCFrame";

export class Replace {
	private _position: Vector3;
	private _rotation: CFrame;

	private _relativeTo?: CFrame;

	constructor(base: Vector3 | CFrame | undefined = undefined, relativeTo: CFrame | undefined = undefined) {
		const baseNoUndefined = base ?? new Vector3(0, 0, 0);

		if (typeOf(baseNoUndefined) === "CFrame") {
			this._rotation = (baseNoUndefined as CFrame).Rotation;
			this._position = (baseNoUndefined as CFrame).Position;
		} else {
			this._position = baseNoUndefined as Vector3;
			this._rotation = new CFrame();
		}

		this._relativeTo = relativeTo;
	}

	public move(x: number, y: number, z: number) {
		const resultCFrame = this.toCFrame();
		const movedCFrame = resultCFrame.add(this._rotation.PointToObjectSpace(new Vector3(x, y, z)));

		return new Replace(movedCFrame, this._relativeTo);
	}

	public forward(value: number) {
		return this.move(0, 0, -value);
	}

	public backward(value: number) {
		return this.move(0, 0, value);
	}

	public right(value: number) {
		return this.move(value, 0, 0);
	}

	public left(value: number) {
		return this.move(-value, 0, 0);
	}

	public up(value: number) {
		return this.move(0, value, 0);
	}

	public down(value: number) {
		return this.move(0, -value, 0);
	}

	public position(x: number, y: number, z: number) {
		return new Replace(new CFrame(x, y, z).mul(this._rotation), this._relativeTo);
	}

	public rotate(xDeg: number, yDeg: number, zDeg: number, xRad: number = 0, yRad: number = 0, zRad: number = 0) {
		const resultCFrame = this.toCFrame();
		const rotatedCFrame = resultCFrame.mul(
			CFrame.fromEulerAnglesXYZ(math.rad(xDeg) + xRad, math.rad(yDeg) + yRad, math.rad(zDeg) + zRad),
		);

		return new Replace(rotatedCFrame, this._relativeTo);
	}

	public rotateX(deg: number, rad: number = 0) {
		return this.rotate(deg, 0, 0, rad, 0, 0);
	}

	public rotateY(deg: number, rad: number = 0) {
		return this.rotate(0, deg, 0, 0, rad, 0);
	}

	public rotateZ(deg: number, rad: number = 0) {
		return this.rotate(0, 0, deg, 0, 0, rad);
	}

	public angle(xDeg: number, yDeg: number, zDeg: number, xRad: number = 0, yRad: number = 0, zRad: number = 0) {
		return new Replace(
			new CFrame(this._position).mul(
				CFrame.fromEulerAnglesXYZ(math.rad(xDeg) + xRad, math.rad(yDeg) + yRad, math.rad(zDeg) + zRad),
			),

			this._relativeTo,
		);
	}

	public world() {
		if (this._relativeTo === undefined) {
			return this;
		}

		const worldCFrame = this._relativeTo.ToWorldSpace(this.toCFrame());
		return new Replace(worldCFrame);
	}

	public relative(to: CFrame) {
		return new Replace(this.toCFrame(), to);
	}

	public asRelative(to: CFrame) {
		const difference = to.ToObjectSpace(this.toCFrame());
		return new Replace(difference, to);
	}

	public lerp(target: CFrame, alpha: number) {
		return new Replace(this.toCFrame().Lerp(target, alpha), this._relativeTo);
	}

	public inverseLerp(from: CFrame, alpha: number) {
		return new Replace(from.Lerp(this.toCFrame(), alpha), this._relativeTo);
	}

	public toRotatedVector3() {
		return this._rotation.PointToWorldSpace(this._position);
	}

	public toVector3() {
		return this._position;
	}

	public toCFrame() {
		return new CFrame(this._position).mul(this._rotation);
	}
}
