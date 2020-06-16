import React, { Component } from 'react'
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';

export class QuizScreen extends Component {
    constructor(props) {
        super(props)

        
    
        this.state = {...this.initState}

        
    }
    initState = {
        index: 0,
         correct: 0,
         incorrect: 0,
         showAnswer: false,
         completed: false
    }

    toggleShowAnswer = () => {
        this.setState(prevState => ({
            showAnswer: !prevState.showAnswer
        }))
    }

    handleCorrect = () => {
        this.setState(prevState => ({
            correct: prevState.correct + 1,
            index: prevState.index + 1
        }))
        this.checkCompleteness()
    }

    handleIncorrect = () => {
        this.setState(prevState => ({
            incorrect: prevState.incorrect + 1,
            index: prevState.index + 1
        }))
        this.checkCompleteness()
    }

    checkCompleteness = () => {
        const { index } = this.state
        const { questions } = this.props.route.params;
        const len = questions.length
        if(index == len - 1) {
            this.setState({
                completed: true,
            })
        }
    }

    handleRetake = () => {
        this.setState({
            ...this.initState
        })
    }

    handleGoBack = () => {
        this.props.navigation.goBack()
    }
    
    render() {
        const { questions, navigation } = this.props.route.params;
        const { index, showAnswer, completed, correct } = this.state
        const len = questions.length
        let page
        if(completed) {
            const score = ((correct/len)*100).toFixed(2)
            page = (
                <View style={styles.main}>
                    <View>
                        <Text style={styles.score}>Score: { score }%</Text>
                    </View>
                    <View style={styles.button}>
                        <Button color="green" title="Retake Quiz" onPress={this.handleRetake} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Go To Deck" onPress={this.handleGoBack} />
                    </View>
                </View>
            )
        } else {
            page = (
                <View style={styles.main}>
                    <View style={styles.count} >
                        <Text style={styles.countText}>
                            {index + 1}\{len}
                        </Text>
                    </View>
                    <View  >
                        <View style={styles.text}>
                            <Text style={styles.question}>{showAnswer ?  questions[index].answer : questions[index].question}</Text>
                            <Text style={styles.toggle} onPress={this.toggleShowAnswer}>{showAnswer ?  'Show Question' : 'Show Answer'}</Text>
                        </View>
                        <View>
                            <View style={styles.button}>
                                <Button color="green" title="Correct" onPress={this.handleCorrect} />
                            </View>
                            
                            <View style={styles.button}>
                                <Button color="red" title="Incorrect" onPress={this.handleIncorrect} />
                            </View>
                            
                        </View>
                    </View>
                </View>
                    
            )
        }
        return (
            <View style={styles.container}>
                {page}
            </View>
        )
    }
}

export default QuizScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // justifyContent: 'flex-start',
        padding: 50,
    },
    question: {
        fontSize: 24,
        fontWeight: '700',
    },
    button: {
        marginTop: 10
    },
    toggle: {
        fontSize: 15,
        fontWeight: '400',
    },
    text: {
        alignItems: 'center'
    },
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    // count: {
    //     marginBottom: 300
    // },
    countText: {
        fontWeight: '700',
    },
    score: {
        fontSize: 30,
        fontWeight: '700',
        paddingLeft: 30,
        paddingRight: 30
    }
  });
