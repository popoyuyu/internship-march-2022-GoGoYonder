import type { FC } from "react"

import { Link, json, useLoaderData, LoaderFunction } from "remix"
import { Params } from "react-router-dom"
import invariant from "tiny-invariant"
import type { Trip, Attendee, User } from "@prisma/client"
import { getAttendeesByUserId } from "~/models/attendee.server"
import { getTripById } from "~/models/trip.server"
import { requireUserId } from "~/session.server"
import { join } from "~/utils"
import { TripLiContainer, TripLiImage, TripLiTitle, TripLiFlex, TripLiDetail, TripLiGroup } from "../../styles/styledComponents"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>;

const getLoaderData = async (request: Request, params: Params<string>) => {
  const userId = await requireUserId(request)
  invariant(userId, `userId required`)
  const attendees = await getAttendeesByUserId(userId)
  const pending = attendees.filter(trip => trip.isAccepted === null)
  const accepted = attendees.filter(trip => trip.isAccepted !== null)
  const pendingArray = await Promise.all(
    pending.map(async (attendee) => (
      await getTripById(attendee.tripId)
    )))
  const acceptedArray = await Promise.all(
    accepted.map(async (attendee) => (
      await getTripById(attendee.tripId)
    )))

  return {
    trips: {
      accepted: acceptedArray,
      pending: pendingArray
    }
  }
}

export const loader: LoaderFunction = async ({
  request,
  params
}) => {

  return json<LoaderData>(await getLoaderData(request, params))
}

const Index: FC = () => {
  const data = useLoaderData<LoaderData>()

  const linkStyles = [
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
  ]
  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Pending Trips
      </h1>
      <ul>
        {data.trips.pending.map((trip) => (
          <TripLiContainer>
            <TripLiImage src="https://images.unsplash.com/photo-1541570213932-8cd806e3f8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJvYWQlMjB0cmlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" />
            <TripLiTitle>{trip?.stops[0] ? trip?.stops[0] : "Start"} to {trip?.stops[-1] ? trip?.stops[-1] : "End"}</TripLiTitle>
            <hr />
            <TripLiFlex>
              <TripLiGroup>Starts</TripLiGroup>
              <TripLiGroup>Ends</TripLiGroup>
              <TripLiGroup>Stops</TripLiGroup>
            </TripLiFlex>
            <TripLiFlex>
              <TripLiDetail>{trip?.startDate}</TripLiDetail>
              <TripLiDetail>{trip?.endDate}</TripLiDetail>
              <TripLiDetail>{trip?.stops.length}</TripLiDetail>
            </TripLiFlex>
          </TripLiContainer>
        ))}
      </ul>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>
        Accepted Trips
      </h1>
      <ul>
        {data.trips.accepted.map((trip) => (
          <TripLiContainer>
            <TripLiImage src="https://images.unsplash.com/photo-1541570213932-8cd806e3f8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHJvYWQlMjB0cmlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" />
            <TripLiTitle>{trip?.stops[0]} to {trip?.stops[-1]}</TripLiTitle>
            <hr />
            <TripLiFlex>
              <TripLiGroup>Starts</TripLiGroup>
              <TripLiGroup>Ends</TripLiGroup>
              <TripLiGroup>Stops</TripLiGroup>
            </TripLiFlex>
            <TripLiFlex>
              <TripLiDetail>{trip?.startDate}</TripLiDetail>
              <TripLiDetail>{trip?.endDate}</TripLiDetail>
              <TripLiDetail>{trip?.stops.length}</TripLiDetail>
            </TripLiFlex>
          </TripLiContainer>
        ))}
      </ul>
      <Link
        to="/trips/new/"
        className={join(...linkStyles)}
      >
        Create Trip
      </Link>
      <Link
        to="/trips/trip-id-goes-here"
        className={join(...linkStyles)}
      >
        Example Trip
      </Link>
    </div>
  )
}

export default Index