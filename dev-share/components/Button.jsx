import React, { useRef } from 'react';
import { Text, Pressable, Animated, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Importa los íconos si los usas

const Button = ({
  text,
  color = ['#2E7D32', '#4CAF50'], // Gradiente por defecto
  link,
  onPress,
  size = 'medium',
  icon: Icon,
  disabled = false,
  textColor = '#FFFFFF',
  fontSize = 'text-lg',
  style,
  width = 'w-1/4',
  accessibilityLabel,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Escala el botón al 95% de su tamaño original
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Vuelve al tamaño original
      useNativeDriver: true,
    }).start();
  };

  const sizeStyles = {
    small: 'p-2',
    medium: 'p-3',
    large: 'p-4',
  };

  // Determina el tamaño de la fuente según el valor de fontSize
  const fontSizeValue = fontSize === 'text-lg' ? 18 : fontSize === 'text-xl' ? 20 : 14;

  return (
    <Pressable
      onPress={disabled ? null : link ? () => router.push(link) : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={`overflow-hidden ${sizeStyles[size]} ${width} ${
        disabled ? 'opacity-50' : ''
      } ${style}`}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      accessibilityHint={text}
      disabled={disabled}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
        }}
      >
        <LinearGradient
          colors={color}
          locations={[0, 0.3, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className={`rounded-2xl ${sizeStyles[size]} shadow p-3 overflow-hidden`}
        >
          <View className="flex-row items-center justify-center">
            {Icon && (
              <View style={{ marginRight: 8 }}>
                {React.cloneElement(Icon, { color: textColor })}
              </View>
            )}
            {disabled ? (
              <ActivityIndicator color={textColor} />
            ) : (
              <Text style={{ color: textColor, fontSize: fontSizeValue, fontWeight: '600', textAlign: 'center' }}>
                {text}
              </Text>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default Button;