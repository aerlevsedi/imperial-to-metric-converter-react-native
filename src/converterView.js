import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Button } from "react-native";
// import { Button } from "@react-native-material/core";
// import {Dropdown} from 'react-native-material-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
// import { useEffect } from "react/cjs/react.production.min";

const ConverterView = () => {
  const [justifyContent, setJustifyContent] = useState("space-evenly");
  const [value1, setValue1] = useState("0");
  const [value2, setValue2] = useState("0");
  const [switching, setSwitching] = useState(false);
  const [isFromImperialToMetric, setIsFromImperialToMetric] = useState(true);

  const [openImperialDropdown, setOpenImperialDropdown] = useState(false);
  const [imperialUnit, setImperialUnit] = useState("inch");
  const [imperialUnits, setImperialUnits] = useState([
    { label: 'inch', value: 'inch' },
    { label: 'foot', value: 'foot' },
    { label: 'yard', value: 'yard' },
    { label: 'pole', value: 'pole' },
    { label: 'chain', value: 'chain' },
    { label: 'furlong', value: 'furlong' },
    { label: 'mile', value: 'mile' },
    { label: 'league', value: 'league' }
  ]);

  const [openMetricDropdown, setOpenMetricDropdown] = useState(false);
  const [metricUnit, setMetricUnit] = useState("m");
  const [metricUnits, setMetricUnits] = useState([
    { label: 'mm', value: 'mm' },
    { label: 'cm', value: 'cm' },
    { label: 'dm', value: 'dm' },
    { label: 'm', value: 'm' },
    { label: 'km', value: 'km' }
  ]);

  const [firstUnit, setFirstUnit] = useState("inch");
  const [firstUnits, setFirstUnits] = useState(imperialUnits);

  const [secondUnit, setSecondUnit] = useState("m");
  const [secondUnits, setSecondUnits] = useState(metricUnits);

  const impToMetric = {
    "inch": 0.0254,
    "foot": 0.3048,
    "yard": 0.9144,
    "pole": 5.0292,
    "chain": 20.1168,
    "furlong": 201.168,
    "mile": 1609.344,
    "league": 4828.032
  }

  const metrToMetric = {
    "mm": 1000,
    "cm": 100,
    "dm": 10,
    "m": 1,
    "km": 0.001
  }

  function convert() {
    if (isFromImperialToMetric === true) {
      let firstValue = parseFloat(value1);
      let result = parseInt(firstValue * impToMetric[firstUnit] * metrToMetric[secondUnit] * 100) / 100.0;
      setValue2(result.toString());

    } else {
      let firstValue = parseFloat(value1);
      let result = parseInt(firstValue / metrToMetric[metricUnit] / impToMetric[imperialUnit] * 100) / 100.0;
      setValue2(result.toString());
    }
  }

  useEffect(() => {
    if (switching === false){
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
    console.log({ isFromImperialToMetric });
  }, [isFromImperialToMetric]);

  return (
    <Layout
      label="justifyContent"
      selectedValue={justifyContent}
      values={[
        "space-evenly",
      ]}
      setSelectedValue={setJustifyContent}
    >
      <View
        style={[
          { flexDirection: 'row' }]}
      >

        <TextInput
          style={[{ backgroundColor: "black", width: 200 }]}
          onChangeText={newText => { setSwitching(false), setValue1(newText)  }}
          value={value1}
          placeholder="Enter value"
          keyboardType="numeric"
        />

        <DropDownPicker style={{ padding: 10, flex: 1, width: 150 }}
          open={openImperialDropdown}
          value={firstUnit}
          items={firstUnits}
          setOpen={setOpenImperialDropdown}
          setValue={setFirstUnit}
          setItems={setFirstUnits}
          onSelectItem={convert}
        />

      </View>
      <View
        style={[{ backgroundColor: "skyblue" }]}
      >
        <Button title="Switch" onPress={() => setIsFromImperialToMetric(!isFromImperialToMetric)} />
      </View>
      <View
        style={[
          { flexDirection: 'row' }]}
      >
        <TextInput
          style={[{ backgroundColor: "black", width: 200 }]}
          value={value2}
          placeholder="Result value"
          keyboardType="numeric"
          editable={false}
        />
        <DropDownPicker style={{ padding: 10, flex: 1, width: 150 }}
          open={openMetricDropdown}
          value={secondUnit}
          items={secondUnits}
          setOpen={setOpenMetricDropdown}
          setValue={setSecondUnit}
          setItems={setSecondUnits}
          onSelectItem={convert}
        />
      </View>

      <View>
        <Button title="History" />
      </View>

    </Layout>
  );
};

const Layout = ({
  label,
  children,
  values,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <View style={{ padding: 10, flex: 1 }}>
      <View style={[styles.container, { [label]: selectedValue }]}>
        {children}
      </View>
    </View>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
  },
  box: {
    width: 100,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

export default ConverterView;