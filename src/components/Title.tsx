import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import {AppDispatch, RootState} from '../app/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Title: React.FC = () => {
  const name = useSelector((state: RootState) => state.user.dataName);
  return (
    <View style={styles.imageHeader}>
      <ImageBackground source={require('../../assets/Home/Logo.png')} style={styles.imageHeaderLogoContent} />
      <Text style={styles.imageHeaderTextContent}>{name}</Text>
      <ImageBackground source={require('../../assets/Home/F625.png')} style={styles.imageHeaderImageContent} />
    </View>
  );
};

const styles = StyleSheet.create({
    imageHeader: {
        top: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      },
      imageHeaderLogoContent: {
        marginLeft: 10,
        width: windowWidth * 0.24,
        height: windowWidth * 0.1,
        resizeMode: 'contain',
      },
      imageHeaderTextContent: {
        top: 6,
        position: 'absolute',
        color: '#6691D6',
        fontSize: 16,
        fontWeight: 'bold',
        right: windowWidth * 0.15, // Khoảng cách giữa text và image
      },
      imageHeaderImageContent: {
        width: windowWidth * 0.1,
        height: windowWidth * 0.1,
        resizeMode: 'contain',
      },
});

export default Title;