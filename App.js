import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  FlatList,
  FAB,
  TouchableOpacity,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack'
import React, {useState} from 'react';


class HomeScreen extends React.Component {
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
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Mot de passe"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate('Choose')}>
          <Text style={styles.loginText}>LOGIN</Text>
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
  function Item({ item , index}) {
    const [click, setclick] = useState(null);
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={() =>{setclick(item.pr = item.pr * - 1);}} style={{paddingBottom: -100,borderRadius: 25, borderWidth: 1,borderColor: "#F5F5F5",height:160,width:140, left: -60, backgroundColor : item.pr == 1 ? 'white' : '#E1604D'} }>
        <Image source={{uri:item.photo}}  style={{width:100, height:100, left: 20, bottom: -10}} />
        <Text style={{paddingBottom: -100, color: item.pr == -1 ? 'white' : '#E1604D', alignItems:"center", width:100 , bottom:-15, right: -20}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
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
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.loginText}>Confirmer</Text>
        </TouchableOpacity>
        </View>
        </NavigationContainer>
      );
          }
  }

  class CreateAccount extends React.Component {
    render() {
      return (
        <NavigationContainer>
        <View style={styles.container}>
        <Image style={styles.image4} source={require('./assets/logo2.gif')} />
          <Text style={styles.inscrire2}>S'inscrire gratuitement !</Text>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Nom"
            />
          </View>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Prénom"
            />
          </View>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email"
            />
          </View>
          <View style={styles.inputView2}>
            <TextInput
              style={styles.TextInput}
              placeholder="Mot de passe"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('Choose')}>
            <Text style={styles.loginText}>S'inscrire</Text>
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
                source={require('./assets/google.png')}
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
          <TouchableOpacity
            style={styles.FPBtn}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text><Text style={styles.ForgetText2}>J'ai déja un compte</Text><Text style={styles.ForgetText}>   Se connecter</Text></Text>
          </TouchableOpacity>
        </View>
        </NavigationContainer>
      );
          }
  
  }
  class ChoosePreferences extends React.Component {
      state = {
        data:[
            {
                "name": "         Art",
                "email": "miyah.myles@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/d1RQyTb0/artwhite.png"
            },
            {
                "name": "     Musique",
                "email": "june.cha@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/15MtBTvr/musical-note.png"
            },
            {
                "name": "      Sport",
                "email": "iida.niskanen@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/g2FWvKWH/sports.png"
            },
            {
                "name": "       Food",
                "email": "renee.sims@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/2j1yGTPs/restaurant.png"
            },
            {
                "name": "      Soirée",
                "email": "jonathan.nu\u00f1ez@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/vHRYzy7n/multiple-users-silhouette.png"
            },
            {
                "name": "  Technologie",
                "email": "sasha.ho@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/6QH6LGz6/smartphone.png"
            },
            {
                "name": "Photographie",
                "email": "abdullah.hadley@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/nrbyvF8c/photo-camera-interface-symbol-for-button.png"
            },
            {
                "name": "     Football",
                "email": "thomas.stock@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/2Scg0Fpt/football.png"
            },
            {
                "name": "  Automoblie",
                "email": "veeti.seppanen@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/gjHT83qN/sedan.png"
            },
            {
                "name": "         LoL",
                "email": "bonnie.riley@gmail.com",
                "pr":1,
                "photo": "https://i.postimg.cc/8z50fJFm/game-control.png"
            }
        ]
      }
    
    
      render(){
        return (
          <View style={styles.container4}>
            <Text style={styles.headerText}>Selectionner vos intêrets</Text>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <Item item={item}/>}
              keyExtractor={item => item.email}
              numColumns={2}
            />
            <TouchableOpacity
          style={{width: '80%',right:-31,borderRadius: 25,height: 50,alignItems: 'center',justifyContent: 'center',marginTop: 20,marginBottom: 20,backgroundColor: '#E1604D',borderColor: '#b3b3b3',borderWidth: 1,} }
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={{fontSize:20}}>Suivant</Text>
        </TouchableOpacity>
          </View>
        );
      }
    }
    
    
    
  const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      ForgetPassword: ForgetPasswordScreen,
      Choose: ChoosePreferences,
      CreateAccount: CreateAccount,
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
    FlatListContainer: {
    height: 540,
    color: '#E1604D',
    },
    listContainer: {
    color: '#E1604D',

    },
  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  background: {
    color : '#E1604D',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  GridViewContainer: {
    justifyContent: 'center',
    borderRadius: 25,
    alignItems: 'center',
    height: 190,
    width: 190,
    margin: 5,
    backgroundColor: '#f5f5f5',
    borderColor: '#b3b3b3',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#E1604D',
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  TextInput: {
    height: 45,
    flex: 1,
    padding: 10,
    marginLeft: 0,
    position: 'absolute',
    color: '#E1604D',
  },
  loginText: {
    fontSize: 20,
  },
  prout: {
    fontSize: 15,
  },
  ForgetText: {
    fontSize: 12,
    color: '#E1604D',
  },
  ForgetText2: {
    fontSize: 12,
    color: 'Black',
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
    fontSize: 16,
    fontWeight: 'bold',
    height: 30,
    marginBottom: 10,

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
  selectPref: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#E1604D',
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
