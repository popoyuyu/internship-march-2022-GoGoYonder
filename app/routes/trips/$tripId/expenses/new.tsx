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
<<<<<<< HEAD
  useNavigate,
} from "remix"

import { useCatch } from "@remix-run/react"
import type { Params } from "react-router"
=======
} from "remix"

>>>>>>> 36513849d6e895f2688f5fea0bd2ad7f9428e76f
import invariant from "tiny-invariant"

import { Attendee, getAttendeesByTripId } from "~/models/attendee.server"
import { Expense, createExpense } from "~/models/expense.server"
import { Trip } from "~/models/trip.server"
import { requireUserId } from "~/session.server"
import {
  MainBtn,
  InputField,
  InputLabel,
<<<<<<< HEAD
  ErrorDiv,
  Header,
  SubHeader,
  ModalBackdrop,
  Modal,
  AddButtonText,
  InputFieldMid,
} from "~/styles/styledComponents"
import SvgSwipeButton from "~/styles/SVGR/SvgSwipeButton"
=======
  Header,
  SubHeader,
} from "~/styles/styledComponents"
>>>>>>> 36513849d6e895f2688f5fea0bd2ad7f9428e76f
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
<<<<<<< HEAD
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

  const centered = [`flex`, `items-center`, `justify-center`, `flex-col`]

  return (
    <div>
      <ModalBackdrop
        onClick={() => navigate(`/trips/${params.tripId}/expenses`)}
      />
      <Modal className={join(...centered)}>
        <div
          className={join(`pt-2`)}
          onClick={() => navigate(`/trips/${params.tripId}/expenses`)}
        >
          <SvgSwipeButton />
        </div>
        <AddButtonText className={join(`mr-48`, `p-8`)}>
          Add Expense
        </AddButtonText>
        <form method="post">
          <p>
            <InputLabel className={join(`mr-56`)}>
              Expense Type
              <p>
                <InputFieldMid type="text" name="description" />
              </p>
            </InputLabel>
          </p>
          <p>
            <InputLabel>
              Expense Total
              <p>
                <InputFieldMid type="text" name="total" />
              </p>
            </InputLabel>
          </p>

          {actionData?.userId && outputError(actionData.userId)}
          {actionData?.tripId && outputError(actionData.tripId)}
          {actionData?.inputDescription &&
            outputError(actionData.inputDescription)}
          {actionData?.inputTotal && outputError(actionData.inputTotal)}

          <p className={join(`mt-8`, `pb-16`)}>
            <MainBtn type="submit">Add Expense</MainBtn>
          </p>
        </form>
      </Modal>
=======
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
>>>>>>> 36513849d6e895f2688f5fea0bd2ad7f9428e76f
    </div>
  )
}

export default NewExpense
