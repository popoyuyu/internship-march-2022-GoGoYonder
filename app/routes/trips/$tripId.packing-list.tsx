import type { FC } from "react"

import { Link, json, useLoaderData } from "remix"
import type { LoaderFunction } from "remix"

import type { Item, Attendee, User, Trip } from "@prisma/client"

import { getItemsByAttendee } from "~/models/item.server"
import { join } from "~/utils"

import { prisma } from "../../db.server"

type LoaderData = { items: Array<Item> }

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    items: await prisma.item.findMany(),
  }
  return json(data)
}

const PackingList: FC = () => {
  const data = useLoaderData<LoaderData>()
  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Packing List
      </h1>
      <ul>
        {data.items.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
      <Link
        to="/trips/trip-id-goes-here"
        className={join(
          `flex`,
          `items-center`,
          `justify-center`,
          `rounded-md`,
          `border`,
          `border-transparent`,
          `bg-white`,
          `px-4`,
          `py-3`,
          `text-base`,
          `font-medium`,
          `text-yellow-700`,
          `shadow-sm`,
          `hover:bg-yellow-50`,
          `sm:px-8`,
        )}
      >
        Return to trip dashboard
      </Link>
      <Link
        to="/trips/trip-id-goes-here/packing-list/new"
        className={join(
          `flex`,
          `items-center`,
          `justify-center`,
          `rounded-md`,
          `border`,
          `border-transparent`,
          `bg-white`,
          `px-4`,
          `py-3`,
          `text-base`,
          `font-medium`,
          `text-yellow-700`,
          `shadow-sm`,
          `hover:bg-yellow-50`,
          `sm:px-8`,
        )}
      >
        Add Item
      </Link>
      <Link
        to="/profile"
        className={join(
          `flex`,
          `items-center`,
          `justify-center`,
          `rounded-md`,
          `border`,
          `border-transparent`,
          `bg-white`,
          `px-4`,
          `py-3`,
          `text-base`,
          `font-medium`,
          `text-yellow-700`,
          `shadow-sm`,
          `hover:bg-yellow-50`,
          `sm:px-8`,
        )}
      >
        Return to profile
      </Link>
    </div>
  )
}

export default PackingList
