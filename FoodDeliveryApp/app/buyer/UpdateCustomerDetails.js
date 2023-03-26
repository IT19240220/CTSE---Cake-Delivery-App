import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';
import PhoneInput from 'react-native-phone-number-input';

export default function UpdateCustomerDetails({ route, navigation }) {
  const [deliveryName, setDeliveryName] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const {
    customerID,
    customerName,
    customerLocation,
    customerNote,
    customerPhoneNo,
  } = route.params;

  const phoneInput = useRef();

  useEffect(() => {
    setDeliveryName(customerName);
    setLocation(customerLocation);
    setNote(customerNote);
    setPhoneNo(customerPhoneNo);
  }, []);

  //Place Order
  function updateDetails() {
    updateDoc(doc(db, 'OrderDetails', customerID), {
      name: deliveryName,
      location: location,
      note: note,
      phoneNo: phoneNo,
    }).then(() => {
      navigation.navigate('ViewCustomerOrder');
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ marginTop: 100, marginBottom: 20, fontSize: 20 }}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDeliveryName}
          placeholder={'Enter your name'}
          value={deliveryName}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Delivery Address
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder={'Enter your address'}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Delivery Note
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setNote}
          placeholder={'Enter delivery note'}
          value={note}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Phone Number
        </Text>
        <PhoneInput
          style={styles.input}
          ref={phoneInput}
          defaultValue={phoneNo}
          defaultCode="SL"
          onChangeFormattedText={(text) => {
            setPhoneNo(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <View style={{ margin: 40 }}>
          <TouchableHighlight
            style={{
              height: 40,
              width: 160,
              borderRadius: 10,
              backgroundColor: 'yellow',
              marginLeft: 50,
              marginRight: 50,
            }}
          >
            <Button
              color="#841584"
              onPress={() => {
                updateDetails();
              }}
              title="UPDATE DETAILS"
            />
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: 325,
    marginBottom: 60,
    fontSize: 16,
    padding: 10,
  },
});
