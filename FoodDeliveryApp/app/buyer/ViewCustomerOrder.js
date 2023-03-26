import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../FirebaseDB';
import {
  doc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
} from 'firebase/firestore';

export default function ViewCustomerOrder({ navigation }) {
  const [foods, setFoods] = useState([]);

//   View Orders Function
  function setFoodsItems() {
    onSnapshot(query(collection(db, 'OrderDetails')), (querySnapshot) => {
      let tempFoods = [];

      querySnapshot.forEach((doc) => {
        tempFoods.push({
          id: doc.id,
          name: doc.data()['name'],
          location: doc.data()['location'],
          itemName: doc.data()['orderItems']['ItemName'],
          itemPrice: doc.data()['orderItems']['ItemPrice'],
          phoneNo: doc.data()['phoneNo'],
          note: doc.data()['note'],
        });
      });
      setFoods(tempFoods);
    });
  }

  //Delete function 
  function deleteFood(id) {
    deleteDoc(doc(db, 'OrderDetails', id)).then(() => {});
  }

  useEffect(() => {
    setFoodsItems();
  }, []);

  //Main view
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Get all orders using map function */}
        {foods &&
          foods.map((item, key) => {
            return (
              <View key={key} style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderStyle: 'solid',
                    borderRadius: 5,
                    minWidth: '50%',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                    flex: 0.1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}
                >
                  {/* Details Card */}
                  <View
                    style={{
                      width: '50%',
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      backgroundColor: 'white',
                    }}
                  >
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Item :{item.itemName}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Price :{item.itemPrice}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Location : {item.location}
                    </Text>

                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Phone Number : {item.phoneNo}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Delivery Note : {item.note}
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 0.3, flexDirection: 'row' }}>
                  {/* Confirmation box */}
                  <TouchableOpacity
                    style={{ marginTop: 70, marginLeft: 15 }}
                    onPress={() => {
                      Alert.alert(
                        'Delete Food',
                        'Are you sure you want to delete this Food?',
                        [
                          {
                            text: 'OK',
                            onPress: () => deleteFood(item.id),
                          },
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                          },
                        ]
                      );
                    }}
                  >
                    {/* Trash Icon */}
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={'red'}
                      faAlignCenter
                      size={30}
                    />
                  </TouchableOpacity>

                  {/* Update customer Button */}
                  <TouchableOpacity
                    style={{ marginTop: 70, marginLeft: 50 }}
                    onPress={() =>
                      navigation.navigate('UpdateCustomerDetails', {
                        customerID: item.id,
                        customerName: item.name,
                        customerLocation: item.location,
                        customerPhoneNo: item.phoneNo,
                        customerNote: item.note,
                        itemName: item.itemName,
                        itemPrice: item.itemPrice,
                      })
                    }
                  >
                    {/* Update icon */}
                    <FontAwesomeIcon
                      icon={faPen}
                      color={'green'}
                      faAlignCenter
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

        {/* Logout Button */}
        <View
          style={{
            marginBottom: 10,
            marginEnd: 20,
            marginLeft: '60%',
            borderRadius: 20,
            alignItems: 'flex-end',
          }}
        >
          <Button
            color="#A2B223"
            title="Log Out"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
