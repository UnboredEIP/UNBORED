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
  BeardLight,
  BeardMajestic,
  BeardMedium,
  BeardMustache,
  BeardMustachemagnum,
  MouthDefault,
  MouthDesbelief,
  MouthEating,
  MouthGrimace,
  MouthOpen,
  MouthSad,
  MouthScream,
  MouthSerious,
  MouthSmile,
  MouthTongue,
  MouthTwinkle,
  MouthVomit,
  EyebrowAngry,
  EyebrowExited,
  EyebrowFlat,
  EyebrowNatural,
  EyebrowSad,
  EyebrowSad2,
  EyebrowUnibrow,
  EyebrowUpdown,
  HatFedora,
  HatHijab,
  HatTurban,
  HatWinter,
  HatWinter2,
  HatWintercat,
} from "../../assets/avatars/avatars";

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const TOP_ADJUSTMENT_RATIO = 0.28;
const LEFT_ADJUSTMENT_RATIO = -0.165;
const SIZE_MULTIPLIER = 1.33;

const EYES_TOP_ADJUSTMENT_RATIO = 0.19;
const EYES_LEFT_ADJUSTMENT_RATIO = 0.33;
const EYES_SIZE_MULTIPLIER = 0.35;

const HAIR_TOP_ADJUSTMENT_RATIO = -0.059;
const HAIR_LEFT_ADJUSTMENT_RATIO = -0.124;
const HAIR_SIZE_MULTIPLIER = 1.245;

const BEARD_TOP_ADJUSTMENT_RATIO = 0.27;
const BEARD_LEFT_ADJUSTMENT_RATIO = 0.22;
const BEARD_SIZE_MULTIPLIER = 0.57;

const EYEBROW_TOP_ADJUSTMENT_RATIO = 0.07;
const EYEBROW_LEFT_ADJUSTMENT_RATIO = 0.3;
const EYEBROW_SIZE_MULTIPLIER = 0.4;

const MOUTH_TOP_ADJUSTMENT_RATIO = 0.54;
const MOUTH_LEFT_ADJUSTMENT_RATIO = 0.43;
const MOUTH_SIZE_MULTIPLIER = 0.15;

const HAT_TOP_ADJUSTMENT_RATIO = -0.17;
const HAT_LEFT_ADJUSTMENT_RATIO = -0.2;
const HAT_SIZE_MULTIPLIER = 1.4;

