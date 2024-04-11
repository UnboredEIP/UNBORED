import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  BodySvg,
  //TOP
  BlazerSvg,
  CrewneckSvg,
  HoodieSvg,
  OverallSvg,
  PoloSvg,
  ScoopneckSvg,
  ShirtSvg,
  VneckSvg,
  //EYES
  EyeClosedSvg,
  EyeCrySvg,
  EyeDefaultSvg,
  EyeDizzySvg,
  EyerollSvg,
  EyeHappySvg,
  EyeHeartSvg,
  EyeSideSvg,
  EyeSquintSvg,
  EyeSurprisedSvg,
  EyeWackySvg,
  EyewWinkSvg,
  //HAIR
  HairAfro,
  HairBig,
  HairBuzzcut,
  HairCalvitie,
  HairCurly,
  HairCurlyshort,
  HairCurvy,
  HairFrizzy,
  HairLongDreads,
  HairLongStraight,
  HairMedium,
  HairMediumDreads,
  HairMediumLong,
  HairMinidreads,
  HairShaggy,
  HairShaggymulet,
  HairShortflat,
  HairShortwaved,
  HairSquare,
} from "../../assets/avatars/avatars";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const TOP_ADJUSTMENT_RATIO = 0.28;
const LEFT_ADJUSTMENT_RATIO = 0.16;
const SIZE_MULTIPLIER = 1.33;

const EYES_TOP_ADJUSTMENT_RATIO = 0.19;
const EYES_LEFT_ADJUSTMENT_RATIO = -0.33;
const EYES_SIZE_MULTIPLIER = 0.35;

// const HAIR_TOP_ADJUSTMENT_RATIO = -0.1;
// const HAIR_LEFT_ADJUSTMENT_RATIO = 0.21;
// const HAIR_SIZE_MULTIPLIER = 1.34;
const HAIR_TOP_ADJUSTMENT_RATIO = -0.059;
const HAIR_LEFT_ADJUSTMENT_RATIO = 0.124;
const HAIR_SIZE_MULTIPLIER = 1.245;

const MyAvatar = ({
  top = screenHeight / 2,
  left = 100,
  clothTop = "shirt",
  eyes = "closed",
  size = 200,
  hair = "afro",
  colorSkin = "#D08B5B",
  colorEye = "green",
  colorHair = "#4A312C",
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
  const eyesComponents = {
    closed: <EyeClosedSvg />,
    cry: <EyeCrySvg />,
    default: <EyeDefaultSvg />,
    dizzy: <EyeDizzySvg />,
    eyeroll: <EyerollSvg />,
    happy: <EyeHappySvg />,
    heart: <EyeHeartSvg />,
    side: <EyeSideSvg />,
    squint: <EyeSquintSvg />,
    surprised: <EyeSurprisedSvg />,
    wacky: <EyeWackySvg />,
    wink: <EyewWinkSvg />,
  };

  const hairComponents = {
    afro: <HairAfro />,
    big: <HairBig />,
    buzzcut: <HairBuzzcut />,
    calvitie: <HairCalvitie />,
    curly: <HairCurly />,
    curlyshort: <HairCurlyshort />,
    curvy: <HairCurvy />,
    frizzy: <HairFrizzy />,
    longdreads: <HairLongDreads />,
    longstraight: <HairLongStraight />,
    medium: <HairMedium />,
    mediumdreads: <HairMediumDreads />,
    mediumlong: <HairMediumLong />,
    minidreads: <HairMinidreads />,
    shaggy: <HairShaggy />,
    shaggymullet: <HairShaggymulet />,
    shortflat: <HairShortflat />,
    shortwaved: <HairShortwaved />,
    square: <HairSquare />,
  };

  //@ts-ignore
  const selectedCloth = clothComponents[clothTop];
  //@ts-ignore
  const selectedEyes = eyesComponents[eyes];
  //@ts-ignore
  const selectedHair = hairComponents[hair];

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
      {selectedEyes &&
        React.cloneElement(selectedEyes, {
          style: {
            ...styles(top, left, size).eyesSvg,
            width: size * EYES_SIZE_MULTIPLIER,
            height: size * EYES_SIZE_MULTIPLIER,
          },
          color: colorEye,
        })}
      {selectedHair &&
        React.cloneElement(selectedHair, {
          style: {
            ...styles(top, left, size).hairSvg,
            width: size * HAIR_SIZE_MULTIPLIER,
            height: size * HAIR_SIZE_MULTIPLIER,
          },
          color: colorHair,
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

  const eyesTop = top + size * EYES_TOP_ADJUSTMENT_RATIO;
  const eyesLeft = left - size * EYES_LEFT_ADJUSTMENT_RATIO;
  const eyesSize = size * EYES_SIZE_MULTIPLIER * 0.5;

  const hairTop = top + size * HAIR_TOP_ADJUSTMENT_RATIO;
  const hairLeft = left - size * HAIR_LEFT_ADJUSTMENT_RATIO;
  const hairSize = size * HAIR_SIZE_MULTIPLIER * 0.5;

  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    frame: {
      justifyContent: "center",
      alignItems: "center",
      borderColor: "black",
      borderRadius: 10,
      borderWidth: 2,
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
    eyesSvg: {
      position: "absolute",
      top: eyesTop,
      left: eyesLeft,
      width: eyesSize,
      height: eyesSize,
    },
    hairSvg: {
      position: "absolute",
      top: hairTop,
      left: hairLeft,
      width: hairSize,
      height: hairSize,
    },
  });
};

export default MyAvatar;
