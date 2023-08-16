import React, { FC, useState, useCallback } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Button, Dimensions, FlatList  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title';
import TableView from '../components/TableView';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface ReportProps {
  // props nếu có
}

interface ReportState {
  // state nếu có
}

type ReportScreenProps = {
  navigation: any;
  route: any;
};

const Report: React.FC<ReportScreenProps> = ({navigation, route}) => {

  const handleReport = () => {
    navigation.replace('Quantity');
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



  const handleNavigateToStart = () => {
    navigation.replace('Turtorial');
  };
  const handlePress2 = () => {
    // Code to execute when the second TouchableOpacity is pressed
    navigation.replace('Report');
  };
  const [text, setText] = useState('');

  const handleChangeText = (inputText: string) => {
    setText(inputText);
  };

  const handlePress = () => {
    console.log('Button pressed!');
  };
  return (
      <ImageBackground source={require('../../assets/Report/bg.png')} style={styles.imageBackground}>
            <Title/>
            <ImageBackground
                  source={require('../../assets/Report/sw2.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.imageNavigation1}
                  resizeMode="cover">
                    <TouchableOpacity onPress={handleReport} style={styles.button}>
                      <View style={styles.column}>
                        {/* Nội dung của cột thứ hai */}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                      <View style={styles.column}>
                        {/* Nội dung của cột thứ hai */}
                      </View>
                    </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.q2}> Tổng sức chứa</Text>
            <TextInput
              style={[styles.input1, { borderColor: borderColorButton1 }]}
              onFocus={handleFocusButton1}
              onBlur={handleBlurButton1}
              editable={false}
              placeholder="100"
            />
            <Text style={styles.q3}> Sức chứa còn lại</Text>
            <TextInput
              style={[styles.input2, { borderColor: borderColorButton2 }]}
              onFocus={handleFocusButton2}
              onBlur={handleBlurButton2}
              editable={false}
              placeholder="2"
            />
            <ImageBackground
                  source={require('../../assets/Report/br.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.imageReset}
                  resizeMode="cover">
                    <TouchableOpacity onPress={handleReport} style={styles.button}>
                      <View style={styles.column}>
                        {/* Nội dung của cột thứ hai */}
                      </View>
                    </TouchableOpacity>
            </ImageBackground>
            <ImageBackground
                  source={require('../../assets/Report/tbv.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.tableView}
                  resizeMode="cover">
                    <TableView></TableView>
            </ImageBackground>
            <ImageBackground
                  source={require('../../assets/Report/bc.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.bc}
                  resizeMode="cover">
                    <TouchableOpacity onPress={handleReport} style={styles.button}>
                      <View style={styles.column}>
                        {/* Nội dung của cột thứ hai */}
                      </View>
                    </TouchableOpacity>
            </ImageBackground>
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
  imageReset: {
    top: windowHeight * 0.45,
    position: 'absolute',
    width: windowWidth * 0.38,
    height: windowHeight * 0.05,
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
    top: windowHeight * 0.16,
    backgroundColor: 'rgb(237,237,237)',
    width: windowWidth * 0.92,
    height: windowHeight * 0.06,
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  input2: {
    top: windowHeight * 0.19,
    backgroundColor: 'rgb(237,237,237)',
    width: windowWidth * 0.92,
    height: windowHeight * 0.06,
    borderWidth: 1,
    fontSize: 16,
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  // Text
  q2: {
    marginLeft: 10,
    top: windowHeight * 0.15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#336CC8',
  },
  q3: {
    marginLeft: 10,
    top: windowHeight * 0.18,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#336CC8',
  },
  // button
  bc: {
    position: 'absolute',
    top: windowHeight*0.92,
    width: windowWidth * 0.95,
    height: windowHeight *0.07,
    alignSelf: 'center'
  },
  tableView: {
    position: 'absolute',
    top: windowHeight*0.53,
    width: windowWidth * 0.95,
    height: windowHeight *0.3,
    alignSelf: 'center'
  },

});

export default Report;