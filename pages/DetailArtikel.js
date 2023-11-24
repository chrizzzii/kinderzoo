import React from "react";
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Linking } from "react-native";

const DetailArtikel = ({ route }) => {
  const { artikel } = route.params;

  const gambarArtikel = artikel.gambar
    ? artikel.gambar
    : "https://drive.google.com/uc?id=1uBKn22HwbT5998eKkiBU0kfcOk1RcWtc";

  const data = [artikel];

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <Image source={{ uri: gambarArtikel }} style={styles.articleImage} />

            <Text style={styles.title}>{item.judul}</Text>
            
            {/* Fotopenulis, penulis, dan tanggal */}
            <View style={styles.authorInfo}>

              <Image source={{ uri: item.fotopenulis }} style={styles.authorImage} />

              <View style={styles.authorText}>
                <Text style={styles.authorName}>{item.penulis}</Text>
                <Text style={styles.date}>{item.tanggal}</Text>
              </View>

            </View>

            <Text style={styles.description}>{item.isi}</Text>

            <Text>Sumber: </Text>

            <TouchableOpacity onPress={() => Linking.openURL(item.sumber)}>
            <Text style={styles.sumber}>
              <Text style={styles.link}>{item.sumber}</Text>
            </Text>
          </TouchableOpacity>

          </>
        )}/>

    </SafeAreaView>
);};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },

  flatListContainer: {
    padding: 16,
  },

  articleImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },

  date: {
    fontSize: 12,
    marginBottom: 12,
    color: "#333",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },

  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "justify",
    lineHeight: 24,
  },

  sumber: {
    fontSize: 14,
    color: "#666",
    lineHeight: 24,
  },

  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },

  authorText: {
    flex: 1,
  },

  authorName: {
    paddingTop: 10,
    fontSize: 10,
    fontWeight: "bold",
  },

});

export default DetailArtikel;