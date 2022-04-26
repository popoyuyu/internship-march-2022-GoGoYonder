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
  useNavigate,
} from "remix"

import { useCatch } from "@remix-run/react"
import type { Params } from "react-router"
import invariant from "tiny-invariant"

import { Attendee, getAttendeesByTripId } from "~/models/attendee.server"
import { Expense, createExpense } from "~/models/expense.server"
import { Trip } from "~/models/trip.server"
import { requireUserId } from "~/session.server"
import {
  MainBtn,
  InputField,
  InputLabel,
  ErrorDiv,
  Header,
  SubHeader,
  ModalBackdrop,
  Modal,
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
  const params = useParams()
  const actionData = useActionData()
  const navigate = useNavigate()

  const outputError = (errorMessage: string) => {
    return (
      <ErrorDiv>
        <em>{errorMessage}</em>
        <br />
      </ErrorDiv>
    )
  }

  return (
    <div>
      <ModalBackdrop
        onClick={() => navigate(`/trips/${params.tripId}/expenses`)}
      />
      <Modal className={join(`w-px:321`)}>
        <SubHeader>Add Your Expenses</SubHeader>
        <form method="post">
          <p className={join(`p-2`)}>
            <InputLabel>
              Expense Type
              <p className={join(`p-2`, `text-center`)}>
                <InputField type="text" name="description" />
              </p>
            </InputLabel>
          </p>
          <p className={join(`p-2`, `text-center`)}>
            <InputLabel>
              Expense Total
              <p className={join(`p-2`, `text-center`)}>
                <InputField type="text" name="total" />
              </p>
            </InputLabel>
          </p>

          {actionData?.userId && outputError(actionData.userId)}
          {actionData?.tripId && outputError(actionData.tripId)}
          {actionData?.inputDescription &&
            outputError(actionData.inputDescription)}
          {actionData?.inputTotal && outputError(actionData.inputTotal)}

          <p className={join(`p-8`, `center`)}>
            <MainBtn type="submit">Expense Total</MainBtn>
          </p>
        </form>
      </Modal>
    </div>
  )
}

export default NewExpense
