import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator ,TransitionPresets} from 'react-navigation-stack'
import React, {useState, useEffect, useRef} from 'react';
import OTP from './OTP';
import './asset/SourceSansPro-Regular.otf';
import OTP3 from "./OTP"
import Accueil3 from "./Accueil"
import OnBoarding3 from './OnBoarding';
import Settings from './Settings'; 

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;
    const url = 'http://192.168.0.114:3000/auth/login'; // Replace with your backend login endpoint
    const headers = {
      'Content-Type': 'application/json',
    };
    const userData = {
      email,
      password,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorText = await response.text();
        console.error(errorText);
        throw new Error(`HTTP error! Status: ${response.status}\n${errorText}`);
      }
      const responseData = await response.json();
      console.log(responseData); // Handle success
      const authToken = responseData.token;
      this.props.navigation.navigate('Accueil3');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  render() {
    return (
      <NavigationContainer>
      <View style={styles.container}>
      <Image style={styles.image4} source={require('./assets/logo2.gif')} />
        <Text style={styles.inscrire}>Se connecter !</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={this.handleLogin}>
        <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.FPBtn}
          onPress={() => this.props.navigation.navigate('ForgetPassword')}>
          <Text style={styles.ForgetText}>Mot de passe oublié?</Text>
        </TouchableOpacity>
        <Text style={styles.ContinueravecText}>Ou continuer avec</Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity style={styles.oauthBtn}>
            <Image
              style={styles.image2}
              source={require('./assets/Facebook.png')}
            />
            <Text style={styles.oauthTxt}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oauthBtn}>
            <Image
              style={styles.image2}
              source={require('./assets/google.png')}
            />
            <Text style={styles.oauthTxt}>Google</Text>
          </TouchableOpacity>
        </View>
      </View>
      </NavigationContainer>
    );
        }
  }

  class ForgetPasswordScreen extends React.Component {
    render() {
      return (
        <NavigationContainer>
        <View style={styles.container}>
        <Image style={styles.image4} source={require('./assets/logo2.gif')} />
        <Text style={styles.inscrire3}>Mot de passe oublié</Text>
          <Text style={styles.inscrire4}>Inscrivez votre email pour récuperer votre compte</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirmer l'email"
            />
          </View>
          <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate('OTP3')}>
          <Text style={styles.loginText}>Confirmer</Text>
        </TouchableOpacity>
        </View>
        </NavigationContainer>
      );
          }
  }

  // 
  const CreateAccount = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [birthdate, setBirthdate] = useState('');
  
    const registerUser = async () => {
      const url = 'http://192.168.0.114:3000/auth/register';
      const headers = {
        'Content-Type': 'application/json',
      };
  
      const userData = {
        username,
        email,
        password,
        gender,
        number,
        birthdate,
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(userData),
          timeout: 10000, // Set a timeout value in milliseconds
        });
  
        if (!response.ok) {
          console.error(`HTTP error! Status: ${response.status}`);
          const errorText = await response.text();
          console.error(errorText); // Log the response text for more details
          throw new Error(`HTTP error! Status: ${response.status}\n${errorText}`);
        }
  
        const responseData = await response.json();
        console.log(responseData); // Handle success
        // Navigate to the next screen or perform any other action upon successful registration
        navigation.navigate('Choose');
      } catch (error) {
        console.error('Error during registration:', error); // Handle error
        // Display an error message or take appropriate action
      }   };
  
    return (
      <View style={styles.container}>
        <Text style={styles.inscrire2}>S'inscrire gratuitement !</Text>
  
        <View style={styles.inputView2}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nom d'utilisateur"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputView2}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView3}>
          <TextInput
            style={styles.TextInput}
            placeholder="Mot de passe"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputView2}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Sélectionnez le genre" value="" style={styles.TextInput5} />
          <Picker.Item label="Homme" value="Homme" style={styles.TextInput31}/>
          <Picker.Item label="Femme" value="Femme" style={styles.TextInput31}/>
          <Picker.Item label="Autre" value="Autre" style={styles.TextInput31}/>
        </Picker>
        </View>
        <View style={styles.inputView2}>
          <TextInput
            style={styles.TextInput}
            placeholder="Numéro de téléphone"
            value={number}
            onChangeText={(text) => setNumber(text)}
          />
        </View>
        <View style={styles.inputView2}>
          <TextInput
            style={styles.TextInput}
            placeholder="Date de naissance"
            value={birthdate}
            onChangeText={(text) => setBirthdate(text)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={registerUser}>
          <Text style={styles.loginText}>S'inscrire</Text>
        </TouchableOpacity>
  
        <Text style={styles.ContinueravecText}>Ou continuer avec</Text>
  
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 20,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={styles.oauthBtn}
            onPress={() => navigation.navigate('OnBoarding3')}>
            <Image
              style={styles.image2}
              source={require('./assets/Facebook.png')}
            />
            <Text style={styles.oauthTxt}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.oauthBtn}
            onPress={() => navigation.navigate('Settings')}>
            <Image style={styles.image2} source={require('./assets/google.png')} />
            <Text style={styles.oauthTxt}>Google</Text>
          </TouchableOpacity>
        </View>
  
        <TouchableOpacity
          style={styles.FPBtn}
          onPress={() => navigation.navigate('Home')}>
          <Text>
            <Text style={styles.ForgetText2}>J'ai déjà un compte</Text>
            <Text style={styles.ForgetText}>   Se connecter</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  class ChoosePreferences extends React.Component {
      state = {
        data: [
          {
            "name": "         Art",
            "pr": 1,
            "photo": "https://i.postimg.cc/d1RQyTb0/artwhite.png",
            "photo2": "https://media1.giphy.com/media/RHK19LIfY81NbpnpjZ/giphy.gif?cid=6c09b952itomdphrvcuu1t899apyyjuwj4g7ta7rwik3wd8j&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          },
          {
            "name": "     Musique",
            "pr": 1,
            "photo": "https://i.postimg.cc/15MtBTvr/musical-note.png",
            "photo2": "https://media1.giphy.com/media/sUAyWJTEB1XJsOg0hs/200w.gif?cid=6c09b952q8s2yksrum2mizvlipw96j9fwd8m6sp1l3m4b6pb&ep=v1_gifs_search&rid=200w.gif&ct=s"
          },
          {
            "name": "      Sport",
            "pr": 1,
            "photo": "https://i.postimg.cc/g2FWvKWH/sports.png",
            "photo2": "https://media1.giphy.com/media/TdRLRrC6z0601YYTf4/giphy.gif?cid=6c09b952udjgesnhes3c9c4dmq4uyfyjhooye1vysgltsjvv&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
          },
          {
            "name": "       Food",
            "pr": 1,
            "photo": "https://i.postimg.cc/2j1yGTPs/restaurant.png",
            "photo2": "https://media1.giphy.com/media/qMntr6DEZ8E4o/giphy.gif"
          },
          {
            "name": "       Soirée",
            "pr": 1,
            "photo": "https://i.postimg.cc/vHRYzy7n/multiple-users-silhouette.png",
            "photo2": "https://i.pinimg.com/originals/6e/7b/6b/6e7b6bc29c2f1cb94511a9d4697fe5fe.gif"
          },
          {
            "name": "  Technologie",
            "pr": 1,
            "photo": "https://i.postimg.cc/6QH6LGz6/smartphone.png",
            "photo2": "https://media1.giphy.com/media/h1QmJxwoCr19BtTkGt/giphy.gif?cid=6c09b9522demlz98401uu4xrkvc39ovsxkiws9pi116ihq6a&ep=v1_gifs_search&rid=giphy.gif&ct=s"
          },
          {
            "name": "Photographie",
            "pr": 1,
            "photo": "https://i.postimg.cc/nrbyvF8c/photo-camera-interface-symbol-for-button.png",
            "photo2": "https://media3.giphy.com/media/xcFJX6T9z2iqiB9Ud9/giphy.gif?cid=6c09b952ag8kx7eu66j2uh1pmdanloxcntq9uv54u39bbmq2&ep=v1_gifs_search&rid=giphy.gif&ct=s"
          },
          {
            "name": "     Football",
            "pr": 1,
            "photo": "https://img.freepik.com/premium-vector/soccer-ball-flying-sketch-hand-drawn-sports-football-vector-illustration_666729-600.jpg",
            "photo2": "https://i.postimg.cc/VLJwSZTr/giphy.gif"
          },
          {
            "name": " Automoblie",
            "pr": 1,
            "photo": "https://i.postimg.cc/gjHT83qN/sedan.png",
            "photo2": "https://i.gifer.com/4jwo.gif"
          },
          {
            "name": "         LoL",
            "pr": 1,
            "photo": "https://i.postimg.cc/8z50fJFm/game-control.png",
            "photo2": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/15ba3c52-fae3-4469-b761-ff782a879bf8/dcsah9d-f016441e-99ae-4592-9954-0e6430587de7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE1YmEzYzUyLWZhZTMtNDQ2OS1iNzYxLWZmNzgyYTg3OWJmOFwvZGNzYWg5ZC1mMDE2NDQxZS05OWFlLTQ1OTItOTk1NC0wZTY0MzA1ODdkZTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Ub2oK_D7tY7vK4yBv0ADbef5vq3SGDI1aL4lpclIuko"
          }
        ],        
        showModal: false,
        fadeInAnim: new Animated.Value(0),
        
      }
    
      componentDidMount() {
        this.animate();
      }
      animate() {
        Animated.timing(this.state.fadeInAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    
      renderModalContent = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('./assets/logo2.gif')} style={{ width: 300, height: 300 }} />
          <Text>Félicitation, vous avez terminer la création de votre compte UnBored</Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: '#E1604D',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          onPress={() => this.props.navigation.navigate('Accueil3')}>
            <Text style={{ color: 'white' }}>Commencer l'aventure UnBored !</Text>
          </TouchableOpacity>
        </View>
      );

      renderItem = ({ item }) => (
        <Animated.View
          style={[
            {
              opacity: this.state.fadeInAnim,
              transform: [
                {
                  translateY: this.state.fadeInAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
              ],
            },
            {
              flex: 1,
              alignItems: 'center',
              margin: 10,
              paddingLeft: 120
            },
          ]}>
          <Item item={item} />
        </Animated.View>
      );
    

      render(){
        return (
          <View style={styles.container4}>
            <Text style={styles.headerText}>Selectionner vos intêrets</Text>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              numColumns={2}
            />
            <TouchableOpacity
          style={{width: '80%',right:-31,borderRadius: 25,height: 50,alignItems: 'center',justifyContent: 'center',marginTop: 20,marginBottom: 20,backgroundColor: '#E1604D',borderColor: '#b3b3b3',borderWidth: 1,} }
          onPress={() => this.setState({ showModal: true })}>
          <Text style={{fontSize:20}}>Suivant</Text>
        </TouchableOpacity>
        <Modal visible={this.state.showModal} transparent={false}>
          {this.renderModalContent()}
        </Modal>
          </View>
        );
      }
    }
    function Item({ item }) {
      const [click, setClick] = useState(false);
    
      const togglePhoto = () => {
        setClick(!click);
      };
    
      return (
        <View style={styles.listItem}>
          <TouchableOpacity
            onPress={togglePhoto}
            style={{
              paddingBottom: -100,
              borderRadius: 25,
              borderWidth: 2,
              borderColor: "#F5F5F5",
              height: click ? 170 : 150,
              width: click ? 150 : 130,
              left: -60,
              backgroundColor: click ? '#E1604D' : 'white',
              alignItems: "center",
              justifyContent: "center",      
            }}
          >
            <Image source={{ uri: click ? item.photo2 : item.photo }} style={{ width: 100, height: 100, bottom: -10 }} />
            <Text style={{ paddingBottom: -100, color: click ? 'white' : '#E1604D', alignItems: "center", width: 100, bottom: -15 }}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
      class OTP2 extends React.Component {
        render() {
          return (
            <View style={styles.container}>
          <OTP/>
            </View>
          );
        }
      }
      
  const AppNavigator = createStackNavigator(
    {
      Home: {
        screen : HomeScreen,
        navigationOptions : {
          ...TransitionPresets.SlideFromRightIOS,
        },
      },
      ForgetPassword: {
        screen : ForgetPasswordScreen,
        navigationOptions : {
          ...TransitionPresets.DefaultTransition
        },
      },
      Choose: { screen : ChoosePreferences,
        navigationOptions : {
          ...TransitionPresets.FadeFromBottomAndroid,
        },
      },
      CreateAccount: { screen : CreateAccount,
        navigationOptions : {
          ...TransitionPresets.SlideFromRightIOS,
        },
      },
      OTP2 : { screen : OTP2,
        navigationOptions : {
          ...TransitionPresets.ModalSlideFromBottomIOS
        },
      },
      OTP3 : { screen : OTP3,
        navigationOptions : {
          ...TransitionPresets.ModalTransition,
        },
      },
      OnBoarding3: { screen : OnBoarding3,
        navigationOptions : {
          ...TransitionPresets.RevealFromBottomAndroid,
        },
      },
      Accueil3: { screen :Accueil3,
        navigationOptions : {
          ...TransitionPresets.SlideFromRightIOS,
        },
      },
      Settings: { screen : Settings,
        navigationOptions : {
          ...TransitionPresets.ScaleFromCenterAndroid,
        },
      },
    },
    {
      headerMode:false,
      initialRouteName: 'CreateAccount',
    },
  );
  const AppContainer = createAppContainer(AppNavigator);
  export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

 const styles = StyleSheet.create({
  listItem:{
    margin:10,
    padding:70,
    paddingVertical: -10,
    backgroundColor:"white",
    flex:1/2,
    flexDirection:"column",
  },
  container4: {
    flex: 1,
    paddingTop: 60,
    flexDirection: 'column',
    backgroundColor:"#ffffff"
  },
    titleStyle: {
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "stretch",
    },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 50,
    width: 200,
    height: 190,
  },
  image4: {
    marginBottom: 10,
    width: 200,
    height: 190,
  },
  image2: {
    width: 20,
    height: 20,
  },
  image3: {
    width: 80,
    height: 80,
  },
  inputView: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 20,
    borderColor: '#b3b3b3',
    borderWidth: 1,
  },
  inputView2: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 10,
    borderColor: '#b3b3b3',
    borderWidth: 1,
  },
  inputView3: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginBottom: 10,
    borderColor: '#b3b3b3',
    borderWidth: 1,
    overflow:'hidden',
  },
  TextInput: {
    height: 45,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    position: 'absolute',
    color: '#E1604D',
  },
  TextInput31: {
    height: 45,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    position: 'absolute',
    color: '#E1604D',
  },
  TextInput5: {
    marginTop:30,
    textAlign:'center',
    color: 'grey',
  },
  loginText: {
    fontSize: 20,
  },
  ForgetText: {
    fontSize: 12,
    color: '#E1604D',
  },
  ForgetText2: {
    fontSize: 12,
    color: 'black',
  },
  ContinueravecText: {
    fontSize: 20,
  },
  oauthTxt: {
    fontSize: 20,
  },
  inscrire: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 30,
    marginBottom: 40,

  },
  inscrire4: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 40,

  },
  inscrire3: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 40,

  },
  inscrire2: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 30,
    marginTop:30,
    marginBottom: 30,

  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#E1604D',
    borderColor: '#b3b3b3',
    borderWidth: 1,
  },
  loginBtn2: {
    width: '80%',
    right:-31,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#E1604D',
    borderColor: '#b3b3b3',
    borderWidth: 1,
  },
  FPBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#00000000',
    
  },
  oauthBtn: {
    width: '40%',
    borderRadius: 25,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    
  },
});
