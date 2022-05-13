/* eslint-disable max-lines */
import { PrismaClient } from "@prisma/client"
import type {
  Trip,
  User,
  Attendee,
  Decider,
  Expense,
  Item,
} from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()
async function seed() {
  const email = `rachel@remix.run`
  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist ye
  })
  const hashedPassword = await bcrypt.hash(`rachelIsCool`, 10)
  const testingPassword = await bcrypt.hash(`testtest`, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: { hash: hashedPassword },
      },
    },
  })

  await Promise.all(
    getUsers().map((user) => {
      return prisma.user.create({
        data: {
          id: user.id,
          email: user.email,
          password: {
            create: {
              hash: testingPassword,
            },
          },
          userName: user.userName,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
    }),
  )
  await Promise.all(
    getTrips().map((trip) => {
      return prisma.trip.create({ data: trip })
    }),
  )
  await Promise.all(
    getAttendees().map((attendee) => {
      return prisma.attendee.create({ data: attendee })
    }),
  )
  await Promise.all(
    getDecider().map((decider) => {
      return prisma.decider.create({ data: decider })
    }),
  )
  await Promise.all(
    getExpenses().map((expense) => {
      return prisma.expense.create({ data: expense })
    }),
  )
  await Promise.all(
    getItems().map((item) => {
      return prisma.item.create({ data: item })
    }),
  )
  console.log(`Database has been seeded. 🌱`)
}
const getUsers = (): User[] => {
  return [
    {
      id: `cl1xv8xul0010qz1dmv2l3jqy`,
      email: `kim@test`,
      userName: `Kim`,
      avatarUrl: `https://i.pinimg.com/280x280_RS/9e/ad/53/9ead5354c88294eb3883b7e0703cbe29.jpg`,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
    {
      id: `cl1ihz4wr02309c1dbp8gi835`,
      email: `ella@test`,
      userName: `Ella`,
      avatarUrl: `https://www.personality-database.com/profile_images/597.png`,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
    {
      id: `cl1xvbab00028qz1d1e0u5h63`,
      email: `jeff@test`,
      userName: `Jeff`,
      avatarUrl: `https://openpsychometrics.org/tests/characters/test-resources/pics/LOTR/7.jpg`,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
    {
      id: `cl1xwwtyf0007jj1dl1yiycqb`,
      email: `jacob@test`,
      userName: `Jacob`,
      avatarUrl: `data:image/jpeg;base64,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`,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    },
  ]
}
const getTrips = (): Trip[] => {
  return [
    {
      id: `cl1xvci7b0050qz1d3o01tyg1`,
      deciderId: `cl2pcwfus01059ooyle0i7l1r`,
      ownerId: `cl1xv8xul0010qz1dmv2l3jqy`,
      startDate: new Date(
        `Tue Aug 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      endDate: new Date(
        `Tue Aug 26 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      nickName: `Summer Vacation`,
      createdAt: new Date(
        `Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 21 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      id: `cl1xvd63a0068qz1dbhh557su`,
      deciderId: `cl2pcviv900719ooyfr13urm4`,
      ownerId: `cl1ihz4wr02309c1dbp8gi835`,
      startDate: null,
      endDate: null,
      nickName: `Christmas at Grandmas`,
      createdAt: new Date(
        `Tue Sep 22 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 22 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      id: `cl1xvdwqy0085qz1dfy8rscc9`,
      deciderId: `cl2pcvepo00489ooy1y7176bb`,
      ownerId: `cl1xvbab00028qz1d1e0u5h63`,
      startDate: null,
      endDate: null,
      nickName: `Riverside Camping`,
      createdAt: new Date(
        `Tue Sep 23 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 23 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      id: `cl1xwxl5a0024jj1d78omqrta`,
      deciderId: `cl2pcur0g00199ooynzsn6q5f`,
      ownerId: `cl1xwwtyf0007jj1dl1yiycqb`,
      startDate: null,
      endDate: null,
      nickName: `There and Back Again`,
      createdAt: new Date(
        `Tue Sep 23 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 23 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
  ]
}
const getAttendees = (): Attendee[] => {
  return [
    {
      //kim@test
      tripId: `cl1xvci7b0050qz1d3o01tyg1`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 21 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //kim on ellas
      tripId: `cl1xvd63a0068qz1dbhh557su`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 21 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //ella@test
      tripId: `cl1xvd63a0068qz1dbhh557su`,
      userId: `cl1ihz4wr02309c1dbp8gi835`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 22 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 22 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //ella on jeffs
      tripId: `cl1xvdwqy0085qz1dfy8rscc9`,
      userId: `cl1ihz4wr02309c1dbp8gi835`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 22 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 22 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //jeff@test
      tripId: `cl1xvdwqy0085qz1dfy8rscc9`,
      userId: `cl1xvbab00028qz1d1e0u5h63`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 23 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 23 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //ella on Jacobs
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1ihz4wr02309c1dbp8gi835`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 22 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 22 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //jeff on jacobs
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xvbab00028qz1d1e0u5h63`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 23 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 23 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //kim on jacobs
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
      isAccepted: null,
      createdAt: new Date(
        `Tue Sep 21 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 21 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //jacob@test
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xwwtyf0007jj1dl1yiycqb`,
      isAccepted: new Date(
        `Tue Sep 30 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      createdAt: new Date(
        `Tue Sep 24 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 24 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      //jacob on kims trip
      tripId: `cl1xvci7b0050qz1d3o01tyg1`,
      userId: `cl1xwwtyf0007jj1dl1yiycqb`,
      isAccepted: new Date(
        `Tue Sep 24 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      createdAt: new Date(
        `Tue Sep 24 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 24 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
  ]
}
const getDecider = (): Pick<Decider, `id` | `tripId`>[] => {
  return [
    { id: `cl2pcwfus01059ooyle0i7l1r`, tripId: `cl1xvci7b0050qz1d3o01tyg1` },
    { id: `cl2pcviv900719ooyfr13urm4`, tripId: `cl1xvd63a0068qz1dbhh557su` },
    { id: `cl2pcvepo00489ooy1y7176bb`, tripId: `cl1xvdwqy0085qz1dfy8rscc9` },
    { id: `cl2pcur0g00199ooynzsn6q5f`, tripId: `cl1xwxl5a0024jj1d78omqrta` },
  ]
}

const getExpenses = (): Expense[] => {
  return [
    {
      //kim expense
      id: `cl212bmtb0009fv1d26ntsf0z`,
      description: `The Prancing Pony`,
      total: 125,
      createdAt: new Date(`2022-04-15T23:29:38.879Z`),
      updatedAt: new Date(`2022-04-15T23:29:38.879Z`),
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
    },
    {
      //kim expense
      id: `cl1ihmh8h00049c1dd4miflku`,
      description: `Lambas Bread`,
      total: 50,
      createdAt: new Date(`2022-04-15T23:29:39.879Z`),
      updatedAt: new Date(`2022-04-15T23:29:39.879Z`),
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
    },
    {
      //ella expense
      id: `cl21b59db0027fv1dbafvnnfp`,
      description: `Black Bear Diner`,
      total: 56,
      createdAt: new Date(`2022-04-16T03:36:38.062Z`),
      updatedAt: new Date(`2022-04-16T03:36:38.064Z`),
      tripId: `cl1xvd63a0068qz1dbhh557su`,
      userId: `cl1ihz4wr02309c1dbp8gi835`,
    },
    {
      //ella expense
      id: `cl21b7n0k0044fv1dw95febkn`,
      description: `Super 8`,
      total: 89,
      createdAt: new Date(`2022-04-16T03:38:29.059Z`),
      updatedAt: new Date(`2022-04-16T03:38:29.060Z`),
      tripId: `cl1xvd63a0068qz1dbhh557su`,
      userId: `cl1ihz4wr02309c1dbp8gi835`,
    },
    {
      //jeff expense
      id: `cl21btcg80061fv1db2hhq2wo`,
      description: `Breakfast`,
      total: 56,
      createdAt: new Date(`2022-04-16T03:38:29.060Z`),
      updatedAt: new Date(`2022-04-16T03:38:29.062Z`),
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xvbab00028qz1d1e0u5h63`,
    },
    {
      id: `cl21dpxa00135fv1d3nrsdq1m`,
      description: `Second Breakfast`,
      total: 36,
      createdAt: new Date(`2022-04-16T03:38:29.063Z`),
      updatedAt: new Date(`2022-04-16T03:38:29.064Z`),
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xvbab00028qz1d1e0u5h63`,
    },
    {
      //jacob expense
      id: `cl21dipg80101fv1dlrfbjhm8`,
      description: `Ferry`,
      total: 100,
      createdAt: new Date(`2022-04-16T03:38:29.064Z`),
      updatedAt: new Date(`2022-04-16T03:38:29.066Z`),
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xwwtyf0007jj1dl1yiycqb`,
    },
    {
      //jacob expense
      id: `cl21dknqf0118fv1dyot6gb3e`,
      description: `Horse Rental`,
      total: 72,
      createdAt: new Date(`2022-04-16T03:38:29.067Z`),
      updatedAt: new Date(`2022-04-16T03:38:29.068Z`),
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xwwtyf0007jj1dl1yiycqb`,
    },
  ]
}
const getItems = (): Item[] => {
  return [
    {
      id: `cl1xvdwqy0046qz1dfy8rfcc7`,
      description: `Pippin Took and Merry Brandybuck`,
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
      isChecked: true,
      createdAt: new Date(
        `Tue Sep 25 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 26 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      id: `cl1xvdwqy0089qz1dfy8rqcc6`,
      description: `Cape`,
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xv8xul0010qz1dmv2l3jqy`,
      isChecked: false,
      createdAt: new Date(
        `Tue Sep 25 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 26 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
    {
      id: `cl1xvdwqy0077qz1dfy8rxcc5`,
      description: `The One Ring`,
      tripId: `cl1xwxl5a0024jj1d78omqrta`,
      userId: `cl1xwwtyf0007jj1dl1yiycqb`,
      isChecked: true,
      createdAt: new Date(
        `Tue Sep 25 2021 16:16:50 GMT-0400 (Eastern Daylight Time)`,
      ),
      updatedAt: new Date(
        `Tue Sep 26 2021 16:17:00 GMT-0400 (Eastern Daylight Time)`,
      ),
    },
  ]
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
