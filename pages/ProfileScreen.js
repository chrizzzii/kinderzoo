import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, SafeAreaView, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import Header from "../components/Header";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://titoapp.cloud/UserController');
      console.log('API Response:', response.data);
      setUserData(response.data);
      setLoading(false);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToEditProfile = () => {
    navigation.navigate('Edit', { userData });
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>

      <Header headerText={"Profil"} flexPosition={"center"} />
      
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : userData && userData.datapengguna ? (
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={styles.profileImage}
                source={{ uri: 'https://drive.google.com/uc?id=14CTs_QgNoZ_mPrfwMXlP41TX2ChPA9Vj' }}/>
            </View>

            <Text style={styles.text}>
             Nama: {userData.datapengguna[0].nama}
            </Text>

            <Text style={styles.text}>
             Umur: {userData.datapengguna[0].umur}
            </Text>

            <Text style={styles.text}>
             Hewan Kesukaan: {userData.datapengguna[0].hewan_kesukaan}
            </Text>

            <Button title="Edit Profile" onPress={navigateToEditProfile} />

            <View style={styles.aboutContainer}>
              <Text style={styles.heading}>About</Text>
              <Text style={styles.aboutText}>
                Selamat datang di Kinderzoo, teman edukasi terbaik untuk si kecil! ini adalah aplikasi yang dibangun untuk membawa anak-anak dalam petualangan belajar tentang hewan-hewan di seluruh dunia. 
              </Text>
              <Text style={styles.aboutText}>Dengan menggunakan teknologi React Native, Kinderzoo memadukan keceriaan dan pengetahuan dalam satu aplikasi yang mudah digunakan. Dengan fakta-fakta mengenai dunia hewan, Kinderzoo membawa pengalaman belajar yang menyenangkan.</Text>
            </View>

          </View>
        ) : (
          <Text style={styles.text}>Data tidak ditemukan</Text>
        )}

      </View>

    </SafeAreaView>

  );};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },

  container: {
    flex: 1,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
  },

  aboutContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  aboutText: {
    textAlign: 'justify',
    fontSize: 16,
    marginBottom: 10,
  },

});

export default ProfileScreen;