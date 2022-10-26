import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HistoryView = () => {
  navigation = useNavigation();
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text>History</Text>
      <Button
        title="Convert"
        onPress={() =>
          navigation.navigate('ConverterView')
        }
      />
    </View>
  );
}

export default HistoryView;