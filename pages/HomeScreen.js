import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';

function HomeScreen() {
  const [name, setName] = useState("");
  const [animals, setAnimals] = useState([]);
  const [showSearchMessage, setShowSearchMessage] = useState(false);
  const navigation = useNavigation();

  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
        headers: {
          'X-Api-Key': 'y7efwpuA3zrjQ4anwq0BdA==H6XEViWYuenvC7X8',},
      });
  
      if (response.status === 200) {
        setAnimals(response.data);
  
        if (response.data.length === 0) {
          setShowSearchMessage(true);
        } 
        else {
          setShowSearchMessage(false);
        }

      } 

      else {
        console.error(`Error fetching data. Status code: ${response.status}`);
        setAnimals([]);
        setShowSearchMessage(true);
      }} 

      catch (error) {

      if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
        setAnimals([]);
        setShowSearchMessage(true);
      } 
      else {
        console.error("Error fetching data:", error);
        setAnimals([]);
        setShowSearchMessage(true);
      }}
  };
  

  const handleSearch = () => {
    fetchAnimals();
  };
  
  const renderInfo = (label, value) => {
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || "Data tidak tersedia"}</Text>
      </View>
    );
  };

  const renderAnimalItem = ({ item }) => (
    <SafeAreaView style={styles.animalContainer}>
      
      <Text style={styles.animalName}>{item.name}</Text>
      {renderInfo("Kingdom", item.taxonomy.kingdom)}
      {renderInfo("Filum", item.taxonomy.phylum)}
      {renderInfo("Mangsa", item.characteristics.prey)}
      {renderInfo("Nama Muda", item.characteristics.name_of_young)}
      
      <Text style={styles.label}>Lokasi</Text>
      {item.locations.map((location, index) => (
            <Text key={index}>{location || "Data tidak tersedia"}</Text>
          ))}

      {/* Tombol Detail */}
      <TouchableOpacity onPress={() => handleDetailPress(item)}>
        <View style={styles.detailButton}>
          <Ionicons name="ios-information-circle" size={24} color="blue" />
          <Text style={styles.detailButtonText}>Lihat Detail</Text>
        </View>
      </TouchableOpacity>

    </SafeAreaView>
  );

  const handleDetailPress = (item) => {
    navigation.navigate('DetailHewan', { item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cari nama hewan..."
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TouchableOpacity onPress={handleSearch} style={styles.searchIconContainer}>
          <Ionicons name="ios-search" size={24} color="black" />
        </TouchableOpacity>

      </View>

      {showSearchMessage && animals.length === 0 && <Text>Tidak ada hasil.</Text>}

      <FlatList
        data={animals}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderAnimalItem}/>

    </SafeAreaView>

  );}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 42,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },

  searchIconContainer: {
    marginLeft: 10,
  },

  animalContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },

  animalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  infoLabel: {
    flex: 1,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },

  infoValue: {
    flex: 2,
    color: "#555",
    marginTop: 5,
  },

  label: {
    fontWeight: "bold",
    marginTop: 5,
  },

  detailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  detailButtonText: {
    marginLeft: 5,
    color: 'blue',
  },

});

export default HomeScreen;