const MyAvatar = ({
  //@ts-ignore
  clothTop, //="shirt", C bon
  //@ts-ignore
  eyes, //="wink", C bon
  //@ts-ignore
  size, //= 200, C bon
  //@ts-ignore
  hair, //="afro", C bon
  //@ts-ignore
  beard, //="majestic",
  //@ts-ignore
  colorSkin, //= "#D08B5B", C bon
  //@ts-ignore
  colorEye, //="green", C bon
  colorHair = "black",
  colorBeard = colorHair, // C bon
  //@ts-ignore
  colorClothingTop, // ="black", C bon
  //@ts-ignore
  mouth, //="grimace",
  //@ts-ignore
  eyebrow, //="natural",
  //@ts-ignore
  hat,
  //@ts-ignore
  colorHat, //=  "yellow",
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
  const beardComponents = {
    light: <BeardLight />,
    majestic: <BeardMajestic />,
    medium: <BeardMedium />,
    mustache: <BeardMustache />,
    mustachemagnum: <BeardMustachemagnum />,
  };

  const mouthComponents = {
    default: <MouthDefault />,
    desbelief: <MouthDesbelief />,
    eating: <MouthEating />,
    grimace: <MouthGrimace />,
    open: <MouthOpen />,
    sad: <MouthSad />,
    scream: <MouthScream />,
    serious: <MouthSerious />,
    smile: <MouthSmile />,
    tongue: <MouthTongue />,
    twinkle: <MouthTwinkle />,
    vomit: <MouthVomit />,
  };

  const eyebrowComponents = {
    angry: <EyebrowAngry />,
    exited: <EyebrowExited />,
    flat: <EyebrowFlat />,
    natural: <EyebrowNatural />,
    sad: <EyebrowSad />,
    sad2: <EyebrowSad2 />,
    unibrow: <EyebrowUnibrow />,
    updown: <EyebrowUpdown />,
  };

  const hatComponents = {
    fedora: <HatFedora />,
    hijab: <HatHijab />,
    turban: <HatTurban />,
    winter: <HatWinter />,
    winter2: <HatWinter2 />,
    wintercat: <HatWintercat />,
  };

  //@ts-ignore
  const selectedCloth = clothComponents[clothTop];
  //@ts-ignore
  const selectedEyes = eyesComponents[eyes];
  //@ts-ignore
  const selectedHair = hairComponents[hair];
  //@ts-ignore
  const selectedBeard = beardComponents[beard];
  //@ts-ignore
  const selectedMouth = mouthComponents[mouth];
  //@ts-ignore
  const selectedEyebrow = eyebrowComponents[eyebrow];
  //@ts-ignore
  const selectedHat = hatComponents[hat];

  return (
    <View>
      {selectedHat &&
        hat === "fedora" &&
        React.cloneElement(selectedHat, {
          style: {
            ...styles(screenWidth, screenHeight, size).hatSvg,
            width: size * HAT_SIZE_MULTIPLIER,
            height: size * HAT_SIZE_MULTIPLIER,
          },
          color: colorHat,
        })}
      <BodySvg
        width={size}
        height={size * 1.22}
        color={colorSkin}
        style={styles(screenWidth, screenHeight, size).bodySvg}
      />
      {selectedCloth &&
        React.cloneElement(selectedCloth, {
          style: {
            ...styles(screenWidth, screenHeight, size).clothSvg,
            width: size * SIZE_MULTIPLIER,
            height: size * SIZE_MULTIPLIER,
          },
          color: colorClothingTop,
        })}
      {selectedEyes &&
        React.cloneElement(selectedEyes, {
          style: {
            ...styles(screenWidth, screenHeight, size).eyesSvg,
            width: size * EYES_SIZE_MULTIPLIER,
            height: size * EYES_SIZE_MULTIPLIER,
          },
          color: colorEye,
        })}
      {selectedHair &&
        hat !== "hijab" &&
        React.cloneElement(selectedHair, {
          style: {
            ...styles(screenWidth, screenHeight, size).hairSvg,
            width: size * HAIR_SIZE_MULTIPLIER,
            height: size * HAIR_SIZE_MULTIPLIER,
          },
          color: colorHair,
        })}
      {selectedEyebrow &&
        React.cloneElement(selectedEyebrow, {
          style: {
            ...styles(screenWidth, screenHeight, size).eyebrowSvg,
            width: size * EYEBROW_SIZE_MULTIPLIER,
            height: size * EYEBROW_SIZE_MULTIPLIER,
          },
          color: colorHair,
        })}
      {selectedMouth &&
        React.cloneElement(selectedMouth, {
          style: {
            ...styles(screenWidth, screenHeight, size).mouthSvg,
            width: size * MOUTH_SIZE_MULTIPLIER,
            height: size * MOUTH_SIZE_MULTIPLIER,
          },
          color: colorSkin,
        })}
      {selectedBeard &&
        React.cloneElement(selectedBeard, {
          style: {
            ...styles(screenWidth, screenHeight, size).beardSvg,
            width: size * BEARD_SIZE_MULTIPLIER,
            height: size * BEARD_SIZE_MULTIPLIER,
          },
          color: colorBeard,
        })}
      {selectedHat &&
        hat !== "fedora" &&
        React.cloneElement(selectedHat, {
          style: {
            ...styles(screenWidth, screenHeight, size).hatSvg,
            width: size * HAT_SIZE_MULTIPLIER,
            height: size * HAT_SIZE_MULTIPLIER,
          },
          color: colorHat,
        })}
    </View>
  );
};

//@ts-ignore
const styles = (screenWidth, screenHeight, size) => {
  const adjustedTop = size * TOP_ADJUSTMENT_RATIO;
  const adjustedLeft = size * LEFT_ADJUSTMENT_RATIO;
  const adjustedSize = size * SIZE_MULTIPLIER;

  const eyesTop = size * EYES_TOP_ADJUSTMENT_RATIO;
  const eyesLeft = size * EYES_LEFT_ADJUSTMENT_RATIO;
  const eyesSize = size * EYES_SIZE_MULTIPLIER * 0.5;

  const hairTop = size * HAIR_TOP_ADJUSTMENT_RATIO;
  const hairLeft = size * HAIR_LEFT_ADJUSTMENT_RATIO;
  const hairSize = size * HAIR_SIZE_MULTIPLIER * 0.5;

  const hatTop = size * HAT_TOP_ADJUSTMENT_RATIO;
  const hatLeft = size * HAT_LEFT_ADJUSTMENT_RATIO;
  const hatSize = size * HAT_SIZE_MULTIPLIER * 0.5;

  const beardTop = size * BEARD_TOP_ADJUSTMENT_RATIO;
  const beardLeft = size * BEARD_LEFT_ADJUSTMENT_RATIO;
  const beardSize = size * BEARD_SIZE_MULTIPLIER * 0.5;

  const eyebrowTop = size * EYEBROW_TOP_ADJUSTMENT_RATIO;
  const eyebrowLeft = size * EYEBROW_LEFT_ADJUSTMENT_RATIO;
  const eyebrowSize = size * EYEBROW_SIZE_MULTIPLIER * 0.5;

  const mouthTop = size * MOUTH_TOP_ADJUSTMENT_RATIO;
  const mouthLeft = size * MOUTH_LEFT_ADJUSTMENT_RATIO;
  const mouthSize = size * MOUTH_SIZE_MULTIPLIER * 0.5;

  return StyleSheet.create({
    container: {
      position: "absolute",
      // top: adjustedTop,
      // left: adjustedLeft,
      // justifyContent: "center",
      // alignItems: "center",
    },
    bodySvg: {
      position: "absolute",
      // top: screenHeight / 2 - size / 2,
      // left: screenWidth / 2 - size / 2,
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
    hatSvg: {
      position: "absolute",
      top: hatTop,
      left: hatLeft,
      width: hatSize,
      height: hatSize,
    },
    beardSvg: {
      position: "absolute",
      top: beardTop,
      left: beardLeft,
      width: beardSize,
      height: beardSize,
    },
    eyebrowSvg: {
      position: "absolute",
      top: eyebrowTop,
      left: eyebrowLeft,
      width: eyebrowSize,
      height: eyebrowSize,
    },
    mouthSvg: {
      position: "absolute",
      top: mouthTop,
      left: mouthLeft,
      width: mouthSize,
      height: mouthSize,
    },
  });
};

export default MyAvatar;
