import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { useState, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';
import PhoneInput from 'react-native-phone-number-input';

export default function AddCustomerDetails({ route, navigation }) {
  const [deliveryName, setDeliveryName] = useState('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [error, setError] = useState('');

  const { items } = route.params;
  //Place Order
  function placeOrder() {
    if (deliveryName == '' || location == '' || note == '' || phoneNo == '') {
      setError('Please fill all fields !!! ');
    } else {
      setDoc(doc(db, 'OrderDetails', new Date().toString()), {
        name: deliveryName,
        location: location,
        note: note,
        phoneNo: phoneNo,
        orderItems: items,
        totalPrice: 30,
      }).then(() => {
        navigation.navigate('ViewCustomerOrder');
      });
    }
  }

  const phoneInput = useRef();

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
          Delivery note
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
        />

        {error ? (
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'red',
              borderRadius: 10,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 12,
                fontWeight: 'bold',
              }}
            >
              {error}
            </Text>
          </View>
        ) : (
          ''
        )}

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
                placeOrder();
              }}
              title="PLACE ORDER"
            />
          </TouchableHighlight>
        </View>

        <View style={{ marginTop: 40, marginLeft: '60%', borderRadius: 20 }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    width: '100%',
    fontSize: 16,
    padding: 10,
  },
});
