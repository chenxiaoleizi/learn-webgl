import { Vec3 } from "./Vec.js"
export class Matrix {
  elements = []
  constructor() {
    this.elements = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
  }

  set(elements) {
    this.elements = elements
  }

  setPosition(x, y, z) {
    const elements = this.elements

    elements[12] = x
    elements[13] = y
    elements[14] = z
  }

  setRotateX(angle) {
    const elements = this.elements

    elements[5] = Math.cos(angle)
    elements[6] = Math.sin(angle)
    elements[9] = -Math.sin(angle)
    elements[10] = Math.cos(angle)
  }

  setRotateY(angle) {
    const elements = this.elements

    elements[0] = Math.cos(angle)
    elements[2] = -Math.sin(angle)
    elements[8] = Math.sin(angle)
    elements[10] = Math.cos(angle)
  }

  setRotateZ(angle) {
    const elements = this.elements

    elements[0] = Math.cos(angle)
    elements[1] = Math.sin(angle)
    elements[4] = -Math.sin(angle)
    elements[5] = Math.cos(angle)
  }

  setScale(x, y, z) {
    const elements = this.elements

    elements[0] = x
    elements[5] = y
    elements[10] = z
  }

  setView(position, up, lookAt) {
    const g = Vec3.sub(lookAt, position).normalize()
    const r = Vec3.cross(g, up).normalize()
    const t = Vec3.cross(r, g).normalize()

    const elements = this.elements

    elements[0] = r.x, elements[4] = r.y, elements[8] = r.z, elements[12] = -Vec3.dot(r, position)
    elements[1] = t.x, elements[5] = t.y, elements[9] = t.z, elements[13] = -Vec3.dot(t, position)
    elements[2] = -g.x, elements[6] = -g.y, elements[10] = -g.z, elements[14] = Vec3.dot(g, position)
  }

  setOrthographic(left, right, top, bottom, near, far) {
    const elements = this.elements

    const a1 = right - left
    const b1 = top - bottom
    const c1 = far - near

    const a2 = right + left
    const b2 = top + bottom
    const c2 = far + near

    elements[0] = 2 / a1
    elements[2] = 2 / b1
    elements[10] = 2 / c1

    elements[13] = - a2 / a1
    elements[14] = - b2 / b1
    elements[15] = - c2 / c1
  }

  multiply(m) {
    const a = this.elements
    const b = m.elements

    const a11 = a[0], a12 = a[4], a13 = a[8], a14 = a[12]
    const a21 = a[1], a22 = a[5], a23 = a[9], a24 = a[13]
    const a31 = a[2], a32 = a[6], a33 = a[10], a34 = a[14]
    const a41 = a[3], a42 = a[7], a43 = a[11], a44 = a[15]

    const b11 = b[0], b12 = b[4], b13 = b[8], b14 = b[12]
    const b21 = b[1], b22 = b[5], b23 = b[9], b24 = b[13]
    const b31 = b[2], b32 = b[6], b33 = b[10], b34 = b[14]
    const b41 = b[3], b42 = b[7], b43 = b[11], b44 = b[15]

    a[0] = a11*b11 + a12*b21 + a13*b31 + a14*b41
    a[4] = a11*b12 + a12*b22 + a13*b32 + a14*b42
    a[8] = a11*b13 + a12*b23 + a13*b33 + a14*b43
    a[12] = a11*b14 + a12*b24 + a13*b34 + a14*b44

    a[1] = a21*b11 + a22*b21 + a23*b31 + a24*b41
    a[5] = a21*b12 + a22*b22 + a23*b32 + a24*b42
    a[9] = a21*b13 + a22*b23 + a23*b33 + a24*b43
    a[13] = a21*b14 + a22*b24 + a23*b34 + a24*b44

    a[2] = a31*b11 + a32*b21 + a33*b31 + a34*b41
    a[6] = a31*b12 + a32*b22 + a33*b32 + a34*b42
    a[10] = a31*b13 + a32*b23 + a33*b33 + a34*b43
    a[14] = a31*b14 + a32*b24 + a33*b34 + a34*b44

    a[3] = a41*b11 + a42*b21 + a43*b31 + a44*b41
    a[7] = a41*b12 + a42*b22 + a43*b32 + a44*b42
    a[11] = a41*b13 + a42*b23 + a43*b33 + a44*b43
    a[15] = a41*b14 + a42*b24 + a43*b34 + a44*b44
  }
}