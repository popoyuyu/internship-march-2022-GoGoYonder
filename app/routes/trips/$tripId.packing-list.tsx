import type { FC } from "react"

import { Link, json, useLoaderData } from "remix"
import type { LoaderFunction } from "remix"

import type { Item, Attendee, User, Trip } from "@prisma/client"
import type { Params } from "react-router"
import invariant from "tiny-invariant"

import { getAttendeesByTripId } from "~/models/attendee.server"
import { join } from "~/utils"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (params: Params<string>) => {
  const { tripId } = params
  invariant(tripId, `need tripId`)
  // const items = await getItemsByAttendee(userId, tripId)

  return await json(getAttendeesByTripId(tripId))
}

export const loader: LoaderFunction = async ({ params }) => {
  return json(await getLoaderData(params))
}

const PackingList: FC = () => {
  const data = useLoaderData<LoaderData>()
  console.log(data)
  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Packing List
      </h1>
      <ul>
        {data.items.map((item: Item) => (
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
        to="/trips/${tripId}`/packing-list/new"
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
