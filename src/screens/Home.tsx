import React, { FC, useState, useCallback, useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Button, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Title from '../components/Title';
import { fetchUser, getRecord, addRecord } from '../features/user/userSlice'
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface HomeProps {
  
  // props nếu có
}

interface HomeState {
  // state nếu có
}

type HomeScreenProps = {
  navigation: any;
  route: any;
};


const Home: React.FC<HomeScreenProps> = ({navigation, route}) => {
  useEffect(() => {
    if (userData!=null) {
      setImageSource(require('../../assets/Home/b3.png'));
    }
  }, []);
  
  const userData = useSelector((state: RootState) => state.user.userData);
  const [imageSource, setImageSource] = useState(require('../../assets/Home/b2.png'));
  
  const handlePressQrcode = () => {
    navigation.replace('Qrcode');
  };

  const handlePressPass = () => {
    if (userData!=null) {
      navigation.replace('Quantity');
    }
  };

  return (
      <ImageBackground source={require('../../assets/Home/bg.png')} style={styles.imageBackground}>
          <Title></Title>
          <ImageBackground source={require('../../assets/Home/G142.png')} style={styles.imageBody}>
          </ImageBackground>
          <Text style={styles.imageBodyTextContent1}>QUÉT MÃ QR</Text>
          <Text style={styles.imageBodyTextContent2}>Vui lòng quét mã trên thùng để {'\n'}sử dụng hệ thống</Text>
          <TouchableOpacity onPress={handlePressQrcode}>
            <ImageBackground source={require('../../assets/Home/b1.png')} style={styles.imageButton1}>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressPass}>
            <ImageBackground source={imageSource} style={styles.imageButton2}>
            </ImageBackground>
          </TouchableOpacity>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: windowHeight * 0.088,
    position: 'absolute',
    width: windowWidth * 0.58,
    height: windowWidth * 0.58,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageBackground: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover"
  },
  imageBody: {
    top: windowHeight * 0.12,
    position: 'absolute',
    width: windowWidth * 0.81,
    height: windowHeight * 0.48,
    resizeMode: 'cover',
  },
  imageBodyTextContent1: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#00358C',
    alignSelf: 'center',
    textAlign: 'center',
    top: windowHeight * 0.65,
    position: 'absolute',
  },
  imageBodyTextContent2: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    top: windowHeight * 0.7,
    position: 'absolute',
  },
  imageButton1: {
    top: windowHeight * 0.78,
    position: 'absolute',
    width: windowWidth * 0.9,
    height: windowHeight * 0.071,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageButton2: {
    top: windowHeight * 0.865,
    position: 'absolute',
    width: windowWidth * 0.87,
    height: windowHeight * 0.055,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  imageFooter: {
    bottom: 0,
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.05,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  imageHeader: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageHeaderLogoContent: {
    marginLeft: 10,
    width: windowWidth *0.24,
    height: windowWidth*0.1,
    resizeMode: 'contain',
  },
  imageHeaderTextContent: {
    color: '#6691D6',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: windowWidth *0.389, // Khoảng cách giữa text và image
  },
  imageHeaderImageContent: {
    width: windowWidth*0.1,
    height: windowWidth*0.1,
    resizeMode: 'contain',
  },
});

export default Home;