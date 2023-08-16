import React, { FC, useState, useCallback } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Button, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface PointProps {
  // props nếu có
}

interface PointState {
  // state nếu có
}

type PointScreenProps = {
  navigation: any;
  route: any;
};

const Point: React.FC<PointScreenProps> = ({navigation, route}) => {

  const handleReport = () => {
    navigation.replace('Report');
  };

  const handleQuantity = () => {
    navigation.replace('Point');
  };

  const [isFocusedButton1, setIsFocusedButton1] = useState(false);

  const handleFocusButton1 = () => {
    setIsFocusedButton1(true);
  };

  const handleBlurButton1 = () => {
    setIsFocusedButton1(false);
  };

  const borderColorButton1 = isFocusedButton1 ? 'rgb(204,218,241)' : 'transparent';

  const [isFocusedButton2, setIsFocusedButton2] = useState(false);

  const handleFocusButton2 = () => {
    setIsFocusedButton2(true);
  };

  const handleBlurButton2 = () => {
    setIsFocusedButton2(false);
  };

  const borderColorButton2 = isFocusedButton2 ? 'rgb(204,218,241)' : 'transparent';

  const [text, setText] = useState('');

  const handleChangeText = (inputText: string) => {
    setText(inputText);
  };
  return (
      <ImageBackground source={require('../../assets/Point/bg.png')} style={styles.imageBackground}>
            <Title/>
            <Text style={styles.q1}> Vui lòng quét mã QR tại đây để {'\n'}hoàn thành tích điểm nhé!</Text>
            <ImageBackground
                    source={require('../../assets/Point/qr.png')} // Đường dẫn tới hình ảnh button 1
                    style={styles.qrcode}
                    resizeMode="cover">
              </ImageBackground>
            <Text style={styles.q2}> Thời gian quét QR còn: 
            
              <Text style={styles.TextChange}> 15s</Text>
            </Text>
            <TouchableOpacity
              onPress={handleQuantity}
              style={styles.containTime}>
              <ImageBackground
                    source={require('../../assets/Point/ttg.png')} // Đường dẫn tới hình ảnh button 1
                    style={styles.time}
                    resizeMode="cover">
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleQuantity}
              style={styles.containConfirm}>
              <ImageBackground
                    source={require('../../assets/Point/kt.png')} // Đường dẫn tới hình ảnh button 1
                    style={styles.bm}
                    resizeMode="cover">
              </ImageBackground>
            </TouchableOpacity>
          {/* <View style={styles.imageHeader}>
            <ImageBackground source={require('../../assets/Point/Logo.png')} style={styles.imageHeaderLogoContent}>
            </ImageBackground>
            <Text style={styles.imageHeaderTextContent}>Unknow</Text>
            <ImageBackground source={require('../../assets/Point/F625.png')} style={styles.imageHeaderImageContent}>
            </ImageBackground>
          </View>
          <ImageBackground source={require('../../assets/Point/G142.png')} style={styles.imageBody}>
          </ImageBackground>
          <Text style={styles.imageBodyTextContent1}>QUÉT MÃ QR</Text>
          <Text style={styles.imageBodyTextContent2}>Vui lòng quét mã trên thùng để {'\n'}sử dụng hệ thống</Text>
          <TouchableOpacity onPress={handlePress2}>
            <ImageBackground source={require('../../assets/Point/b1.png')} style={styles.imageButton1}>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
          <ImageBackground source={require('../../assets/Point/b2.png')} style={styles.imageButton2}>
          </ImageBackground>
          </TouchableOpacity> */}
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    resizeMode: "cover"
  },  
  container: {
    width: windowWidth,
    height: windowHeight *0.07,
    backgroundColor: 'red'
  },
  // Button
  imageNavigation1: {
    top: 90,
    position: 'absolute',
    width: windowWidth * 0.95,
    height: windowHeight * 0.06,
    alignSelf: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  column: {
    flex: 1, // Cột sẽ chiếm 50% chiều rộng của hàng
    borderColor: 'gray',
  },
  button: {
    backgroundColor: 'transparent',
    top: 1.5,
    flex: 1,
  },
  // Input
  input1: {
    top: windowHeight * 0.22,
    backgroundColor: 'rgb(243, 248, 255)',
    width: windowWidth * 0.92,
    height: windowHeight * 0.06,
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  input2: {
    top: windowHeight * 0.26,
    backgroundColor: 'rgb(243, 248, 255)',
    width: windowWidth * 0.92,
    height: windowHeight * 0.06,
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  // Text
  q1: {
    top: windowHeight * 0.12,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1545A5',
    textAlign: 'center'
  },
  q2: {
    top: windowHeight * 0.58,
    fontSize: 17,
    textAlign: 'center'
  },
  TextChange: {
    fontSize: 18,
    color: "red",
    fontWeight: "bold",
  },
  // image
  qrcode: {
    position: 'absolute',
    top: windowHeight*0.25,
    width: windowWidth * 0.88,
    height: windowHeight *0.42,
    alignSelf: 'center'
  },
  
  // button
  containTime: {
    position: 'absolute',
    top: windowHeight*0.85,
    width: windowWidth * 0.95,
    height: windowHeight *0.07,
    alignSelf: 'center'
  },
  time: {
    position: 'absolute',
    width: windowWidth * 0.9,
    height: windowHeight *0.057,
    alignSelf: 'center'
  },
  containConfirm: {
    position: 'absolute',
    top: windowHeight*0.92,
    width: windowWidth * 0.95,
    height: windowHeight *0.07,
    alignSelf: 'center'
  },
  bm: {
    position: 'absolute',
    width: windowWidth * 0.93,
    height: windowHeight *0.07,
    alignSelf: 'center'
  }
});

export default Point;