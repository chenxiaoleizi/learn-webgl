import {test, expect} from "vitest"

import { Vec3 } from "src/math/Vec"

test("Normalize vector", () => {
  const vec1 = new Vec3(4, 0, 0)
  const vec2 = new Vec3(1, 0, 0)

  expect(vec1.normalize()).toEqual(vec2)
})

test("Add vector", () => {
  const vec1 = new Vec3(2, 0, 0)
  const vec2 = new Vec3(1, 1, 0)

  const vec3 = new Vec3(3, 1, 0)

  expect(Vec3.add(vec1, vec2)).toEqual(vec3)
})

test("Subtract vector", () => {
  const vec1 = new Vec3(2, 0, 0)
  const vec2 = new Vec3(1, 1, 0)

  const vec3 = new Vec3(1, -1, 0)
  expect(Vec3.sub(vec1, vec2)).toEqual(vec3)
})

test("Dot vector", () => {
  const vec1 = new Vec3(2, 0, 0)
  const vec2 = new Vec3(1, 1, 0)

  expect(Vec3.dot(vec1, vec2)).toEqual(2)
})

test("Cross vector", () => {
  const vec1 = new Vec3(2, 0, 0)
  const vec2 = new Vec3(1, 1, 0)

  const vec3 = new Vec3(1, -1, 0)
  expect(Vec3.dot(vec1, vec2)).toEqual(2)
})