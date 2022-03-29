import type { FC } from "react"

import type { LoaderFunction, ActionFunction } from "remix"
import { redirect, json, useLoaderData, useCatch, Form } from "remix"

import invariant from "tiny-invariant"

import type { Note } from "~/models/note.server"
import { deleteNote, getNote } from "~/models/note.server"
import { requireUserId } from "~/session.server"

type LoaderData = {
  note: Note
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  invariant(params.noteId, `noteId not found`)

  const note = await getNote({ userId, id: params.noteId })
  if (!note) {
    throw new Response(`Not Found`, { status: 404 })
  }
  return json<LoaderData>({ note })
}

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  invariant(params.noteId, `noteId not found`)

  await deleteNote({ userId, id: params.noteId })

  return redirect(`/notes`)
}

const NoteDetailsPage: FC = () => {
  const data = useLoaderData() as LoaderData

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.note.title}</h3>
      <p className="py-6">{data.note.body}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  )
}
export default NoteDetailsPage

export const ErrorBoundary: FC<{ error: Error }> = ({ error }) => {
  console.error(error)

  return <div>An unexpected error occurred: {error.message}</div>
}

export const CatchBoundary: FC = () => {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div>Note not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}
