import { View, FlatList, StyleSheet } from "react-native";
import { dataArtikel } from "../data/DataArtikel";
import Card from "../components/Card";
import Header from "../components/Header";

function ArtikelScreen({ navigation }) {
  return (
    <View style={style.container}>

      <Header headerText={"Artikel"} flexPosition={"center"} />

      <FlatList
        showsVerticalScrollIndicator={false}
        legacyImplementation={false}
        data={dataArtikel}
        renderItem={({ item }) => <Card dataArtikel={item} navigation={navigation} />}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 70 }}/>

    </View>
  );}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
});

export default ArtikelScreen;