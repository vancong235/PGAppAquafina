import React, { FC, useState, useCallback } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Button, Dimensions, FlatList, Modal  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Title from '../components/Title';
import TableView from '../components/TableView';
import firestore from '@react-native-firebase/firestore';
import { fetchUser, getRecord, addRecord, deleteRecord } from '../features/user/userSlice'
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const userData = useSelector((state: RootState) => state.user.userData);
  const records = useSelector((state: RootState) => state.user.records);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, Action>>();
  const name = useSelector((state: RootState) => state.user.dataName);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModal2 = () => {
    setIsOpen(!isOpen);
  };
  const handleDeleteRecord = async (record: string) => {
    await dispatch(deleteRecord(record));
  };
  const handleFetchUser = async (userId: string) => {
    await dispatch(fetchUser(userId));
  };
  const handleQuantity = () => {
    navigation.replace('Quantity');
  };
  const handleReport = () => {
    navigation.replace('Point');
  };
  const handleReset = () => {
    toggleModal();
  };

  const handleGetRecord = async (userId: string) => {
    await dispatch(getRecord(userId));
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
  const [text, setText] = useState('');

  const handleChangeText = (inputText: string) => {
    setText(inputText);
  };

  const handlePress1 = () => {
    toggleModal();
  };
  const handlePress2 = () => {
    handleDeleteRecord(name.toString());
    handleGetRecord(name.toString());
    handleFetchUser(name.toString());
    setIsOpen(true);
    toggleModal();
    setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  return (
      <ImageBackground source={require('../../assets/Report/bg.png')} style={styles.imageBackground}>
            <Title/>
            <ImageBackground
                  source={require('../../assets/Report/sw2.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.imageNavigation1}
                  resizeMode="cover">
                    <TouchableOpacity onPress={handleQuantity} style={styles.button}>
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
              placeholder="100"
            />
            <ImageBackground
                  source={require('../../assets/Report/br.png')} // Đường dẫn tới hình ảnh button 1
                  style={styles.imageReset}
                  resizeMode="cover">
                    <TouchableOpacity onPress={handleReset} style={styles.button}>
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

      <Modal
        visible={isOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={toggleModal2}>
           <View style={styles.modalViews2}>
        <ImageBackground
            source={require('../../assets/Report/alert.png')}
            imageStyle={{ borderRadius: 12 }}
            style={styles.modalInfo2}>
        </ImageBackground>
        </View>
      </Modal>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalViews}>
          <ImageBackground
            source={require('../../assets/Report/pr.png')}
            imageStyle={{ borderRadius: 12 }}
            style={styles.modalInfo}>
            <Text style={styles.TextInforModal1}>
              Bạn có muốn đặt lại hệ thống?
            </Text>
            <Text style={styles.TextInforModal2}>
              Tất cả dữ liệu sẽ được đặt lại
            </Text>
            <View style={styles.mcontainerImage}>
            <TouchableOpacity onPress={handlePress1} style={styles.columnImage}>
              <View>
                <ImageBackground
                  source={require('../../assets/Report/cancle.png')}
                  style={styles.modalInfoImage}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePress2}  style={styles.columnImage}> 
              <View>
                <ImageBackground
                  source={require('../../assets/Report/rsetBtn.png')}
                  style={styles.modalInfoImage}
                />
              </View>
            </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>


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

  // Modal
  
  modalInfoImage: {
    alignSelf: 'center',
    position: 'absolute',
    width: windowWidth * 0.29,
    height: windowHeight * 0.048,
    bottom: 50
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.7,
    height: windowHeight * 0.7
  },
  modalContent1: {
    top: windowHeight * 0.07,
    position: 'absolute',
    alignItems: 'center',
    width: windowWidth * 0.8,
    height: windowHeight * 0.319
  },
  modalContent2: {
    bottom: windowHeight * 0.21,
    position: 'absolute',
    alignItems: 'center',
    width: windowWidth * 0.15,
    height: windowHeight * 0.0715,
    resizeMode: "contain"
  },
  modalConfirm: {
    bottom: windowHeight * 0.035,
    position: 'absolute',
    alignItems: 'center',
    width: windowWidth * 0.21,
    height: windowHeight * 0.1,
    resizeMode: "contain"
  },
  columnImage: {
    flex: 1,
    height: 50,
    margin: 10,
    top: 210,
    borderRadius: 20
  },  
  TextChangeModal: {
    fontSize: 13,
    color: "red",
    fontWeight: "bold",
    textAlign: 'center' //
  },
  mcontainerImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  modalInfo: {
    position: 'absolute',
    backgroundColor: 'white',
    width: windowWidth * 0.8,
    height: windowHeight * 0.22,
    borderRadius: 100,
  },
  modalViews: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  TextInforModal1: {
    position: "absolute",
    top: 22,
    fontSize: 18,
    color: '#00122F',
    alignSelf: "center",
    textAlign: 'center' //
  },
  TextInforModal2: {
    position: "absolute",
    bottom: 100,
    fontSize: 16,
    alignSelf: "center",
    textAlign: 'center' //
  },
  modalInfo2: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 90,
    width: windowWidth * 0.8,
    height: windowHeight * 0.045,
    borderRadius: 100,
  },
  modalViews2: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default Report;