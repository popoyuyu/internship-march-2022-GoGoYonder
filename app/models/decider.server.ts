/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Decider, User, Trip, Prisma } from "@prisma/client"

import { prisma } from "../db.server"

export type { Decider } from "@prisma/client"

export async function createDecider(decider: Pick<Decider, `tripId`>) {
  return prisma.decider.create({ data: decider })
}

export async function getDeciderByTripId(tripId: Trip[`id`]) {
  return prisma.decider.findFirst({ where: { tripId: tripId } })
}

export async function updateDeciderByDeciderId(
  id: Decider[`id`],
  result: Decider[`result`],
) {
  return prisma.decider.update({
    where: {
      id,
    },
    data: {
      result,
    },
  })
}
