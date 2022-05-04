import type { FC } from "react"

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { MapInputField } from "~/styles/styledComponents"
import { join } from "~/utils"
type LocateType = {
  panTo: ({ lat, lng }: google.maps.LatLng) => void
}
const PlacesSearch: FC<LocateType> = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng(45.5152, 122.6784),
      radius: 200 * 1000,
    },
  })

  return (
    <div className={join(`w-full`)}>
      <Combobox
        className={join(`w-full`)}
        onSelect={async (address) => {
          setValue(address, false)
          clearSuggestions()

          try {
            const results = await getGeocode({ address })
            const pos = await getLatLng(results[0])
            const latlng = new google.maps.LatLng(pos.lat, pos.lng)
            panTo(latlng)
          } catch (error) {
            console.log(error)
          }
        }}
      >
        <MapInputField
          className={join(
            `w-full`,
            `rounded`,
            `z-10`,
            `w-full`,
            `h-full`,
            `bg-black`,
            `text-white`,
            `pl-6`,
            `bg-[url("data:image/svg+xml,%3Csvg width='16' height='15' viewBox='0 0 16 15' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.05465 12.5555C10.5651 12.5555 13.4109 9.96875 13.4109 6.77777C13.4109 3.5868 10.5651 1 7.05465 1C3.54417 1 0.698364 3.5868 0.698364 6.77777C0.698364 9.96875 3.54417 12.5555 7.05465 12.5555Z' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.0001 14L11.5438 10.8583' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")]`,
          )}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === `OK` &&
              data.map(({ description }, index) => (
                <ComboboxOption key={index} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

export default PlacesSearch
