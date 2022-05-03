import type { FC } from "react"
import { useEffect } from "react"

import type { ActionFunction, LoaderFunction } from "remix"
import {
  redirect,
  Form,
  Link,
  json,
  useLoaderData,
  useParams,
  useActionData,
  useSubmit,
} from "remix"

import { Decider, Attendee, Trip } from "@prisma/client"
import type { Params } from "react-router"
import invariant from "tiny-invariant"

import { getAttendeeNames } from "~/models/attendee.server"
import {
  getDeciderByTripId,
  updateDeciderByDeciderId,
} from "~/models/decider.server"
import { getTripById } from "~/models/trip.server"
import {
  RoundedRectangle,
  WideButton,
  Avatar,
  TitleText,
  CostDescription,
  DeciderDescription,
} from "~/styles/styledComponents"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import { join } from "~/utils"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (params: Params<string>) => {
  invariant(params.tripId, `trips required`)
  const decider = await getDeciderByTripId(params.tripId)
  return decider
}
export const loader: LoaderFunction = async ({ params }) => {
  return json<LoaderData>(await getLoaderData(params))
}

type decider =
  | {
      winnerAvatarUrl: string | null
      winner: string | null
    }
  | undefined

export const action: ActionFunction = async ({ request, params }) => {
  invariant(params.tripId, `trips required`)
  const { tripId } = params
  const trip = await getTripById(tripId)
  invariant(trip, `must have a trip`)
  const attendees = await getAttendeeNames(params.tripId)
  invariant(attendees, `need attendees`)
  const attendeeArray = attendees.map((attendee) => attendee.user)
  const winner = attendeeArray[Math.floor(Math.random() * attendeeArray.length)]
  invariant(winner, `winner is not defined`)

  const decider = await updateDeciderByDeciderId(
    trip.deciderId,
    winner.userName,
    winner.avatarUrl,
  )

  return redirect(`/trips/${tripId}/decider/`)
}

const Decider: FC = () => {
  const data = useLoaderData<LoaderData>()
  const date = data?.updatedAt ? new Date(data?.updatedAt) : new Date(0)
  const day = date?.toLocaleDateString()
  const time = date?.toLocaleTimeString()

  const { tripId } = useParams()

  const defaultAvatar = `public/img/default-avatar.jpg`
  const rectangleStyles = [`flex`, `mx-2`]
  const avatarDivStyles = [`ml-2`, `flex`]
  const titleDivStyles = [`ml-4`, `text-left`, `flex-1`]

  return (
    <div>
      <div>
        <Link to={`/trips/${tripId}`}>
          <div className={join(`ml-8`)}>
            <SvgBackButton />
          </div>
        </Link>
      </div>
      <DeciderDescription>
        <p>
          The Decider will select a traveler in this trip at random to choose the
          next activity.
        </p>
      </DeciderDescription>
      <RoundedRectangle className={join(...rectangleStyles)}>
        <div className={join(...avatarDivStyles)}>
          <Avatar src={data?.winnerAvatarUrl || defaultAvatar} />
        </div>
        <div className={join(...titleDivStyles)}>
          <TitleText>{data?.winner}</TitleText>
          <CostDescription>
            {day}
            {time}
          </CostDescription>
        </div>
      </RoundedRectangle>

      <div>
        <Form method="post">
          <WideButton type="submit">Select Random</WideButton>
        </Form>
      </div>
    </div>
  )
}

export default Decider
