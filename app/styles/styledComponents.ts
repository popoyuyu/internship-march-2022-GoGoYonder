import styled from "styled-components"

// font-family: 'Lato', sans-serif;
// font-family: 'Playfair Display', serif;

export const MainBtn = styled.button`
  border: 1px solid #cad2c5;
  background: #cad2c5;
  color: #2f3e46;
  border-radius: 15px;
  padding: 12px 32px;
  font-size: 1.5em;
  font-weight: bold;
  line-height: 1em;
  text-align: center;
  width: 315px;
  height: 56px;
`
export const ClearBtn = styled(MainBtn)`
  box-sizing: border-box;
  background: rgba(202, 210, 197, 0);
  font-family: "Lato", sans-serif;
  color: #ffffff;
`
export const SmMainBtn = styled(MainBtn)`
  width: 153px;
  height: 56px;
`
export const SmClearBtn = styled(ClearBtn)`
  width: 153px;
  height: 56px;
  color: #ffffff;
`
export const Header = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2em;
  margin-top: 1em;
  margin-left: 1em;
  color: #ffffff;
`
export const InputLabel = styled.label`
  font-size: 1.3em;
  font-weight: bold;
  color: #ffffff;
  margin-left: -10em;
`
export const InputField = styled.input`
  width: 315px;
  height: 55px;
  color: black;
  padding .5em;
  border-radius: 15px;
  margin-top: .3em
`
export const ErrorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
`
export const TripLiContainer = styled.li`
  background: #52796F;
  border-radius: 13px;
`
export const TripLiImage = styled.img`
  background: url(https://s3-alpha-sig.figma.com/img/522c/209c/ff9f7d7d9bec580ba37c71a849ba255c?Expires=1651449600&Signature=E-RJzjBZ5iMHbGs3PRP9BYK6pYGwS1TlA3aimrTprAsI0k2ePB0IsJzZMPwONrrIg9nsVy3CfS7g4p~9RTdXCbHOMxMznQ68NqFsQeIOGjdbR8cCsX2S1sJovGGmsPg-ZrqWSkBahOZTT7TCBFaS~g8MGlL6JVm20vjnNdZt~XS90wGB25T3iAn~gGtyUOjHnhnRKVjKFy518Ni-py4Q-tfIGdZ3d3m9SR1Zk8bpEYPlxZVUtWYJSmdcL0lazMDfibjt0JGAyMjG-5QPhnAFSd4WqyRHApgfl6AvVKzsKuRuknNGvpvA-7L6LkQ7IMnHPckG8m40eHe7xSmWamBsjw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA), #52796F;
  border-radius: 13px 13px 0px 0px;
`
export const TripLiTitle = styled.h1`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;
`
export const TripLiFlex = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
export const TripLiGroup = styled.h3`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
`
export const TripLiDetail = styled.h2`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
`

//https://s3-alpha-sig.figma.com/img/522c/209c/ff9f7d7d9bec580ba37c71a849ba255c?Expires=1651449600&Signature=E-RJzjBZ5iMHbGs3PRP9BYK6pYGwS1TlA3aimrTprAsI0k2ePB0IsJzZMPwONrrIg9nsVy3CfS7g4p~9RTdXCbHOMxMznQ68NqFsQeIOGjdbR8cCsX2S1sJovGGmsPg-ZrqWSkBahOZTT7TCBFaS~g8MGlL6JVm20vjnNdZt~XS90wGB25T3iAn~gGtyUOjHnhnRKVjKFy518Ni-py4Q-tfIGdZ3d3m9SR1Zk8bpEYPlxZVUtWYJSmdcL0lazMDfibjt0JGAyMjG-5QPhnAFSd4WqyRHApgfl6AvVKzsKuRuknNGvpvA-7L6LkQ7IMnHPckG8m40eHe7xSmWamBsjw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA