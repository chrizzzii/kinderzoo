import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Card = ({ dataArtikel, navigation  }) => {
  const gambarArtikel = dataArtikel.gambar
    ? dataArtikel.gambar
    : "https://drive.google.com/uc?id=1uBKn22HwbT5998eKkiBU0kfcOk1RcWtc";

  const fotoPenulis = dataArtikel.fotopenulis
    ? dataArtikel.fotopenulis
    : "https://avatars.githubusercontent.com/u/116475964?v=4";

  const potongIsiArtikel = (isi, jumlahKata) => {
    const kata = isi.split(" ");
    const potongan = kata.slice(0, jumlahKata).join(" ");
    return potongan + (kata.length > jumlahKata ? "..." : "");
  };

  return (
    <View
      style={{
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: "column",
        borderWidth: 2,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 10,
        padding: 20,
      }}
    >
      
      {/* Gambar Artikel */}
      <Image
        source={{ uri: gambarArtikel }}
        style={{
          width: "100%",
          height: 150,
          borderRadius: 8,
        }}
      />

      {/* Isi Artikel */}
      <View style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Text style={{ textAlign: "justify" }}>{potongIsiArtikel(dataArtikel.isi, 50)}</Text>
      </View>

      {/* Foto Penulis, Nama Penulis, dan Tanggal */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 8 }}>

        <View style={{ flexDirection: "row", alignItems: "center"}}>
          <Image
            source={{ uri: fotoPenulis }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              marginRight: 8,
            }}/>

          <View>
            <Text style={{ fontWeight: "bold" }}>{dataArtikel.penulis}</Text>
            <Text>{dataArtikel.tanggal}</Text>
          </View>

        </View>

        {/* Tipe Artikel */}
        <View style={{ backgroundColor: "green", paddingTop: 4 , paddingBottom: 4 , paddingLeft: 10, paddingRight: 10}}>
          <Text style={{ textAlign: "right", color: "white" }}>
            {dataArtikel.tipe}
          </Text>
        </View>

      </View>

     {/* Tombol CTA */}
     <TouchableOpacity
        onPress={() => navigation.navigate("DetailArtikel", { artikel: dataArtikel })}
        style={{ backgroundColor: "blue", marginTop: 10, padding: 10, borderRadius: 8 }}>
        <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Selengkapnya</Text>
      </TouchableOpacity>

    </View>

  );};

export default Card;