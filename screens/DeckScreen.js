import React, { Component } from 'react'
import { SafeAreaView, View, Button, StyleSheet, Text, BackHandler } from 'react-native';
// import { NativationAction } from '@react-navigation/web's

export class DeckScreen extends Component {
    

    handleAddCard = () => {
        const { key, title, questions } = this.props.route.params;
        this.props.navigation.navigate('AddCard', {key, title, questions})
    }

    handleStartQuiz = () => {
        const { title, questions } = this.props.route.params;
        if(questions.length == 0) {
            alert('Empty Card')
        } else {
            this.props.navigation.navigate('Quiz', { questions, title })
        }  
    }


    handleBackButton = () => {
      this.props.navigation.navigate('HomeScreen')
    }

    componentWillUnmount() {
      this.props.route.params.getData()
    }

    
    render() {
        const { key, title, questions } = this.props.route.params;
        // console.log(this.props.route.params)
        const len = questions.length
        return (
            <View style={styles.container}>
              <View style={styles.text}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.cardCount}>
                      {len} card{len === 0 || len === 1 ? '' : 's'}
                  </Text>
              </View>
                
                <View style={styles.button}>
                  <Button title="Add Card" color="green" onPress={this.handleAddCard} />
                </View>
                
                <View style={styles.button}>
                  <Button title="Start Quiz" onPress={this.handleStartQuiz} />
                </View>
                
            </View>
        )
    }
}

export default DeckScreen

const styles = StyleSheet.create({
    title: {
      height: 40,
      paddingTop: 10,
      fontSize: 24,
      fontWeight: '700',
    },
    container: {
      flex: 1,
      // alignItems: 'center',
      justifyContent: 'center',
      padding: 50,
      backgroundColor: '#fff',
    },
    cardCount: {
        color: 'lightgray',
        marginBottom: 30,
      },
    button: {
      marginTop: 10
    },
    text: {
      alignItems: 'center',
    }
  });
