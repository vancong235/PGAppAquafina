import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

const Qrcode = (): JSX.Element => {
  const [canScan, setCanScan] = useState<boolean>(true);
  const navigation = useNavigation();

  const onSuccess = async (e: any) => {
    setCanScan(false);
    setTimeout(() => {
      setCanScan(true);
    }, 2000);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
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
  });

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      showMarker={true}
      reactivate={true}
      markerStyle={{ borderColor: '#FFF', borderRadius: 10 }}
      topContent={<Text style={styles.topContent}>Quét mã QR để tiếp trục</Text>}
      bottomContent={
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.bottomContent}>Hủy</Text>
        </TouchableOpacity>
      }
      cameraStyle={styles.camera}
    />
  );
};

export default Qrcode;