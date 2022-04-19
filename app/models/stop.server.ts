import { prisma } from "../db.server"

import type { Stop, Trip } from "@prisma/client"

export type { Stop }

export async function getStopsByTripId(tripId: Trip[`id`]): Promise<Stop[]> {
  return prisma.stop.findMany({ where: { trip: {} } })
}
