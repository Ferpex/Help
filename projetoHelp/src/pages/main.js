import React, { useState, useEffect } from 'react'; 
import {
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input'; 
//https://www.reactnativeschool.com/migrating-from-component-state-to-hooks-for-a-fetch-request
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import api from "../services/api";
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

  export default function Main() {
    const { people, 
      loading, 
      loadMore,
     } = useSwapiPeople();
      return(
            <View style={styles.container}>
              <Autocomplete>
                <Text>
                  
                </Text>
              </Autocomplete>
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
            </View>
          );
  };
  Main.navigationOptions = {
    title: "Ajuda"
  };
  const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    productButton:{
      margin: 10,
      padding: 20,
      borderWidth: 1,
      borderRadius:5,
      backgroundColor: "#DA552F",
      textAlign: "center"
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
      color: Colors.black,
    },
    sectionDeion: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });
