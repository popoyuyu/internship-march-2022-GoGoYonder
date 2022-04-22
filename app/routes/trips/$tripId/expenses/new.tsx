import type { FC } from "react"

import type { ActionFunction, LoaderFunction } from "remix"
import {
  Link,
  json,
  Form,
  redirect,
  useActionData,
  useParams,
  useLoaderData,
} from "remix"

import invariant from "tiny-invariant"

import { Attendee, getAttendeesByTripId } from "~/models/attendee.server"
import { Expense, createExpense } from "~/models/expense.server"
import { Trip } from "~/models/trip.server"
import { requireUserId } from "~/session.server"
import {
  MainBtn,
  InputField,
  InputLabel,
  Header,
  SubHeader,
} from "~/styles/styledComponents"
import { join } from "~/utils"

type ActionData =
  | {
      userId: string | null
      tripId: string | null
      inputDescription: string | null
      inputTotal: string | null
    }
  | undefined

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const { tripId } = params
  const formData = await request.formData()
  const inputDescription = formData.get(`description`)
  const inputTotal = formData.get(`total`)
  const description = inputDescription?.toString()

  const total = Number(inputTotal)

  const errors: ActionData = {
    userId: userId ? null : `not a valid id`,
    tripId: tripId ? null : `not a valid id`,
    inputDescription: inputDescription ? null : `Description is required`,
    inputTotal: inputTotal ? null : `Amount is required`,
  }
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage)
  if (hasErrors) {
    return json<ActionData>(errors)
  }

  invariant(tripId, `tripId is not defined`)
  invariant(userId, `userId is not defined`)
  invariant(description, `description is not defined`)

  const expense = await createExpense({ description, total, userId, tripId })

  return redirect(`/trips/${tripId}/expenses`)
}

const NewExpense: FC = () => {
  return (
    <div>
      <SubHeader>Add Your Expenses</SubHeader>
      <form method="post">
        <p>
          <InputLabel>
            Expense Type
            <p>
              <InputField type="text" name="description" />
            </p>
          </InputLabel>
        </p>
        <p>
          <InputLabel>
            Expense Total
            <InputField type="text" name="total" />
          </InputLabel>
        </p>
        <p>
          <MainBtn type="submit">Expense Total</MainBtn>
        </p>
      </form>
    </div>
  )
}

export default NewExpense
