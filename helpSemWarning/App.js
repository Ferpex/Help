import React, { useState, useEffect } from 'react'; 
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
  SafeAreaView,
} from 'react-native';
//https://www.reactnativeschool.com/migrating-from-component-state-to-hooks-for-a-fetch-request
import Constants from 'expo-constants';

function Itens({ title, deion }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDeion}>{deion}</Text>
      <TouchableOpacity onPress={()=>{}}>
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
          setPeople([...people, []]);
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

const useSwapiSearch = () => {
  const [text, setText] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch(`https://swapi.co/api/people?search=${text}`)
    .then(res => res.json())
    .then(res =>{
        setOptions(...options,...res.results);
    });
  },[]);

  return {
    text,
    options,
  };
};

  export default function Main() {
    const { people, 
      loading, 
      loadMore,
     } = useSwapiPeople();
     const {text,
      options
    } = useSwapiSearch();
      return(
        //Texto Ajuda enquanto nao tem a navegação
              <View>
                <StatusBar backgroundColor="#DA552F" barStyle="light-content" />
                <View>
                  <Text style={styles.header}>Ajuda</Text>
                </View>
                <View >
                  <TextInput style={styles.input} underlineColorAndroid="#FFF" placeholderTextColor="#C0C0C0" placeholder="Procurar"/>
                </View>
                <SafeAreaView style={styles.container}>
                  <FlatList
                    data={people}
                    renderItem={({ item }) => <Itens title={item.name} deion={item.homeworld} />}
                    keyExtractor={item => item.url}
                    ListFooterComponent={
                      loading ? (
                        <ActivityIndicator />
                      ) : (
                        <Button title="Carregar Mais" onPress={loadMore} />
                      )
                    }
                  />
                </SafeAreaView>
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
      marginTop: Constants.statusBarHeight,
      marginBottom: StatusBar.currentHeight,
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
