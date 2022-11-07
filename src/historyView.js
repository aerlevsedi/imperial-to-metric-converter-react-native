import React from 'react';
import {Text, View, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 12,
    height: 34,
    width: 300,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 2,
  },
});

const HistoryView = ({route, navigation}) => {
  navigation = useNavigation();

  const {conversionHistory} = route.params;
  console.log('HISTORY' + conversionHistory);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={conversionHistory}
        style={{paddingTop: 10}}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={[styles.item]}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HistoryView;
