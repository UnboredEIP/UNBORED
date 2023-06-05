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
      <Image style={styles.image} source={require('./assets/logo2.gif')} />
        <Text style={styles.inscrire}>S'inscrire gratuitement !</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate('Profile')}>
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
        <Text style={{paddingBottom: -100, color: item.pr == -1 ? 'white' : '#E1604D', alignItems:"center", width:100 , bottom:-12, right: -25}}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  class ForgetPasswordScreen extends React.Component {
      state = {
        data:[
            {
                "name": "Miyah Myles",
                "email": "miyah.myles@gmail.com",
                "pr":1,
                "photo": "https://cdn1.iconfinder.com/data/icons/seo-web-17/512/5-512.png"
            },
            {
                "name": "June Cha",
                "email": "june.cha@gmail.com",
                "pr":1,
                "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/44.jpg"
            },
            {
                "name": "Iida Niskanen",
                "email": "iida.niskanen@gmail.com",
                "pr":1,
                "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg"
            },
            {
                "name": "Renee Sims",
                "email": "renee.sims@gmail.com",
                "pr":1,
                "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/65.jpg"
            },
            {
                "name": "Jonathan Nu\u00f1ez",
                "email": "jonathan.nu\u00f1ez@gmail.com",
                "pr":1,
                "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/43.jpg"
            },
            {
                "name": "Sasha Ho",
                "email": "sasha.ho@gmail.com",
                "pr":1,
                "photo": "https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
            },
            {
                "name": "Abdullah Hadley",
                "email": "abdullah.hadley@gmail.com",
                "pr":1,
                "photo": "https:\/\/images.unsplash.com\/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
            },
            {
                "name": "Thomas Stock",
                "email": "thomas.stock@gmail.com",
                "pr":1,
                "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
            },
            {
                "name": "Veeti Seppanen",
                "email": "veeti.seppanen@gmail.com",
                "pr":1,
                "photo": "https:\/\/randomuser.me\/api\/portraits\/men\/97.jpg"
            },
            {
                "name": "Bonnie Riley",
                "email": "bonnie.riley@gmail.com",
                "pr":1,
                "photo": "https:\/\/randomuser.me\/api\/portraits\/women\/26.jpg"
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
          style={styles.loginBtn}
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
          </View>
        );
      }
    }
    
    
    
  const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      ForgetPassword: ForgetPasswordScreen,
    },
    {
      headerMode:false,
      initialRouteName: 'Home',
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
