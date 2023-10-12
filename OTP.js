import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Pressable,
    Keyboard,
} from 'react-native';

import OTPInput from "./OTPInput";

const styles = (isPinReady) => StyleSheet.create({
    Tel: {
        color:'black',
        width: 326,
        height: 42,
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: 0,
        position: 'absolute',
        top: 35+'%',
    },
    Line2: {
        width: 240,
        height: 1,
        position:'absolute',
        top: 35+'%',
        backgroundColor: 'grey',
    },
    container: {
        top:45+'%',

      },
    border: {
        minWidth: 354,
        height: 44,
        borderRadius: 9,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        position: 'absolute',
        top: 55.34+'%',
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff1a',
        paddingBottom: 36.7, 
        ...padding(9.9,36.7),
    },
    
    logoFB: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
    },
    TextFB: {
        position: 'absolute',
        top: 55+'%',
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    Btn: {
        boxSizing: 'borderBox',
        width: 100+'%',
        marginBottom: 0,
        ...padding(0 ,4.5),
    },
    IText: {
        minHeight: 19,
        minWidth: 90,
        textAlign: 'center',
        letterSpacing: 0,
        lineHeight: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    groupBtn: {
        position: 'absolute',
        top: 90+'%',
        width: 93 + '%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'flex-start',
    },
    content: {
        backgroundColor: !isPinReady ? "#E9AD8C" : '#E1604D',
        borderRadius: 50,
        textAlign: 'center',
        height: 100+'%',
        padding: 15,
    },
});

function padding(a, b, c, d) {
    return {
      paddingTop: a,
      paddingRight: b ? b : a,
      paddingBottom: c ? c : a,
      paddingLeft: d ? d : (b ? b : a)
    }
}

function OTP3() {
    const [otpCode, setOTPCode] = useState("");
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 4;
    return (
      <Pressable style={{ flex: 1, alignItems: 'center', backgroundColor:'white'}} onPress={Keyboard.dismiss}>
         <Text style={styles(this.props).Tel}>Un COOODE a été au numéro +33 6 63 ** ** **</Text>
         <View style={styles(this.props).container} >
            <OTPInput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setIsPinReady}
            />

        </View>
        <Text style={{color:'#E1604D', top: 49 +'%'}} onPress={() => console.log('ok')}>Envoyer un autre code</Text>
            <TouchableOpacity disabled={!isPinReady} style={styles(this.props).groupBtn} onPress={() => console.log('ok')}>
                <View style={styles(this.props).Btn}>
                    <View style={styles(isPinReady).content}>
                        <Text style={styles(this.props).IText}>Suivant</Text>
                    </View>
                </View>
            </TouchableOpacity>

      </Pressable>
    );
  }

export default OTP3;