import { StyleSheet, Dimensions } from "react-native";

export const container = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centerScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    // maxWidth: 400,
    // maxHeight: 400,
    padding: 20
  }
})

export const dimensions = { 
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width
}

export const colors = {
  black: 'black',
  white: 'white',
  red: 'red',
  blue: 'blue',
  grey: '#A3A3A3'
}

export const cards = StyleSheet.create({
  cardContainer: {
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowRadius: 3, // new to me
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    elevation: 6,
  }
})

export const header = StyleSheet.create({
  headerOuterContainer: {
    zIndex: 10,
    height: 70,
    padding:15,
    borderBottomWidth:1,
    borderColor: colors.grey,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "flex-end",
  }
})

export const text = StyleSheet.create({
  titleText: 20,
  headerText: 18,
  buttonText: 14,
  normalText: 14
})

// this is to test the UI boundaries of the screen
export const test = StyleSheet.create({
  black:{
    borderColor: 'black',
    borderWidth: 1
  },
  blue:{
    borderColor: 'blue',
    borderWidth: 1
  },
  pink:{
    borderColor: 'pink',
    borderWidth: 1
  },
  green:{
    borderColor: 'green',
    borderWidth: 1
  }
})