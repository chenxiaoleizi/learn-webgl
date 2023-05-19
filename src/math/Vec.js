
export class Vec3 {
  constructor(x, y, z) {

    this.x = 0
    this.y = 0
    this.z = 0

  }

  static add(a, b) {

    const x = a.x + b.x
    const y = a.y + b.y
    const z = a.z + b.z

    return new Vec3(x, y, z)
  }
  static sub(a, b) {

    const x = a.x - b.x
    const y = a.y - b.y
    const z = a.z - b.z

    return new Vec3(x, y, z)
  }
  static dot(a, b) {
    return a.x*b.x + a.y*b.y + a.z*b.z
  }
  static cross() {

    const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		const x = ay * bz - az * by;
		const y = az * bx - ax * bz;
		const z = ax * by - ay * bx;

    return new Vec3(x, y, z)
  }
}