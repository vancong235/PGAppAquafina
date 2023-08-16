import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Title: React.FC = () => {
  return (
    <View style={styles.imageHeader}>
      <ImageBackground source={require('../../assets/Home/Logo.png')} style={styles.imageHeaderLogoContent} />
      <Text style={styles.imageHeaderTextContent}>Unknown</Text>
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
        color: '#6691D6',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: windowWidth * 0.389, // Khoảng cách giữa text và image
      },
      imageHeaderImageContent: {
        width: windowWidth * 0.1,
        height: windowWidth * 0.1,
        resizeMode: 'contain',
      },
});

export default Title;