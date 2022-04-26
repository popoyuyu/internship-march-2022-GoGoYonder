import type { FC } from "react"
import { useState, useEffect } from "react"

import type { LoaderFunction } from "remix"
import { Link, useLoaderData, json, redirect } from "remix"

import { Navigator } from "node-navigator"
import type { Params } from "react-router-dom"
import { Position } from "vitest"

import { join } from "~/utils"

import NavBar from "./navbar"

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position: GeolocationPosition) => {
//       const pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent("Location found.");
//       infoWindow.open(map);
//       map.setCenter(pos);
//     },
//     () => {
//       handleLocationError(true, infoWindow, map.getCenter()!);
//     }
//   );
// } else {
//   // Browser doesn't support Geolocation
//   handleLocationError(false, infoWindow, map.getCenter()!);
// }
// });

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (request: Request, params: Params<string>) => {
  // console.log(process.env)
  const apiKey = process.env.MAP_API
  // console.log(apiKey)
  return {
    apiKey: apiKey,
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  return json<LoaderData>(await getLoaderData(request, params))
}
const Map: FC = () => {
  const [position, setPosition] = useState({
    lat: 45.523064,
    lng: -122.676483,
  })
  const data = useLoaderData<LoaderData>()
  const navigator = new Navigator()

  // V Things in this function arent getting called V
  const havePosition = (position: any) => {
    setPosition({
      lat: position.latitude,
      lng: position.longitude,
    })
    console.log(`position changed`)
    console.log(position)
  }
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(havePosition)
      console.log(`Grabbing Location`)
    } else {
      console.log(`Location Not Available`)
    }
  }
  useEffect(() => {
    getLocation()
  }, [navigator.geolocation])

  // console.log(data.apiKey)
  const url = `https://www.google.com/maps/embed/v1/view?zoom=10&center=${position.lat}%2C${position.lng}&key=${data.apiKey}`
  // console.log(url)
  return (
    <div>
      <h1 className={join(`flex`, `items-center`, `justify-center`)}>Map</h1>
      <Link
        to="/trips/trip-id-goes-here/"
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
      <iframe width="600" height="450" loading="lazy" src={url}></iframe>
      <NavBar />
    </div>
  )
}

export default Map
