import React from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useState} from 'react';
// Dark mode key

const Card = props => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const onCardPress = () => {
    props.showItems(props.displayText);
  };
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Pressable onPress={onCardPress}>
      <View
        style={{
          backgroundColor: '#C0A9BD',
          height: props.size || 100,
          width: props.size || 150,
          borderRadius: 10,
          margin: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{height: '70%', backgroundColor: 'white', overflow: 'hidden'}}>
          <Image
            source={{uri: props.image}} // Use uri to access image URL
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
            onError={error => console.log('Image load error:', error)}
            onLoad={handleImageLoad}
          />
        </View>

        <View
          style={{
            height: '30%',
            backgroundColor: '#C0A9BD',
            marginTop: 4,
          }}>
          <Text
            style={{
              fontFamily: 'Avenir',
              color: '#F4F2F3',
              textAlign: 'center',
              fontSize: 16,
            }}>
            {props.displayText}
          </Text>
          <Text>{props.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
