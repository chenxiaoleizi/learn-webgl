
export class Vec3 {
  constructor(x, y, z) {

    this.x = x
    this.y = y
    this.z = z

  }

  normalize() {
    const {x, y, z} = this

    const length = Math.sqrt(x*x + y*y + z*z)

    this.x = x / length
    this.y = y / length
    this.z = z / length

    return this
  }

  invert() {
    const {x, y, z} = this

    this.x = -x
    this.y = -y
    this.z = -z
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
  static cross(a, b) {

    const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		const x = ay * bz - az * by;
		const y = az * bx - ax * bz;
		const z = ax * by - ay * bx;

    return new Vec3(x, y, z)
  }
}