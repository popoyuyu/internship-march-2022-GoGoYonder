import type { FC } from "react"

import type { LoaderFunction } from "remix"
import {
  Link,
  json,
  useLoaderData,
  useParams,
  useSearchParams,
  Outlet,
} from "remix"

import type { Expense } from "@prisma/client"
import { Trip, Attendee, User } from "@prisma/client"
import type { Params } from "react-router"
import invariant from "tiny-invariant"

import { getAttendeesByTripId } from "~/models/attendee.server"
import { getExpensesByTripId } from "~/models/expense.server"
import {
  MainBtn,
  InputField,
  InputLabel,
  Header,
  SubHeader,
  RoundedRectangle,
  CostText,
} from "~/styles/styledComponents"
import { join } from "~/utils"

type LoaderData = Awaited<ReturnType<typeof getLoaderData>>

const getLoaderData = async (params: Params<string>) => {
  invariant(params.tripId, `trips required`)
  return await getAttendeesByTripId(params.tripId)
}
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.tripId, `tripId is required`)
  return json<LoaderData>(await getLoaderData(params))
}

const ExpenseLayout: FC = () => {
  const data = useLoaderData<LoaderData>()

  const userExpenses = data.map((attendee) =>
    attendee.expenses.map((expense: Expense) => expense.total),
  )
  console.log(userExpenses)

  const userTotals = userExpenses.map((expense) => {
    if (expense.length >= 1) {
      return expense.reduce(
        (prevExpense, currentExpense) => prevExpense + currentExpense,
      )
    }
  })

  console.log(userTotals)

  return (
    <div>
      <Header>Cost Sharing</Header>
      <SubHeader>Expenses</SubHeader>
      {data.map((attendee, index) => (
        <div key={attendee.tripId + index}>
          <ul>
            {attendee.expenses.map((expense: Expense) => (
              <li key={expense.id}>
                <RoundedRectangle>
                  <SubHeader>{attendee.user.userName}</SubHeader>
                  {expense.description}
                  <CostText>${expense.total}</CostText>
                </RoundedRectangle>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <br></br>
      <SubHeader>Expense Totals</SubHeader>
      {data.map((attendee, index) => (
        <div key={attendee.userId}>
          {userTotals[index] ? (
            <ul>
              <li>
                <RoundedRectangle>
                  <SubHeader>{attendee.user.userName}</SubHeader>
                  <CostText>${userTotals[index]}</CostText>
                </RoundedRectangle>
              </li>
            </ul>
          ) : null}
        </div>
      ))}
      <br></br>
      <Outlet />
      <SubHeader>
        <p>
          <Link to={`new`}>Add Expense</Link>
        </p>
      </SubHeader>
    </div>
  )
}

//tripId folder: makes a new segment to route
//in tripId folder:
//wrap modal in div or span that takes over entire screen,
// fixed position, width 100 vw, height 100 vh, use container
//to block out, then center modal inside of it

export default ExpenseLayout
