import React from "react"
import type { FC } from "react"

import type { LinksFunction, LoaderFunction } from "remix"
import { useLoaderData, json } from "remix"

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import type { Params } from "react-router"
import invariant from "tiny-invariant"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import PlacesSearch from "~/components/PlacesSearch"
import mapStyles from "~/styles/mapStyles"
import { join } from "~/utils"

import NavBar from "./navbar"

const libraries: (
  | `drawing`
  | `geometry`
  | `localContext`
  | `places`
  | `visualization`
)[] = [`places`]
const mapContainerStyle = {
  width: `100vw`,
  height: `100vh`,
}
const center = {
  lat: 45.5152,
  lng: -122.6784,
}
// These need to be decided on as a team
const options = {
  styles: mapStyles,
  //This disables ALL base Ui, we can add back in individually what we want
  // disableDefaultUI: true,
  // zoomControl: true,
}
/* CONTROLS OPTIONS
  panControl: true,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  overviewMapControl: true,
  rotateControl: true
*/
type LocateType = {
  panTo: ({ lat, lng }: google.maps.LatLng) => void
}
type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (request: Request, params: Params<string>) => {
  const apiKey = process.env.MAP_API
  return {
    apiKey: apiKey,
  }
}
export const links: LinksFunction = () => {
  return [
    {
      rel: `stylesheet`,
      href: `@reach/combobox/styles.css`,
    },
  ]
}
export const loader: LoaderFunction = async ({ request, params }) => {
  return json<LoaderData>(await getLoaderData(request, params))
}

const Map: FC = () => {
  const data = useLoaderData()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: data.apiKey,
    libraries: libraries,
  })
  const [markers, setMarkers] = React.useState([])
  const mapRef: React.MutableRefObject<google.maps.Map | null> =
    React.useRef(null)
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map
  }, [])
  const panTo = React.useCallback((position: google.maps.LatLng) => {
    if (mapRef.current !== null) {
      mapRef.current.panTo(position)
      mapRef.current.setZoom(10)
    }
  }, [])

  if (loadError) return <h1>`Error loading maps`</h1>
  if (!isLoaded) return <h1>`Loading Maps`</h1>
  return (
    <div>
      <div className={join(`absolute`, `top-5`, `right-0`, `z-10`)}>
        <Locate panTo={panTo} />
      </div>
      <div
        className={join(
          `absolute`,
          `left-1/2`,
          `-translate-x-2/4`,
          `z-10`,
          `w-60`,
        )}
      >
        <PlacesSearch panTo={panTo} />
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      />
      <NavBar />
    </div>
  )
}

const Locate: FC<LocateType> = ({ panTo }) => {
  return (
    <button
      onClick={() =>
        navigator?.geolocation.getCurrentPosition((position) => {
          const pos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          )
          panTo(pos)
        })
      }
    >
      PAN TO MY LOCATION
    </button>
  )
}
export default Map
