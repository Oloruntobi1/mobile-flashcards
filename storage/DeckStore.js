import { AsyncStorage } from 'react-native';

export const saveDeckTitle = (key, value) => {
    AsyncStorage.mergeItem('decks', JSON.stringify({ [key]: value }));
}

export const getDecks = () => {
    return AsyncStorage.getItem('decks')
}

export const addCardToDeck = (key, questions) => {
    AsyncStorage.mergeItem('decks', JSON.stringify({ [key]: { questions } }))
}