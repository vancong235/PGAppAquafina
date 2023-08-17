import { Text, TouchableOpacity, StyleSheet, View, Image, Dimensions, ImageBackground } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchUser, getRecord } from '../features/user/userSlice'
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppDispatch, RootState} from '../app/store';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



interface Qrcode {
  // props nếu có
}

interface HomeState {
  // state nếu có
}

type QrcodeScreenProps = {
  navigation: any;
  route: any;
};




const Qrcode: React.FC<QrcodeScreenProps> = ({navigation, route}) => {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();
  const status = useSelector((state: RootState) => state.user.status);
  const [canScan, setCanScan] = useState<boolean>(true);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const handleFetchUser = async (userId: string) => {
    setIsScanning(true); // Đánh dấu đang quét QR code
    await dispatch(fetchUser(userId));
    setIsScanning(false); // Kết thúc quét QR code
  };

  const handleGetRecord = async (userId: string) => {
    await dispatch(getRecord(userId));
  };


  const handlePress2 = () => {
    navigation.replace('Home');
  };

  const onSuccess = async (e: any) => {
    
    handleFetchUser(e.data);
    handleGetRecord(e.data);
    console.log(status);
    if (status === 'succeeded') {
      navigation.replace('Quantity');
    }

    setCanScan(false);
    if (!canScan) return;
    setTimeout(() => {
      setCanScan(true);
    }, 2000);
  };


  return (
    <View style={styles.containerX}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        showMarker={true}
        reactivate={true}
        customMarker={
          <View style={styles.markerContainer}>
            <TouchableOpacity onPress={handlePress2}>
                <ImageBackground source={require('../../assets/Qrcode/ccir.png')} style={styles.ccir}></ImageBackground>
            </TouchableOpacity>
            <Text style={styles.text}>Di chuyển camera đến mã QR để quét</Text>
            <View style={styles.markerStyle}>
              <Image source={require('../../assets/Qrcode/1.png')} style={styles.topLeftImage} />
              <Image source={require('../../assets/Qrcode/2.png')} style={styles.topRightImage} />
              <Image source={require('../../assets/Qrcode/3.png')} style={styles.bottomLeftImage} />
              <Image source={require('../../assets/Qrcode/4.png')} style={styles.bottomRightImage} />
            </View>
          </View>
        }
        cameraStyle={{ height: '100%'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerX: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  markerStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    width: 250,
    height: 250,
    alignSelf: 'center',
    position: 'relative',
    borderRadius: 10
  },
  topLeftImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '10%',
    height: '10%',
  },
  topRightImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '10%',
    height: '10%',
  },
  bottomLeftImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '10%',
    height: '10%',
  },
  bottomRightImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '10%',
    height: '10%',
  },
  topContent: {
    fontSize: 18,
    color: '#FFF',
  },
  bottomContent: {
    fontSize: 16,
    color: '#FFF',
  },
  cancelButton: {
    padding: 16,
  },
  camera: {
    flex: 1,
  },
  text: {
    backgroundColor: 'transparent',
    top: 100,
    fontSize: 16,
    color: '#FFF',
    position: 'absolute',
    alignSelf: 'center',
  },
  ccir: {
    top: -240,
    left: -180,
    position: 'absolute',
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
  }
});

export default Qrcode;