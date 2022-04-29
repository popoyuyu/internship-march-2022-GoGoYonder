import type { FC } from "react"

import { Link, json, useLoaderData, Outlet, useFetcher } from "remix"

import type { Item } from "@prisma/client"
import { useSubmit, useTransition } from "@remix-run/react"

import {
  RoundedRectangle,
  WhiteRoundedRectangle,
  BottomLineDiv,
} from "~/styles/styledComponents"
import SvgCheckCircle from "~/styles/SVGR/SvgCheckCircle"
import { join } from "~/utils"

import ReturnCheckBox from "./ReturnCheckBox"

type ItemProps = {
  item: Item
}
const PackingListItem: FC<ItemProps> = ({ item }) => {
  const fetcher = useFetcher()
  const submit = useSubmit()
  // const transition = useTransition()
  // function handleChange(event: {
  //   currentTarget:
  //     | FormData
  //     | HTMLButtonElement
  //     | HTMLFormElement
  //     | HTMLInputElement
  //     | URLSearchParams
  //     | { [name: string]: string }
  //     | null
  // }) {
  //   submit(event.currentTarget, { replace: true })
  // }

  const titleDivStyles = [`ml-4`, `text-left`, `flex-1`]
  if (item.isChecked === true) {
    return (
      <div>
        <li key={item.id}>
          <WhiteRoundedRectangle>
            <fetcher.Form method="post">
              <input type="hidden" name="id" value={item.id} />
              <div className={join(...titleDivStyles)}>
                {item.description}
                <button type="submit" display="inline" aria-label="check circle">
                  <ReturnCheckBox isChecked={item.isChecked} key={item.id} />
                </button>
              </div>
              {/* {transition.state === `submitting` ? <p>Saving...</p> : null} */}
              {/* <button type="submit">✓</button> */}
            </fetcher.Form>
          </WhiteRoundedRectangle>
        </li>
      </div>
    )
  }
  return (
    <li key={item.id}>
      <RoundedRectangle>
        <fetcher.Form method="post">
          <input type="hidden" name="id" value={item.id} />
          <BottomLineDiv>
            <div className={join(...titleDivStyles)}>
              {item.description}
              <button type="submit" display="inline" aria-label="check circle">
                <ReturnCheckBox isChecked={item.isChecked} key={item.id} />
              </button>
            </div>
          </BottomLineDiv>
          {/* {transition.state === `submitting` ? <p>Saving...</p> : null} */}
          {/* <button type="submit">✓</button> */}
        </fetcher.Form>
      </RoundedRectangle>
    </li>
  )
}

export default PackingListItem
