import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import fs, { moveFile, copyFile, unlink } from 'react-native-fs';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component{

  async componentDidMount(){ 
    const path = fs.DocumentDirectoryPath + '/text.txt';
    await fs.writeFile(path, 'Texto dentro do arquivo', 'utf8');
    const content = await fs.readFile(path, 'utf8');
    console.log('arquivo:', content);

    //fs.copyFile(path, fs.DocumentDirectoryPath + '/text2.txt')
    //fs.moveFile(path, fs.DocumentDirectoryPath + '/text3.txt')
    //fs.unlink(fs.DocumentDirectoryPath + '/text2.txt')
  }

  
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
