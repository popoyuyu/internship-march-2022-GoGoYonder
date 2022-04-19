import { TripLiContainer, TripLiImage, TripLiTitle, TripLiFlex, TripLiDetail, TripLiCategory } from "./styledComponents";
import { Trip } from "@prisma/client";

export const TripLi = (trip: Trip) => {
  return (
    <TripLiContainer>
      <TripLiImage />
      <TripLiTitle></TripLiTitle>
      <hr />
      <TripLiFlex>
        <TripLiCategory>Starts</TripLiCategory>
        <TripLiCategory>Ends</TripLiCategory>
        <TripLiCategory>Stops</TripLiCategory>
      </TripLiFlex>
      <TripLiDetail>{trip.startDate}</TripLiDetail>
      <TripLiDetail>{trip.endDate}</TripLiDetail>
      <TripLiDetail>{trip.stops}</TripLiDetail>
    </TripLiContainer>
  )
}