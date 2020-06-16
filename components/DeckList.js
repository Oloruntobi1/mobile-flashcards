import React, { Component } from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text } from 'react-native';
import DeckListItem from './DeckLitsItem'

export class DeckList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const data = this.props.data
        return (
            <FlatList data={data} renderItem={({item}) => <DeckListItem item={item} navigation={this.props.navigation} getData={() => this.props.getData()} />}  />
        )
    }
}

export default DeckList
