import styled from "styled-components/native";

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 95%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
border-radius: 20px;
border-width: 1px;
height:70px;
padding-left: 0px;
border-color: #EBEEF2;
padding-right: 0px;
justify-content: center;
align-items: center;
min-width: 80px;
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: black;
 fontWeight:bold;

`;

export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const TextInputHidden = styled.TextInput`
width: 300px;
 padding: 15px;
 position:absolute;
 opacity: 0;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
border-color: #E0604E;
`;