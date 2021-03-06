import Autocomplete from 'react-native-autocomplete-input';
//Autocomplete da api não funciona direito, não é clicavel
import React, { useState, useEffect, useRef } from 'react'; 
import { Freshchat, FreshchatConfig, FreshchatUser } from 'react-native-freshchat-sdk';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const APP_ID = 'ea1ee161-936d-4ff9-9c6e-0aa58391fb4e';
const APP_KEY = 'edfb0d0e-a1db-43ed-8693-007b1d73a47a';
var freshchatConfig = new FreshchatConfig(APP_ID, APP_KEY);
freshchatConfig.teamMemberInfoVisible = true;
freshchatConfig.cameraCaptureEnabled = true;
freshchatConfig.gallerySelectionEnabled = true;
freshchatConfig.responseExpectationEnabled = true;
Freshchat.init(freshchatConfig);
import {
  StatusBar,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PixelRatio,
} from 'react-native';
//https://www.reactnativeschool.com/migrating-from-component-state-to-hooks-for-a-fetch-request

//Freshchat
import Constants from 'expo-constants';
var freshchatUser = new FreshchatUser();
freshchatUser.firstName = "Fernando";
freshchatUser.lastName = "Santos";
freshchatUser.email = "fernandowsantos@hotmail.com";
freshchatUser.phoneCountryCode = "+55";
freshchatUser.phone = "18996790901";
Freshchat.setUser(freshchatUser, (error) => {
    console.log(error);
});

var userPropertiesJson = {
  "user_type": "Paid",
  "plan": "Gold"
}



function Itens({ title, deion }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDeion}>{deion}</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('Chat')}}>
        <Text style={styles.productButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
const useSwapiPeople = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
      setLoading(true);
      fetch(`https://swapi.co/api/people?page=${page}`)
        .then(res => res.json())
        .then(res => {
          setPeople([...people, ...res.results]);
          setLoading(false);
        });
    },[page]);
  
  const loadMore = () => {
    setPage(page + 1);
  };
  
  return {
    people,
    loading,
    loadMore,
  };
};
/*
const useSwapiSearch = () =>{
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = event => {
     setSearchTerm(event.target.value);
   };
   useEffect(() => {
     setSearchResults([]);
     fetch(`https://swapi.co/api/people?search=${searchTerm}`)
     .then(res => res.json())
     .then(res =>{
       setSearchResults(...searchResults,...res.results);
     });
   },[searchTerm]);
   return{
    searchTerm,
    searchResults,
    handleChange,
   };
};*/

/*function Auto () {
 const{
  searchTerm,
  searchResults,
  handleChange,
 } = useSwapiSearch();

  return(
    <TextInput style={styles.input} 
    underlineColorAndroid="#FFF" 
    placeholderTextColor="#C0C0C0" 
    placeholder="Procurar"
    onChange = {handleChange}
    value = {searchTerm}
    renderItem={({ searchResults }) => ( 
      <TouchableOpacity onPress={() => ({ search: searchResults.name })}>
        <Text style={styles.itemText}>
          {searchResults.name}
        </Text>
      </TouchableOpacity>
    )}
    />   
  );
}*/
  export default function Main({navigation}) {
    const { people, 
      loading, 
      loadMore,
     } = useSwapiPeople();
     /*const{
      searchTerm,
      searchResults,
      handleChange,
     } = useSwapiSearch();*/
      return(
        //Comentário de multiplas linha shift + alt + a
        //Texto Ajuda enquanto nao tem a navegação
        //SafeAreaView Funciona no IOS mas não no android <Auto />
        /*
                <View style={styles.container}>
                  <Auto />
                </View>
        */
              <View style={styles.screen}>
                <StatusBar backgroundColor="#DA552F" barStyle="light-content" />
                <View>
                  <Text style={styles.header}>Ajuda </Text>
                </View>
                <View style={styles.container}>
                  <FlatList
                    data={people}
                    keyExtractor={(item) => item.url}
                    renderItem={({ item, index }) => <Itens id={index} title={item.name} deion={item.homeworld} />}
                    ListFooterComponent={
                      loading ? (
                        <ActivityIndicator />
                      ) : (
                        <Button title="Carregar Mais" onPress={loadMore} />
                      )
                    }
                  />
                </View>
              </View>
          );
  };
  Main.navigationOptions = {
    title: "Ajuda",
    alignSelf:'center',
        headerStyle:{
            backgroundColor: "#DA552F"
        },
    headerTintColor: "#FFF"
  };
  const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
    },
    screen:
    {
      marginTop: 0,
      marginBottom: (100),
    },
    scrollView: {
      backgroundColor: "#FFF",
    },
    header:{
      backgroundColor: "#DA552F",
      textAlign: "center",
      color: "#FFF",
      borderColor: "transparent"
    },
    input: {
      borderWidth: 1,
      margin:0,
      borderColor: "transparent",
      margin: 0,
      padding:0,
      paddingLeft:15,
      paddingRight:15,
      borderTopColor: "#FFF",
      backgroundColor: "#DA552F",
    },
    autocompleteContainer: {
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 1
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: "#FFF",
    },
    productButton:{
      margin: 10,
      padding: 20,
      borderWidth: 1,
      borderRadius:5,
      backgroundColor: "#DA552F",
      textAlign: "center",
      color: "#FFF",
      borderColor: "#FFF"
    },
    sectionContainer: {
      margin: 10,
      padding: 20,
      borderWidth: 1,
      borderRadius:5,
      borderColor: "#DDD"
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: "#000",
    },
    sectionDeion: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color:  "#000",
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color:  "#000",
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });
