import React, {Component} from 'react';
import { Card, Badge, Divider, Text } from 'react-native-elements';
import { View, Image, ScrollView, ListView } from 'react-native';

const Dimensions = require('Dimensions');
const screenW = Dimensions.get('window').width;

export default class extends Component {
  constructor() {
    super();
  }
  renderRow(data) {
    return <Badge value={data} containerStyle={{backgroundColor: 'blue', marginLeft: 10}} textStyle={{color: 'orange'}} />
  }
  render() {
    let { tag, uri, discription } = this.props.navigation.state.params;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    tag = ds.cloneWithRows(tag);
    return (
      <ScrollView>
        <Card>
          <Image source={{uri: uri}} style={{width: screenW * 0.8, height: screenW * 0.8}} />
          <Text h4>Tag:</Text>
          <Divider style={{marginBottom: 10}} />
          <ListView
            contentContainerStyle={{flexDirection: 'row',  flexWrap: 'wrap', alignItems: 'center', marginBottom: 10}}
            dataSource={tag}
            enableEmptySections={true}
            renderRow={this.renderRow}
          />
          <Text h4>Discription:</Text>
          <Divider style={{marginBottom: 10}} />
          {
            discription.map(data => {
              return <Text key={data} style={{marginBottom: 10}}>{data}</Text>
            })
          }
        </Card>
      </ScrollView>
    )
  }
}
