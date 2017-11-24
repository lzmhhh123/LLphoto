import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Footer, FooterTap, Icon, Text, Button } from 'native-base';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>LLphoto</Header>
        <Content />
        <Footer>
          <FooterTap>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
          </FooterTap>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
