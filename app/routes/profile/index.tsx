import type { FC } from "react"

import type { LoaderFunction } from "remix"
import { json, useLoaderData } from "remix"

import type { Trip } from "@prisma/client"
import { User } from "@prisma/client"

import getTrips from "~/models/trip.server"
import { getUserById } from "~/models/user.server"
import { requireUserId } from "~/session.server"
import {
  Header,
  SubHeader,
  ProHugeNumber,
  ProH4,
  ProBody,
} from "~/styles/styledComponents"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import SvgGear from "~/styles/SVGR/SvgGear"
import { join } from "~/utils"

import NavBar from "../navbar"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

// const getLoaderData = async (request: Request) => {
//   const userId = await requireUserId(request)
//   console.log(userId)
//   const user = await getUserById(userId)
//   return { user: user }
// }

const getLoaderData = async (request: Request) => {
  const userId = await requireUserId(request)
  // console.log(userId)
  const user = await getUserById(userId)
  // console.log(user)
  return { user: user }
}

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>(await getLoaderData(request))
}

const Index: FC = () => {
  const data = useLoaderData<LoaderData>()
  console.log(data)
  const trips = data?.user?.trips
  console.log(trips)
  return (
    <>
      <div className={join(`ml-8`)}>
        <SvgBackButton />
      </div>
      <Header>Your Account</Header>
      <span className={join(`flex`, `m-8`)}>
        <SvgGear />
      </span>
      <div className={join(`text-center`)}>
        <ProHugeNumber>{trips.length}</ProHugeNumber>
        <ProH4>Total Trips</ProH4>
        <ProBody>Member Since {data.user?.createdAt}</ProBody>
      </div>
      <div>
        <SubHeader>Recent Trips</SubHeader>
      </div>
      <ul>
        {trips.map((trip: Trip) => (
          <div key={trip.id}>
            <ProH4>{trip.nickName}</ProH4>
            <ProBody>
              {trip.startDate} {trip.startDate !== null ? `–` : ``}
              {` `}
              {trip.endDate}
            </ProBody>
            <ProBody>Trip Creator: {trip.ownerId}</ProBody>
          </div>
        ))}
        <li></li>
      </ul>
      <NavBar />
    </>
  )
}

export default Index
