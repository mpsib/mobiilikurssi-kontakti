import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const {status} = await Contacts.requestPermissionsAsync();
    if(status === 'granted'){
      const {data} = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      //datassa myös kontakteja ilman numeroja
      data.forEach(element => {
        if (!element.phoneNumbers){
          element.phoneNumbers = [{'number':''}];
        }        
      });

      setContacts(data);

    }
  }

  

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        renderItem={ ({item}) => 
          <View style={styles.listContainer}>
            <Text style={styles.text}>{item.name} </Text>
            <Text style={styles.text}>{item.phoneNumbers[0].number}</Text>
            
          </View>
        }
        data={contacts}
      />
      <Button onPress={getContacts} title='Get Contacts'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2%',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  list: {
    margin:'5%',
    width:'90%',
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});
