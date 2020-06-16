import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, Platform, ScrollView, TouchableOpacity } from 'react-native';
import DeckList from '../components/DeckList'
import { getDecks } from '../storage/DeckStore'
// import { NavigationEvent } from 'react-navigation'

export class HomeScreen extends Component {
  
    constructor(props) {
        super(props)
    
        this.state = {
            decks: {},
            loading: true
        }
    }

    getData = async () => {
      let decks = await getDecks()
      decks = JSON.parse(decks);
      this.setState({
        decks,
        loading: false
      })
    } 

     componentDidMount() {
      this.getData()
    }

    handleAddDeck = () => {
      this.props.navigation.navigate('AddDeck', {getData: () => this.getData()})
    }
    
    render() {
        const { decks, loading } = this.state
        const data = []
        let deckList
        if(decks == null) {
          deckList = {}
        } else {
          deckList = decks
        }
        Object.entries(deckList).forEach(([key, values]) => {
            data.push({key, ...values})
        })

        let page
        if(loading) {
          page = <Text>Loading...</Text>
        } else if(decks == null) {
          page = (
            <View style={styles.welcome}>
                <Text style={styles.welcomeText}>Welcome, you have no deck.</Text>
                <Text onPress={this.handleAddDeck}> Tap to add a deck</Text>
            </View>
            
          )
        } else {
          page = (
            <ScrollView>
              <DeckList data={data} navigation={this.props.navigation} getData={() => this.getData()} />
              <TouchableOpacity style={styles.add} onPress={this.handleAddDeck}>
                <Text style={styles.addText}>Add Deck</Text>
              </TouchableOpacity>
            </ScrollView>
          )
        }
        return (
            <View style={styles.container}>
                {page}
            </View>
        )
    }
}

HomeScreen.navigationOptions = {
  header: null,
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    padding: 50,
    justifyContent: 'center',
  },
  welcome: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
  },
  add: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#67a6d6'
  },
  addText: {
    fontSize: 15,
    fontWeight: '700',
    padding: 10
  }
});
