import React from 'react';
import {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import api from "../services/api";
import Constants from 'expo-constants';

const DATA = [
  {
    id: '1',
    title: 'Pergunta 1',
    description: "esta é a descricao da pergunta 1 muito longa e complexa",
  },
  {
    id: '2',
    title: 'Pergunta 2',
    description: "esta é a descricao da pergunta 2 muito longa e complexa",
  },
  {
    id: '3',
    title: 'Pergunta 3',
    description: "esta é a descricao da pergunta 3 muito longa e complexa",
  },
  {
    id: '4',
    title: 'Pergunta 4',
    description: "esta é a descricao da pergunta 4 muito longa e complexa",
  },
  {
    id: '5',
    title: 'Pergunta 5',
    description: "esta é a descricao da pergunta 5 muito longa e complexa",
  },
  {
    id: '6',
    title: 'Pergunta 6',
    description: "esta é a descricao da pergunta 6 muito longa e complexa",
  },
];
function Item({ title, description }) {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      <TouchableOpacity onPress={()=>{}}>
        <Text style={styles.productButton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
  export default class Main extends Component{
    static navigationOptions = {
      title: "Ajuda"
    };
    /*
    componentDidMount(){
      this.loadItens();
    }
    loadItens = async () =>{
      const response = await api.get('/products');
      const {docs} = response.data;
    };*/
    render(){
      return(
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
              <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} description={item.description} />}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
        </ScrollView>
          
      );
    }
    
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
    sectionDescription: {
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
  

  