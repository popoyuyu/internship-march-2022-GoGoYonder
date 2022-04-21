/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Item } from "@prisma/client"

import { prisma } from "../db.server"
export type { Item }

export async function createItem(
  item: Pick<Item, `description` | `tripId` | `userId`>,
) {
  return prisma.item.create({ data: item })
}
