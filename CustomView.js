import React from 'react';
import {
  Linking,
  MapView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

export default class CustomView extends React.Component {
  render() {
    if (this.props.currentMessage.location) {
      return (
        <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
            android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`
          });
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              return Linking.openURL(url);
            }
          }).catch(err => {
            console.error('An error occurred', err);
          });
        }}>
          <MapView
            style={[styles.mapView, this.props.mapViewStyle]}
            region={{
              latitude: this.props.currentMessage.location.latitude,
              longitude: this.props.currentMessage.location.longitude,
            }}
            annotations={[{
              latitude: this.props.currentMessage.location.latitude,
              longitude: this.props.currentMessage.location.longitude,
            }]}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </TouchableOpacity>
      );
    }
    
    //Showing the actions for bot messages
    if (this.props.currentMessage.messageActions) {

      const messageActions = this.props.currentMessage.messageActions;
      const returnString = 
          messageActions.map(m => {
            return (
              <TouchableOpacity key={m.text} style={styles.messageActionView}>
                <Text style={styles.messageAction}>{m.text}</Text>
              </TouchableOpacity>
            )
          });
      console.log(returnString);
      return (
        <View>
        {returnString}
        </View>
      )

        
    }

    return null;
  }
}

const styles = StyleSheet.create({
  container: {
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  messageActionView:{
    flex: 1,
    margin: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  messageAction: {
    color: '#67A1E6',
  }
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  mapViewStyle: {},
};

CustomView.propTypes = {
  currentMessage: React.PropTypes.object,
  containerStyle: View.propTypes.style,
  mapViewStyle: View.propTypes.style,
};
