import {test, expect} from "vitest"

import { Vec3 } from "src/math/Vec"


test("Add vector", () => {
  const vec1 = new Vec3(1, 1, 0)
  const vec2 = new Vec3(-1, 1, 0)

  const vec3 = new Vec3(0, 2, 0)

  expect(Vec3.add(vec1, vec2)).toEqual(vec3)
})

test("Subtract vector", () => {
  const vec1 = new Vec3(1, 1, 0)
  const vec2 = new Vec3(-1, 1, 0)

  const vec3 = new Vec3(2, 0, 0)
  expect(Vec3.sub(vec1, vec2)).toEqual(vec3)
})
