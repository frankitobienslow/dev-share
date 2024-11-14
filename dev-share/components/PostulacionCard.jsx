// UserCard.js
import React from "react";
import { View, Text,StyleSheet } from "react-native";
const postulacionCard =({name,habilidad})=>{
    return (
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.habilidad}>{habilidad}</Text>
        </View>
      );
}
export default postulacionCard;


const styles = StyleSheet.create({
  card: {
    width:'15%',
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
    margin: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  habilidad: {
    fontSize: 14,
    color: "#666",
  },
});