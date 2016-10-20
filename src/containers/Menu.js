const React = require('react');
const {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} = require('react-native');
const { Component } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#4A4A4A',
    //padding: 20,
  },
  menuItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
    borderBottomColor: '#979797',
    borderBottomWidth: 1
  },
  textLink: {
    color: "#fff",
    fontFamily: 'OpenSans',
    fontWeight: '400',
    fontSize: 20,
  },
  icon: {
    margin: 20
  }
});

module.exports = class Menu extends Component {
  static propTypes = {
    onItemSelected: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.menuItemContainer}>
          <Image
            style={styles.icon}
            source={require('../icons/profile.png')}/>
          <Text 
            onPress={() => this.props.onItemSelected('Profile')}
            style={styles.textLink}>Edit Profile
            </Text>
        </View>
        <View style={styles.menuItemContainer}>
          <Image
            style={styles.icon}
            source={require('../icons/billing.png')}/>
          <Text 
            onPress={() => this.props.onItemSelected('Billing')}
            style={styles.textLink}>Billing
            </Text>
        </View>
        <View style={styles.menuItemContainer}>
          <Image
            style={styles.icon}
            source={require('../icons/referrals.png')}/>
          <Text 
            onPress={() => this.props.onItemSelected('Referrals')}
            style={styles.textLink}>Referrals
            </Text>
        </View>
        <View style={styles.menuItemContainer}>
          <Image
            style={styles.icon}
            source={require('../icons/settings.png')}/>
          <Text 
            onPress={() => this.props.onItemSelected('Settings')}
            style={styles.textLink}>Settings
            </Text>
        </View>

      </ScrollView>
    );
  }
};
