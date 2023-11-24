import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";

const DetailHewan = ({ route }) => {
  const { item } = route.params;
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      const apiKey = "36366637-dee545f9bdce3c70eb91171ae";
      const animalName = item.name.toLowerCase().replace(/\s/g, "+");

      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${apiKey}&q=${animalName}&image_type=photo`
        );

        const data = await response.json();

        if (data.hits.length > 0) {
          setPhoto(data.hits[0].largeImageURL);
        } 
        else {
          // If no photo found, set default image
          setPhoto("https://drive.google.com/uc?id=1wVNA1ALzbCi2x1T8r-n9JiZ-8_GZsvRu");
        }

      } 

      catch (error) {}

    };

    fetchPhoto();

  }, [item.name]);

  const renderInfo = (label, value) => {
    return (

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value || "Data tidak tersedia"}</Text>
      </View>

    );};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.animalName}>{item.name}</Text>

        {photo && <Image source={{ uri: photo }} style={styles.image} />}

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Taksonomi</Text>
          {renderInfo("Kingdom", item.taxonomy.kingdom)}
          {renderInfo("Filum", item.taxonomy.phylum)}
          {renderInfo("Kelas", item.taxonomy.class)}
          {renderInfo("Order", item.taxonomy.order)}
          {renderInfo("Keluarga", item.taxonomy.family)}
          {renderInfo("Marga", item.taxonomy.genus)}
          {renderInfo("Nama Ilmiah", item.taxonomy.scientific_name)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Lokasi</Text>
          {item.locations.map((location, index) => (
            <Text key={index}>{location || "Data tidak tersedia"}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Karakteristik</Text>
          {renderInfo("Mangsa", item.characteristics.prey)}
          {renderInfo("Nama Muda", item.characteristics.name_of_young)}
          {renderInfo("Perilaku Kelompok", item.characteristics.group_behavior)}
          {renderInfo("Perkiraan Ukuran Populasi", item.characteristics.estimated_population_size)}
          {renderInfo("Ancaman Terbesar", item.characteristics.biggest_threat)}
        </View>

      </ScrollView>
    </SafeAreaView>
  );};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    padding: 16,
  },

  animalName: {
    paddingTop: 22,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
    borderRadius: 8,
  },

  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
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
  },

  infoValue: {
    flex: 2,
    color: "#555",
  },
});

export default DetailHewan;