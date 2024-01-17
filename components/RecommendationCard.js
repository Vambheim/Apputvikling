import React, {useState} from 'react';
import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
import i18n from '../localizations/I18n';

const RecommendationCard = props => {
  const [incrementCount, setIncrementCount] = useState(1);

  const onCardPress = () => {
    props.showItems(props.displayText);
  };

  return (
    <Pressable onPress={onCardPress}>
      <View
        style={{
          backgroundColor: '#C0A9BD',
          height: 100,
          width: '95%',
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: 10,
          paddingHorizontal: 20,
        }}>
        {/* Image display */}
        <Image
          source={{uri: props.image}} // Use uri to access image URL
          style={{
            width: 100,
            height: 80,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
        <View>
          <Text style={{color: '#F4F2F3', fontFamily: 'Avenir', fontSize: 18}}>
            {props.displayText}
          </Text>
          <Text style={{color: '#F4F2F3', fontFamily: 'Avenir'}}>
            {i18n.t('Price')}: {props.price}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#C0A9BD',
    borderColor: '#F4F2F3',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
});

export default RecommendationCard;
