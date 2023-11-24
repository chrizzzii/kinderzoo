import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

const EditProfileScreen = ({ route }) => {
  const { userData } = route.params;
  const navigation = useNavigation();

  const [nameInput, setNameInput] = useState(userData.datapengguna[0].nama);
  const [ageInput, setAgeInput] = useState(userData.datapengguna[0].umur);
  const [favoriteAnimalInput, setFavoriteAnimalInput] = useState(userData.datapengguna[0].hewan_kesukaan || '');

  const updateData = async () => {
    const idToUpdate = 1;
    const updatedData = {
      nama: nameInput,
      umur: ageInput,
      hewan_kesukaan: favoriteAnimalInput,};

    try {
      const response = await axios.put(`https://titoapp.cloud/user/${idToUpdate}`, updatedData);
      console.log('Update Response:', response.data);

      Alert.alert(
        'Update Berhasil',
        'Data berhasil diperbarui.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );

    } 
    catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Update Gagal', 'Gagal memperbarui data. Silahkan coba lagi.');
    }

  };

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Profil Anda</Text>
        <Octicons name="pencil" size={24} color="#333" />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Octicons name="person" size={20} color="#333" />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nama Baru"
          value={nameInput}
          onChangeText={(text) => setNameInput(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Octicons name="calendar" size={20} color="#333" />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Umur Baru"
          value={ageInput}
          onChangeText={(text) => setAgeInput(text)}
          keyboardType="numeric"/>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Octicons name="heart" size={20} color="#333" />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Hewan Kesukaan Baru"
          value={favoriteAnimalInput}
          onChangeText={(text) => setFavoriteAnimalInput(text)}/>
      </View>


      <Button title="Update Data" onPress={updateData} />

    </View>
  );};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  dataContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#555',
  },

  value: {
    fontSize: 18,
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },

  iconContainer: {
    marginRight: 8,
  },

  input: {
    flex: 1,
  },
  
});

export default EditProfileScreen;