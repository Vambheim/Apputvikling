import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Pressable,
  Modal,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Shoppingcart from '../images/Shoppingcart.png';
import i18n from '../localizations/I18n';

import Favourite from '../images/Favourite.png';

const DetailsCard = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const addToCart = () => {
    if (props.onAddToCart) {
      props.onAddToCart();
    }
  };

  const addToBookmarks = () => {
    if (props.onAddToBookmarks) {
      props.onAddToBookmarks();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.text}>{props.address}</Text>
        <Text style={styles.text}>
          {i18n.t('Dishprice')} {props.price},-
        </Text>
        <Text style={styles.text}>
          {i18n.t('Sellerphonenumber')} {props.sellerinfo}
        </Text>
        {props.data &&
          props.data.map((item, itemIndex) => (
            <View key={itemIndex}>
              <Text style={styles.text}>
                {i18n.t('Ingredients')}: {item.ingredients}
              </Text>
              <Text style={styles.text}>
                {i18n.t('Allergens')}: {item.allergens}
              </Text>
            </View>
          ))}
      </View>

      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.imageContainer}>
        <Image source={{uri: props.image}} style={styles.image} />
      </Pressable>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
          onPress={addToCart}>
          <Image source={Shoppingcart} style={styles.icon} />
        </Pressable>
        <Pressable
          style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
          onPress={addToBookmarks}>
          <Image source={Favourite} style={styles.icon} />
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <Pressable onPress={() => setModalVisible(false)}>
            <Image
              source={{uri: props.image}}
              style={{
                width: windowWidth,
                height: windowHeight,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C0A9BD',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    color: '#F4F2F3',
    fontSize: 26,

    textAlign: 'center',
    fontFamily: 'Avenir',
    marginTop: 5,
    marginBottom: 5,
  },
  detailsContainer: {
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  text: {
    color: '#F4F2F3',
    marginBottom: 5,
    fontFamily: 'Avenir',
  },
  imageContainer: {
    height: 250,
    width: 350,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
});
