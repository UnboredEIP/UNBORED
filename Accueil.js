
import React, { useRef, useEffect, useState } from 'react';

import { View, Text, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Image, ScrollView, FlatList, TextInput, TouchableOpacity } from 'react-native';

import './asset/SourceSansPro-Regular.otf';
import book from "./asset/bookmark.png"
import notifications from "./asset/notifications.png"
import filter from "./asset/filter.png"
import search from "./asset/search.png"
import pir from "./asset/pir.jpg"


import data from "./value.json"

import img1 from "./asset/img-1.png"
import img2 from "./asset/img-2.png"
import img3 from "./asset/img-3.png"
import img4 from "./asset/img-4.png"
import img5 from "./asset/img-5.png"
import img6 from "./asset/img-6.png"

import loc from "./asset/location_on.png"
import vector from "./asset/Vector.png"



function Accueil3() {
    const [text, setText] = useState('');
    const [choice, setChoice] = useState(0);
    useEffect(() => {
        console.log(choice)
    }, [choice])
    return(
        <ScrollView horizontal={false} nestedScrollEnabled={true} style={{marginLeft: 5+'%', width:100+'%', height:100+'%'}}>
            <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
                <View style={{flex:1}}>
                <View style={{top: "15%", display:'flex', flexDirection:'row', width:"85%", alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:26,  color:'black'}}>   Bonjour Rémi !</Text>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={{width:44, height:44, justifyContent:'center', backgroundColor:'#5265FF1A', borderRadius: 12, alignItems:'center'}}>
                            <Image style={{height:19, width:15}} source={notifications}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft:10, width:44, height:44, justifyContent:'center', backgroundColor:'#5265FF1A', borderRadius: 12, alignItems:'center'}}>
                            <Image style={{height:20, width:14}} source={book}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{top:20+'%',display:'flex', flexDirection:'row', width:85+'%'}}>
                    <View>
                    <TextInput
                        style={{height: 45, backgroundColor:'#F4F6F9', width:270, borderRadius:100, justifyContent: 'center', paddingLeft:24, paddingRight:24}}
                        placeholder="Rechercher"
                        placeholderTextColor={'grey'}
                        onChangeText={newText => setText(newText)}
                        defaultValue={text}
                    />
                    <Image style={{ position:'absolute', top:15, right:25, height:17, width:17}} source={search}></Image>
                    </View>
                    <TouchableOpacity style={{marginLeft:10, width:44, height:44, justifyContent:'center', backgroundColor:'#5265FF1A', borderRadius: 12, alignItems:'center'}}>
                        <Image style={{height:20, width:14}} source={filter}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{top:26+'%', flexDirection:'row', justifyContent:'space-between', width:85+'%'}}>
                <Text style={{fontWeight:'bold'}}>Recommandé</Text>
                <TouchableOpacity onPress={() => console.log('voir tout')}>
                    <Text style={{fontWeight:'bold', color:'#E1604D'}}>Voir tout</Text>
                </TouchableOpacity>
                </View>
                <View style={{top:40+'%', height:160, width:370, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:90+'%', width:'90%'}}source={pir}></Image>
                    <View style={{position:'absolute', left:40, top:"30%" }}>
                    <Text style={{color:'white', fontSize:20, fontWeight:600}}>Musée du Louvre</Text>
                    <TouchableHighlight onPress={() => console.log('Reserver')} style={{marginTop:20, width:103, height:37, borderRadius:20, backgroundColor:'#E1604D',justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'white', }}>Réserver</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                <View style={{top:38+'%', flexDirection:'row', justifyContent:'space-between', width:85+'%'}}>
                <Text style={{fontWeight:'bold'}}>En tendance</Text>
                <TouchableOpacity onPress={() => console.log('voir tout')}>
                    <Text style={{fontWeight:'bold', color:'#E1604D'}}>Voir tout</Text>
                </TouchableOpacity>
                </View>
                <View style={{position:'relative',top:56+'%', height:47,  width:90  +'%'}}>
                <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={()=> setChoice(0)} style={{height:45, width:89, backgroundColor:choice === 0 ? '#E1604D' : 'white' , marginRight:10, justifyContent:'center', borderRadius:24, borderWidth:choice === 0 ? 0 : 2, borderColor:choice === 0 ? 'white' : '#E1604D'}}>
                        <Text style={{color: choice === 0 ? 'white' : '#E1604D', fontWeight:700, textAlign:'center'}}>Tout</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setChoice(1)} style={{height:45, width:89,  backgroundColor:choice === 1 ? '#E1604D' : 'white' , marginRight:10, justifyContent:'center', borderRadius:24, borderWidth:choice === 1 ? 0 : 2, borderColor:choice === 1 ? 'white' : '#E1604D'}}>
                        <Text style={{color: choice === 1 ? 'white' : '#E1604D', fontWeight:700, textAlign:'center'}}>Art</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setChoice(2)} style={{height:45, width:89,  backgroundColor:choice === 2 ? '#E1604D' : 'white' , marginRight:10, justifyContent:'center', borderRadius:24, borderWidth:choice === 2 ? 0 : 2, borderColor:choice === 2 ? 'white' : '#E1604D'}}>
                        <Text style={{color: choice === 2 ? 'white' : '#E1604D', fontWeight:700, textAlign:'center'}}>Musique</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> setChoice(3)} style={{height:45, width:89,  backgroundColor:choice === 3 ? '#E1604D' : 'white' , marginRight:10, justifyContent:'center', borderRadius:24, borderWidth:choice === 3 ? 0 : 2, borderColor:choice === 3 ? 'white' : '#E1604D'}}>
                        <Text style={{color: choice === 3 ? 'white' : '#E1604D', fontWeight:700, textAlign:'center'}}>Sport</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setChoice(4)} style={{height:45, width:89,  backgroundColor:choice === 4 ? '#E1604D' : 'white' , marginRight:10, justifyContent:'center', borderRadius:24, borderWidth:choice === 4 ? 0 : 2, borderColor:choice === 4 ? 'white' : '#E1604D'}}>
                        <Text style={{color: choice === 4 ? 'white' : '#E1604D', fontSize:10, fontWeight:700, textAlign:'center'}}>Autre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> setChoice(5)} style={{height:45, width:89,  backgroundColor:choice === 5 ? '#E1604D' : 'white' , marginRight:10, justifyContent:'center', borderRadius:24, borderWidth:choice === 5 ? 0 : 2, borderColor:choice === 5 ? 'white' : '#E1604D'}}>
                        <Text style={{color: choice === 5 ? 'white' : '#E1604D', fontSize:8, fontWeight:700, textAlign:'center'}}>Technologies</Text>
                    </TouchableOpacity>
                </ScrollView>

                </View>
                {/* <View style={{position:'relative', height:1000}}></View> */}

                </View>
            </TouchableWithoutFeedback>



            <View style={{position:'relative', top:200,  flex:1, height:50+'%',width:90+'%', paddingBottom:230}}>
                <ScrollView showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} horizontal={true}>


                    { choice === 0 || choice == 1 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img1}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>{data[0]["1"]["date"]}</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["1"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0][1]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["1"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["1"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                    }


                { choice == 2 || choice == 0 ? 
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img2}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>{data[0]["2"]["date"]}</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["2"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0]["2"]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["2"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["2"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }
                { choice == 0 || choice == 1 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img1}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>19 Dec</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>Mais où est Charlie ?</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0][1]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["1"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["1"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }
                </ScrollView>
                </View>
                {choice == 0 || choice == 4 ?
                <View style={{top:0, marginBottom:20,flexDirection:'row', justifyContent:'space-between', width:85+'%'}}>
                <Text style={{fontWeight:'bold'}}>Proche de vous</Text>
                <TouchableOpacity onPress={() => console.log('voir tout')}>
                    <Text style={{fontWeight:'bold', color:'#E1604D'}}>Voir tout</Text>
                </TouchableOpacity>
                </View> : <View></View>
                }




                <View style={{position:'relative', top:0, paddingBottom:30}}>
                <ScrollView showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} horizontal={true}>

                { choice == 0 || choice == 4 ?
                <View style={{marginBottom:30, borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img3}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>{data[0]["3"]["date"]}</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["3"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0]["3"]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["3"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["3"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }


            { choice == 0 || choice == 4 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img4}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>{data[0]["4"]["date"]}</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["4"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0]["4"]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["4"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["4"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }

            { choice == 0 || choice == 4 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img4}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>19 Dec</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["4"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0]["4"]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["1"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["1"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }
                </ScrollView>
                {choice == 0 || choice == 3 || choice == 1 ?
                <View style={{top:0, marginBottom:20,flexDirection:'row', justifyContent:'space-between', width:85+'%'}}>
                <Text style={{fontWeight:'bold'}}>Nouvelle événement</Text>
                <TouchableOpacity onPress={() => console.log('voir tout')}>
                    <Text style={{fontWeight:'bold', color:'#E1604D'}}>Voir tout</Text>
                </TouchableOpacity>
                </View> 
                : <View></View>
                }

                {choice == 5 ?
                <View style={{top:0, marginBottom:20,flexDirection:'row', justifyContent:'space-between', width:85+'%'}}>
                <Text style={{fontWeight:'bold', color:'grey'}}>Pas de nouveaux événements...</Text>
                </View> 
                : <View></View>
                }
                <View style={{position:'relative', top:0,paddingBottom:0, width:90+'%'}}>
                <ScrollView showsHorizontalScrollIndicator={false} nestedScrollEnabled={true} horizontal={true}>
                {choice == 0 || choice == 3 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img5}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>{data[0]["5"]["date"]}</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["5"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0]["5"]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["5"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["5"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }
                {choice == 0 || choice == 1 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img6}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>{data[0]["6"]["date"]}</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>{data[0]["6"]["title"]}</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0]["6"]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["6"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["6"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }
                {choice == 0 || choice == 1 ?
                <View style={{borderWidth:1, borderColor:'#EBEEF2', marginRight:10, height:267, width:220, borderRadius:20, overflow:'hidden'}}>
                    <Image style={{height:50+'%', width:100+'%', resizeMode:'cover'}} source={img1}></Image>
                    <View style={{position:'absolute', top: 16, height:29, width:56, right:10+'%', backgroundColor:'white', borderRadius:8, justifyContent:'center'}}>
                        <Text style={{textAlign:'center', color:'#E1604D', fontWeight:600, fontSize:12}}>30 Dec</Text>
                    </View>
                    <View style={{marginLeft:18,width:83+'%', top:20}}>
                        <Text style={{textAlign:'left', color:'black', fontWeight:600, fontSize:15}}>Mais où est Charlie ?</Text>
                        <View style={{marginTop:15, flexDirection:'row'}}>
                        <View style={{width:66, height:22, borderWidth:1, borderColor:'#E1604D', borderRadius:100, justifyContent:'center'}}>
                            <Text style={{fontWeight:600, fontSize:9, color: '#E1604D', textAlign:'center'}}>{data[0][1]["type"]}</Text>
                        </View>
                        <View style={{flexDirection:'row', marginLeft:7}}>
                            <View style={{backgroundColor:'grey', zIndex:2, width:24, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>M</Text>
                            </View>
                            <View style={{backgroundColor:'grey', zIndex:1, width:24, left:-10, height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>A</Text>
                            </View>
                            <View style={{backgroundColor:'grey', width:24, left:-20,height:24, borderRadius:100, borderWidth:1, borderColor:'white', justifyContent:'center'}}>
                                <Text style={{fontSize:10, textAlign:'center', color:'white'}}>C</Text>
                            </View>
                        </View>
                        <Text style={{textAlign:'center', marginTop:5,fontWeight:500, fontSize:8, left:-12}}>{data[0]["1"]["going"] + "K+ y vont"}</Text>
                        </View>
                        <View style={{marginTop: 20, flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row', }}>
                                <Image style={{width:8, height:11}} source={loc}></Image>
                                <Text style={{marginLeft:8, fontSize:10, textAlign:'center'}}>{data[0]["1"]["adress"]}</Text>
                            </View>
                            <Image style={{width:11, height:15}} source={vector}></Image>
                        </View>

                    </View>
                </View> : <View></View>
                }
                </ScrollView>
                </View>
                
            </View>
            
            {/* <View style={{backgroundColor:'blue', width:100+'%', top:300, height:1000}}></View> */}
        </ScrollView>
    )
}

export default Accueil3;