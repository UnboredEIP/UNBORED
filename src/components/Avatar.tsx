import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  BodySvg,
  BlazerSvg,
  CrewneckSvg,
  HoodieSvg,
  OverallSvg,
  PoloSvg,
  ScoopneckSvg,
  ShirtSvg,
  VneckSvg,
} from "../../assets/avatars/avatars";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const TOP_ADJUSTMENT_RATIO = 0.28;
const LEFT_ADJUSTMENT_RATIO = 0.16;
const SIZE_MULTIPLIER = 1.33;

const MyAvatar = ({
  top = screenHeight / 3,
  left = 100,
  clothTop = "shirt",
  size = 200,
  colorSkin = "#D08B5B",
  colorClothingTop = "black",
}) => {
  const clothComponents = {
    blazer: <BlazerSvg />,
    crewneck: <CrewneckSvg />,
    hoodie: <HoodieSvg />,
    overall: <OverallSvg />,
    polo: <PoloSvg />,
    scoopneck: <ScoopneckSvg />,
    shirt: <ShirtSvg />,
    vneck: <VneckSvg />,
  };

  //@ts-ignore
  const selectedCloth = clothComponents[clothTop];

  return (
    <View style={styles(top, left, size).container}>
      <BodySvg
        width={size}
        height={size * 1.22}
        color={colorSkin}
        style={styles(top, left, size).bodySvg}
      />
      {selectedCloth &&
        React.cloneElement(selectedCloth, {
          style: {
            ...styles(top, left, size).clothSvg,
            width: size * SIZE_MULTIPLIER,
            height: size * SIZE_MULTIPLIER,
          },
          color: colorClothingTop,
        })}
    </View>
  );
};

const styles = (
  top: number,
  left: number,
  size: number,
  right?: number,
  bottom?: number
) => {
  const adjustedTop = top + size * TOP_ADJUSTMENT_RATIO;
  const adjustedLeft = left - size * LEFT_ADJUSTMENT_RATIO;
  const adjustedSize = size * SIZE_MULTIPLIER;

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
    },
    bodySvg: {
      position: "absolute",
      top,
      left,
    },
    clothSvg: {
      position: "absolute",
      top: adjustedTop,
      left: adjustedLeft,
      width: adjustedSize,
      height: adjustedSize,
    },
  });
};

export default MyAvatar;
