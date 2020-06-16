import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, Button, StyleSheet, Text, TextInput } from 'react-native';
import { saveDeckTitle } from '../storage/DeckStore'

export class AddDeckScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             title: '',
             error: ''
        }
    }

    handleChange = (text) => {
        this.setState({
            title: text
        })
    }

    handleSubmit = () => {
        const title = this.state.title
        if(title) {
            const key = Date.now().toString();
            const value = { title, questions: [] };
            const questions = []
            saveDeckTitle(key, value)
            this.setState({
                title: ''
            })
            this.props.navigation.navigate('Deck', { key, title, questions})
        } else {
            alert("Title is required")
        }
        
    }

    componentWillUnmount() {
        this.props.route.params.getData()
    }
    
    render() {
        const {title} = this.state
        return (
            <View style={styles.container}>
                <Text style={styles.label}>What is the title of your new deck?</Text>
                <TextInput style={styles.input} value={title} onChangeText={this.handleChange} />
                <Button title="Create Deck" onPress={this.handleSubmit} />
            </View>
        )
    }
}

export default AddDeckScreen

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