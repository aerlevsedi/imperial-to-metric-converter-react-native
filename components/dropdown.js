import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';

class Dropdown1 extends Component {
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
      <Dropdown
        label='Favorite Fruit'
        data={data}
      />
    );
  }
}


export default Dropdown1;