import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../FirebaseDB';
import { collection, onSnapshot, query } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export default function ViewFoodsCustomer({ navigation }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    setFoodsItems();
  }, []);

  function setFoodsItems() {
    onSnapshot(query(collection(db, 'foods')), (querySnapshot) => {
      let item = [];

      querySnapshot.forEach((doc) => {
        item.push({
          id: doc.id,
          name: doc.data()['name'],
          price: doc.data()['price'],
          description: doc.data()['description'],
        });
      });
      setFoods(item);
    });
  }

  const filterData = (foods, searchKey) => {
    const result = foods.filter((food) =>
      food.name.toLowerCase().includes(searchKey)
    );
    setFoods(result);
  };

  const onSearch = async (e) => {
    onSnapshot(query(collection(db, 'foods')), (querySnapshot) => {
      let item = [];

      querySnapshot.forEach((doc) => {
        item.push({
          id: doc.id,
          name: doc.data()['name'],
          price: doc.data()['price'],
          description: doc.data()['description'],
        });
      });
      filterData(item, e.toLowerCase());
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingLeft: '2.5%',
          paddingRight: '2.5%',
        }}
      >
        <View style={{ flexDirection: 'row', padding: '3%' }}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={25} style={{ marginLeft: 20 }} />
            <TextInput
              placeholder="Search"
              style={styles.input}
              onChangeText={(text) => onSearch(text)}
            />
          </View>
        </View>
      </View>
      <ScrollView style={{ marginTop: 50, height: '100%' }}>
        {foods &&
          foods.map((item, key) => {
            return (
              <TouchableOpacity key={item.id}>
                <View id={item.id} style={styles.itemContainer}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80',
                    }}
                    style={styles.itemImage}
                  />
                  <View
                    style={{
                      width: '50%',
                      height: '100%',
                      justifyContent: 'center',
                      marginLeft: '5%',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: '-25%',
                      }}
                    >
                      {item.name}{' '}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        marginTop: 1,
                      }}
                    >
                      Price - {item.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'gray',
                        marginTop: 1,
                      }}
                    >
                      Description - {item.description}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignSelf: 'center',
                        marginLeft: '-50%',
                        marginTop: '10%',
                        marginBottom: '-25%',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'blue',
                          paddingLeft: 10,
                          paddingRight: 10,
                          alignContent: 'center',
                          alignSelf: 'center',
                          borderRadius: 10,
                        }}
                        onPress={() =>
                          navigation.navigate('AddCustomerDetails', {
                            items: {
                              ItemName: item.name,
                              ItemPrice: item.price,
                            },
                          })
                        }
                      >
                        <Text
                          style={{
                            color: 'white',
                            backgroundColor: '',
                          }}
                        >
                          ADD ITEM
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '5%',
    paddingBottom: 20,
  },
  logoutButton: {
    width: 100,
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 9,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 5,
  },

  header: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: '6%',
  },
  logOutContainer: {
    position: 'absolute',
    marginTop: 10,
    marginLeft: '70%',
  },
  logoutText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutBtn: {
    color: 'red',
    fontSize: 15,
  },

  arrowHeader: {
    paddingHorizontal: '5%',
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
    marginLeft: 10,
  },

  itemContainer: {
    width: '100%',
    height: responsiveHeight(15),
    backgroundColor: 'white',
    marginBottom: '5%',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  itemImage: {
    width: '25%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 50,
    alignContent: 'center',
    alignSelf: 'center',
    marginLeft: '5%',
  },

  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: 'black',
    marginLeft: 10,
  },
  loginButton: {
    width: '50%',
    backgroundColor: 'blue',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
    minHeight: 50,
    marginLeft: '45%',
  },

  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
