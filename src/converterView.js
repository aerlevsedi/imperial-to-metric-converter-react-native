import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SwipeableListView,
  // TextInput,
  // Button,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Stack, TextInput, Button} from '@react-native-material/core';

const ConverterView = () => {
  navigation = useNavigation();

  const [conversionHistory, setConversionHistory] = useState([]);

  const [justifyContent, setJustifyContent] = useState('space-evenly');
  const [value1, setValue1] = useState('0');
  const [value2, setValue2] = useState('0');
  const [switching, setSwitching] = useState(false);
  const [isFromImperialToMetric, setIsFromImperialToMetric] = useState(true);

  const [openImperialDropdown, setOpenImperialDropdown] = useState(false);
  const [imperialUnit, setImperialUnit] = useState('inch');
  const [imperialUnits, setImperialUnits] = useState([
    {label: 'inch', value: 'inch'},
    {label: 'foot', value: 'foot'},
    {label: 'yard', value: 'yard'},
    {label: 'pole', value: 'pole'},
    {label: 'chain', value: 'chain'},
    {label: 'furlong', value: 'furlong'},
    {label: 'mile', value: 'mile'},
    {label: 'league', value: 'league'},
  ]);

  const [openMetricDropdown, setOpenMetricDropdown] = useState(false);
  const [metricUnit, setMetricUnit] = useState('m');
  const [metricUnits, setMetricUnits] = useState([
    {label: 'mm', value: 'mm'},
    {label: 'cm', value: 'cm'},
    {label: 'dm', value: 'dm'},
    {label: 'm', value: 'm'},
    {label: 'km', value: 'km'},
  ]);

  const [firstUnit, setFirstUnit] = useState('inch');
  const [firstUnits, setFirstUnits] = useState(imperialUnits);

  const [secondUnit, setSecondUnit] = useState('m');
  const [secondUnits, setSecondUnits] = useState(metricUnits);

  const impToMetric = {
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    pole: 5.0292,
    chain: 20.1168,
    furlong: 201.168,
    mile: 1609.344,
    league: 4828.032,
  };

  const metrToMetric = {
    mm: 1000,
    cm: 100,
    dm: 10,
    m: 1,
    km: 0.001,
  };

  function convert() {
    let conversion = '';
    if (isFromImperialToMetric === true) {
      let firstValue = parseFloat(value1);
      let result =
        parseInt(
          firstValue * impToMetric[firstUnit] * metrToMetric[secondUnit] * 100,
        ) / 100.0;
      setValue2(result.toString());

      conversion =
        firstValue + ' ' + firstUnit + ' = ' + result + ' ' + secondUnit;
    } else {
      let firstValue = parseFloat(value1);
      let result =
        parseInt(
          (firstValue / metrToMetric[metricUnit] / impToMetric[imperialUnit]) *
            100,
        ) / 100.0;
      setValue2(result.toString());
      conversion =
        firstValue + ' ' + metricUnit + ' = ' + result + ' ' + imperialUnit;
    }

    setConversionHistory([...conversionHistory, conversion]);
    console.log(conversionHistory);
  }

  useEffect(() => {
    if (switching === false) {
      convert();
    }
  }, [value1, switching]);

  useEffect(() => {
    let tempUnit = firstUnit;
    setSwitching(true);
    if (isFromImperialToMetric === false) {
      setFirstUnits(metricUnits);
      setFirstUnit(secondUnit);

      setSecondUnits(imperialUnits);
      setSecondUnit(tempUnit);
    } else {
      setFirstUnits(imperialUnits);
      setFirstUnit(secondUnit);

      setSecondUnits(metricUnits);
      setSecondUnit(firstUnit);
    }
    let temp = value1;
    setValue1(value2);
    setValue2(value1);
    console.log({isFromImperialToMetric});
  }, [isFromImperialToMetric]);

  return (
    <Layout
      label="justifyContent"
      selectedValue={justifyContent}
      values={['space-evenly']}
      setSelectedValue={setJustifyContent}>
      <View style={[{flexDirection: 'row', marginTop: 30}]}>
        <TextInput
          style={[{backgroundColor: 'white', width: 170, marginHorizontal: 8}]}
          variant="outlined"
          onChangeText={newText => {
            setSwitching(false), setValue1(newText);
          }}
          value={value1}
          label="Enter value"
          keyboardType="numeric"
        />

        <DropDownPicker
          style={{
            padding: 10,
            flex: 1,
            width: 140,
            marginHorizontal: 8,
          }}
          dropDownContainerStyle={{
            padding: 10,
            width: 140,
            marginHorizontal: 8,
          }}
          open={openImperialDropdown}
          value={firstUnit}
          items={firstUnits}
          defaultValue={'inch'}
          setOpen={setOpenImperialDropdown}
          setValue={setFirstUnit}
          setItems={setFirstUnits}
          onSelectItem={convert}
          zIndex={30}
        />
      </View>
      <View style={[{flexDirection: 'row', marginTop: 30}]}>
        <Button
          style={[{marginLeft: 235, backgroundColor: '#673AB7'}]}
          title="SWITCH"
          onPress={() => setIsFromImperialToMetric(!isFromImperialToMetric)}
        />
      </View>
      <View style={[{flexDirection: 'row', marginTop: 30}]}>
        <TextInput
          style={[{backgroundColor: 'white', width: 170, marginHorizontal: 8}]}
          variant="outlined"
          value={value2}
          label="Result value"
          keyboardType="numeric"
          editable={false}
        />
        <DropDownPicker
          style={{
            padding: 10,
            flex: 1,
            width: 140,
            marginHorizontal: 8,
          }}
          dropDownContainerStyle={{
            padding: 10,
            width: 140,
            marginHorizontal: 8,
          }}
          open={openMetricDropdown}
          value={secondUnit}
          items={secondUnits}
          defaultValue={'mm'}
          setOpen={setOpenMetricDropdown}
          setValue={setSecondUnit}
          setItems={setSecondUnits}
          onSelectItem={convert}
          zIndex={20}
        />
      </View>

      <View style={[{flexDirection: 'row', marginTop: 70}]}>
        <Button
          style={[
            {marginHorizontal: 100, width: 150, backgroundColor: '#673AB7'},
          ]}
          title="SHOW HISTORY"
          onPress={() =>
            navigation.navigate('HistoryView', {
              conversionHistory: conversionHistory,
            })
          }
        />
      </View>
    </Layout>
  );
};

const Layout = ({label, children, values, selectedValue, setSelectedValue}) => {
  return (
    <View style={{padding: 10, flex: 1}}>
      <View style={[styles.container, {[label]: selectedValue}]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 70,
  },
  box: {
    width: 100,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    // backgroundColor: 'oldlace',
    alignSelf: 'flex-start',
    marginHorizontal: '1%',
    marginBottom: 6,
    minWidth: '48%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'coral',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
  },
});

export default ConverterView;
