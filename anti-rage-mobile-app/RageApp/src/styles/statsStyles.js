import { StyleSheet } from 'react-native';

export const statsStyles = StyleSheet.create({
    content: {
        marginTop: 50,
      },
      gifContainer: {
        alignItems: 'center'
      },
      square: {
        padding: 40,
      },
      darkSquare: {
        shadowColor: 'white'
      },
      titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 30,
      },
      words: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 25,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 75,
        padding: 20,
        backgroundColor: '#4d68f0'
      },
      place: {
        flexDirection: 'row',
      },
      text: {
        color: 'white',
      },
      word: {
        marginLeft: 8
      },
      noStatsText: {
        color: 'black',
        marginTop: '50%',
        fontSize: 24,
      },
      message: {
        alignItems: 'center',
      }
});