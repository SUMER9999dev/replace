# 💞 Replace

Helping library implements simpler way working with roblox vectors & cframes

pronounced as re-place

# ⚙️ Credits
sumer_real

# 📦 Install

``npm install @rbxts/replace``

# 🍴 Cookbook

smooth cyclic rotation

```ts
const ROTATION_ANGLE_PER_SECOND = 30
const target = Workspace.WaitForChild("ObjectToRotate") as BasePart;

RunService.Heartbeat.Connect((delta) => {
	target.CFrame = replace(target.CFrame)
		.rotateY(ROTATION_ANGLE_PER_SECOND * delta)
		.toCFrame();
});
```

simple pet system

```ts
const pet = Workspace.WaitForChild("Pet") as BasePart;
const player = Players.LocalPlayer;

RunService.Heartbeat.Connect((delta) => {
	if (!player.Character) return;
	if (!player.Character.PrimaryPart) return;

	pet.CFrame = replace(player.Character.GetPivot())
		.backward(4)
		.inverseLerp(pet.CFrame, delta / 0.075)
		.toCFrame();
});
```

# 📚 Documentation

To start using this library, we need to study all types of operations, there are 4 of them

## 📐 absolute

These operations are independent of related cframe

- ``position(x, y, z)`` updates position
- ``angle(xDeg, yDeg, zDeg, xRad?, yRad?, zRad?)`` updates angle
- ``lerp(target: CFrame, alpha)`` lerps replace to target by alpha
- ``inverseLerp(from: CFrame, alpha)`` lerps target to replace by alpha


## 🧷 relative

operations of this type depend entirely on related cframe

- ``move(x, y, z)`` moves position by value considering the angle
- ``rotate(xDeg, yDeg, zDeg, xRad?, yRad?, zRad?)`` rotates angle considering current angle
- ``forward(value)`` moves position forward
- ``backward(value)`` moves position backward
- ``left(value)`` moves position left
- ``right(value)`` moves position right
- ``up(value)`` moves position up
- ``down(value)`` moves position down
- ``rotateX(deg, rad?)`` rotates x by math.rad(deg) + rad
- ``rotateY(deg, rad?)`` rotates y by math.rad(deg) + rad
- ``rotateZ(deg, rad?)`` rotates z by math.rad(deg) + rad

## ⚖️ switch

allows you to change the logic of relativity

- ``world()`` converts current position & angle to world space
- ``relative(to: CFrame)`` Replace will assume that position and angle in ``to`` space
- ``asRelative(to: CFrame)`` will convert position & angle from world to ``to`` space

## ✉️ finaliters

operations of this type allow you to convert replace back to roblox formats

the main purpose of this library is to simplify CFrame, not Vector3, so it is more difficult to work with them.

- ``toCFrame()`` will convert to CFrame, recommended finaliter
- ``toVector3()`` will convert to Vector3 be careful, it doesn't take into account the angle, only relative operations related to move are taken into account
- ``toRotatedVector3()`` will convert to Vector3, but this operation takes into account angle, be careful don't use move related operations before this operation
