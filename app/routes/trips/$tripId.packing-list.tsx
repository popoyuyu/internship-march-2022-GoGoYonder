import type { FC } from "react"

import type { LoaderFunction, ActionFunction } from "remix"
import { Link, json, useLoaderData, Outlet, useFetcher, useParams } from "remix"

import type { Item } from "@prisma/client"
import { Response } from "node-fetch"
import type { Params } from "react-router"
import invariant from "tiny-invariant"

import PackingListItem from "~/components/PackingListItem"
import { getAttendeeById } from "~/models/attendee.server"
import { getItemById, updateChecked } from "~/models/item.server"
import { requireUserId } from "~/session.server"
import {
  Header,
  AddButtonText,
  RoundedRectangleNoMargin,
} from "~/styles/styledComponents"
import SvgAddButton from "~/styles/SVGR/SvgAddButton"
import SvgBackButton from "~/styles/SVGR/SvgBackButton"
import { join } from "~/utils"

//---------------------------Loader: Get

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

// jsonifies the getLoaderData return after it returns, instantiates the loader function
export const loader: LoaderFunction = async ({ request, params }) => {
  return json(await getLoaderData(request, params))
}

// Request: info from the database, Params: info from the url
// pass in Request as a get request from server, pass in params as a way to parse out data from url
const getLoaderData = async (request: Request, params: Params<string>) => {
  // eslint-disable-next-line prefer-destructuring
  const userId = await requireUserId(request)
  // eslint-disable-next-line prefer-destructuring
  const tripId = params.tripId
  invariant(userId, `need userId`)
  invariant(tripId, `need tripId`)

  return getAttendeeById(tripId, userId)
}

//---------------------------Action: Delete, Update, Create

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const itemId = form.get(`id`)?.toString()
  invariant(itemId, `itemId must exist`)
  const item = await getItemById(itemId)
  invariant(item, `item must not be null`)
  const itemCheckedStatus = item.isChecked
  return updateChecked(item.id, !itemCheckedStatus)
}

//---------------------------FC

const PackingList: FC = () => {
  const data = useLoaderData<LoaderData>()
  const params = useParams()

  const checkedItems = data?.packingList.filter(
    (item: Item) => item.isChecked === true,
  )
  const uncheckedItems = data?.packingList.filter(
    (item: Item) => item.isChecked !== true,
  )
  const length = uncheckedItems?.length as number

  const backButtonHeaderRow = [`flex`, `mt-12`, `mb-16`]
  return (
    <div>
      <div className={join(...backButtonHeaderRow)}>
        <Link to={`/trips/${params.tripId}`}>
          <div className={join(`ml-8`)}>
            <SvgBackButton />
          </div>
        </Link>
      </div>
      <Header>Packing List</Header>
      {length > 0 ? (
        <RoundedRectangleNoMargin className={join(`mx-6`)}>
          <ul className="mb-3">
            {uncheckedItems?.map((item: Item) => (
              <PackingListItem item={item} key={item.id} />
            ))}
          </ul>
        </RoundedRectangleNoMargin>
      ) : (
        <></>
      )}

      <div>
        <ul>
          {checkedItems?.map((item: Item) => (
            <PackingListItem item={item} key={item.id} />
          ))}
        </ul>
      </div>

      <Outlet />
      <AddButtonText>
        <Link to={`/trips/${data?.tripId}/packing-list/new`}>
          <span className={join(`flex`, `m-8`)}>
            <SvgAddButton /> <span className={join(`ml-2`)}>Add Item</span>
          </span>
        </Link>
      </AddButtonText>
    </div>
  )
}

export default PackingList
