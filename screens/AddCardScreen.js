import React, { Component } from 'react'
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { addCardToDeck } from "../storage/DeckStore";

export class AddCardScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             question: '',
             answer: ''
        }
    }

    handleQuestion = (text) => {
        this.setState({
            question: text
        })
    }

    handleAnswer = (text) => {
        this.setState({
            answer: text
        })
    }

    handleSubmit = () => {
        const { question, answer } = this.state
        const { key, questions, title } = this.props.route.params
        if(question && answer) {
            const value = [...questions, { question, answer }]
            addCardToDeck(key, value)
            // console.log(value.length)
            this.props.navigation.navigate('Deck', {key, title, questions: value})
        } else {
            alert("Question and answer are required")
        }
    }

    

    render() {
        const { question, anwser } = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Question: </Text>
                <TextInput style={styles.input} value={question} onChangeText={this.handleQuestion} autoFocus={true}/>
                <Text style={styles.label}>Answer: </Text>
                <TextInput style={styles.input} value={anwser} onChangeText={this.handleAnswer} />
                <Button title="Add Card" onPress={this.handleSubmit} />
            </View>
        )
    }
}

export default AddCardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 50,
    },
    sectionInput: {
      paddingVertical: 10,
    },
    label: {
      fontWeight: '700',
      marginBottom: 20
    },
    input: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      height: 40,
      paddingLeft: 10,
      borderWidth: 1,
      marginBottom: 20
    },
  });