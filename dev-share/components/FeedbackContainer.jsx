import React, { useEffect, useState, useRef } from "react";
import { Text, ActivityIndicator, ScrollView, View, Pressable, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { FeedbackCard } from "./FeedbackCard";

const FeedbackContainer = () => {
  const { user } = useUser();
  const [feedbacks, setFeedbacks] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Altura inicial 250 para incluir el título y estrellas
  const animationHeight = useRef(new Animated.Value(300)).current;

  const fetchFeedbacks = async () => {
    setCargando(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/feedbackUsuario/${user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error al obtener feedbacks:", errorMessage);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      setFeedbacks(data);

      const totalStars = data.reduce((sum, feedback) => sum + feedback.id_feedback, 0);
      const average = data.length > 0 ? totalStars / data.length : 0;
      setAverageRating(average);

    } catch (error) {
      console.error("Error fetching feedbacks:", error.message);
      setError(`Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchFeedbacks();
    }
  }, [user]);

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(animationHeight, {
      toValue: expanded ? 300 : 600, // Ajustamos el valor expandido para incluir todo el contenido
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (cargando) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        className="self-center my-4"
      />
    );
  }

  if (error) {
    console.log(error)
    return <Text className="text-gray-500 text-center">Aún no se registraron valoraciones</Text>;
  }

  return (
    <Animated.View style={{ height: animationHeight }} className="p-2 w-[60%] mx-auto">
      <Text className="text-center text-lg font-bold mb-2">Valoraciones</Text>
      <View className="flex-row justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= Math.round(averageRating) ? 'star' : 'star-outline'}
            size={36}
            color={star <= Math.round(averageRating) ? '#FFD700' : '#C0C0C0'}
          />
        ))}
      </View>
      
      <Pressable onPress={toggleExpand}>
        <Text className="text-blue-500 text-center mb-2">
          {expanded ? "Ver menos" : "Ver más"}
        </Text>
      </Pressable>
      
      {/* Aseguramos altura inicial del ScrollView */}
      <ScrollView contentContainerStyle={{ minHeight: expanded ? undefined : 300 }}>
        {feedbacks.map((feedback, index) => (
          <FeedbackCard key={index} feedback={feedback} />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default FeedbackContainer;