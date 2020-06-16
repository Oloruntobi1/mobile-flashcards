import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export class Deck extends Component {

    handleClick = () => {
        const { key, title, questions } = this.props.item
        this.props.navigation.navigate('Deck', { key, title, questions, getData: () => this.props.getData() })
    }
    render() {
        const { title, questions } = this.props.item
        const len = questions.length
        return (
            <TouchableOpacity style={styles.item} onPress={this.handleClick}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.cardCount}>
                  {len} card{len === 0 || len === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
            
        )
    }
}

const styles = StyleSheet.create({
    item: {
      flex: 1, 
      padding: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      borderColor: '#000',
      borderWidth: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: '700'
    },
    cardCount: {
      color: 'lightgray',
    },
  });

export default Deck
