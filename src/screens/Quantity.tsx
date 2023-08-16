import React, { FC, useState, useCallback } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Button, Dimensions  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface QuantityProps {
  // props nếu có
}

interface QuantityState {
  // state nếu có
}

type QuantityScreenProps = {
  navigation: any;
  route: any;
};

const Quantity: React.FC<QuantityScreenProps> = ({navigation, route}) => {

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
      <ImageBackground source={require('../../assets/Quantity/bg.png')} style={styles.imageBackground}>
            <Title/>
            <ImageBackground
                  source={require('../../assets/Quantity/sw1.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.imageNavigation1}
                  resizeMode="cover">
                    <TouchableOpacity style={styles.button}>
                      <View style={styles.column}>
                        {/* Nội dung của cột thứ hai */}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleReport} style={styles.button}>
                      <View style={styles.column}>
                        {/* Nội dung của cột thứ hai */}
                      </View>
                    </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.q1}> Vui lòng nhập số lượng chai</Text>
            <Text style={styles.q2}> Chai Aqua</Text>
            <TextInput
              style={[styles.input1, { borderColor: borderColorButton1 }]}
              onFocus={handleFocusButton1}
              onBlur={handleBlurButton1}
              placeholder="Enter text here"
            />
            <Text style={styles.q3}> Chai khác</Text>
            <TextInput
              style={[styles.input2, { borderColor: borderColorButton2 }]}
              onFocus={handleFocusButton2}
              onBlur={handleBlurButton2}
              placeholder="Enter text here"
            />
            <ImageBackground
                  source={require('../../assets/Quantity/fx.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.fx1}
                  resizeMode="cover">
            </ImageBackground>

            <ImageBackground
                  source={require('../../assets/Quantity/fx.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.fx2}
                  resizeMode="cover">
            </ImageBackground>

            <ImageBackground
                  source={require('../../assets/Quantity/f434.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.f434}
                  resizeMode="cover">
                    <Text style={styles.q4}>Tổng số điểm tích lũy hiện tại</Text>
                    <Text style={styles.q5}>210</Text>
            </ImageBackground>
            <TouchableOpacity
              onPress={handleQuantity}
              style={styles.containConfirm}>
              <ImageBackground
                    source={require('../../assets/Quantity/bm.png')} // Đường dẫn tới hình ảnh button 1
                    style={styles.bm}
                    resizeMode="cover">
              </ImageBackground>
            </TouchableOpacity>
          {/* <View style={styles.imageHeader}>
            <ImageBackground source={require('../../assets/Quantity/Logo.png')} style={styles.imageHeaderLogoContent}>
            </ImageBackground>
            <Text style={styles.imageHeaderTextContent}>Unknow</Text>
            <ImageBackground source={require('../../assets/Quantity/F625.png')} style={styles.imageHeaderImageContent}>
            </ImageBackground>
          </View>
          <ImageBackground source={require('../../assets/Quantity/G142.png')} style={styles.imageBody}>
          </ImageBackground>
          <Text style={styles.imageBodyTextContent1}>QUÉT MÃ QR</Text>
          <Text style={styles.imageBodyTextContent2}>Vui lòng quét mã trên thùng để {'\n'}sử dụng hệ thống</Text>
          <TouchableOpacity onPress={handlePress2}>
            <ImageBackground source={require('../../assets/Quantity/b1.png')} style={styles.imageButton1}>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity>
          <ImageBackground source={require('../../assets/Quantity/b2.png')} style={styles.imageButton2}>
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
    top: windowHeight * 0.17,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1545A5',
    textAlign: 'center'
  },
  q2: {
    marginLeft: 10,
    top: windowHeight * 0.21,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#336CC8',
  },
  q3: {
    marginLeft: 10,
    top: windowHeight * 0.25,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#336CC8',
  },
  q4: {
    top: 25,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#336CC8',
  },
  q5: {
    top: 45,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#336CC8',
    alignSelf: 'center',
    textAlign: 'center',
  },
  // button delete
  fx1: {
    right: 20,
    position: 'absolute',
    top: windowHeight * 0.344,
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignSelf: 'flex-end',
  },
  fx2: {
    right: 20,
    position: 'absolute',
    top: windowHeight * 0.474,
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignSelf: 'flex-end'
  },

  // f434
  f434: {
    position: 'absolute',
    top: windowHeight * 0.568,
    width: windowWidth * 0.93,
    height: windowHeight *0.217,
    alignSelf: 'center'
    
  },
  
  // button
  containConfirm: {
    position: 'absolute',
    top: windowHeight*0.92,
    width: windowWidth * 0.95,
    height: windowHeight *0.07,
    alignSelf: 'center'
  },
  bm: {
    position: 'absolute',
    width: windowWidth * 0.95,
    height: windowHeight *0.07,
    alignSelf: 'center'
  }
});

export default Quantity;