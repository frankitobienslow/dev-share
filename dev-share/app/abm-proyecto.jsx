import React, { useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const AbmProyecto = ({ proyectoId = null }) => {
  const router = useRouter();

  // Schema de validación con Yup
  const ProyectoSchema = Yup.object().shape({
    titulo: Yup.string().required('El título es requerido'),
    fechaFinalizacion: Yup.date().required('La finalización estimada es requerida'),
    descripcion: Yup.string().required('La descripción es requerida'),
  });

  // Funcion para crear o actualizar proyecto
  const handleSubmitProyecto = async (values) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const method = proyectoId ? 'PUT' : 'POST';
      const url = proyectoId
        ? `http://localhost:3000/api/proyectos/${proyectoId}`
        : 'http://localhost:3000/api/proyectos';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Proyecto ${proyectoId ? 'actualizado' : 'creado'} con éxito!`);
        router.push('/dashboard'); // Redirigir después de guardar
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error al enviar proyecto:', error);
    }
  };

  // Si hay un ID de proyecto, cargar los datos del proyecto
  useEffect(() => {
    if (proyectoId) {
      const fetchProyecto = async () => {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/proyectos/${proyectoId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // Llenar el formulario con los datos del proyecto
        if (response.ok) {
          formik.setValues({
            titulo: data.titulo,
            fechaFinalizacion: data.duracion_estimada,
            descripcion: data.descripcion,
          });
        } else {
          alert('Error al cargar los datos del proyecto');
        }
      };
      fetchProyecto();
    }
  }, [proyectoId]);

  return (
    <View className="p-4">
      <Text className="text-lg font-bold text-center mb-4">
        {proyectoId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
      </Text>

      <Formik
        initialValues={{
          titulo: '',
          fechaFinalizacion: '',
          descripcion: '',
        }}
        validationSchema={ProyectoSchema}
        onSubmit={handleSubmitProyecto}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text className="text-base">Título</Text>
            <TextInput
              className="border p-2 rounded mb-2"
              onChangeText={handleChange('titulo')}
              onBlur={handleBlur('titulo')}
              value={values.titulo}
              placeholder="Ingresa el título"
            />
            {errors.titulo && touched.titulo ? (
              <Text className="text-red-500">{errors.titulo}</Text>
            ) : null}

            <Text className="text-base">Fecha de Finalización Estimada</Text>
            <TextInput
              className="border p-2 rounded mb-2"
              onChangeText={handleChange('fechaFinalizacion')}
              onBlur={handleBlur('fechaFinalizacion')}
              value={values.fechaFinalizacion}
              placeholder="AAAA-MM-DD"
            />
            {errors.fechaFinalizacion && touched.fechaFinalizacion ? (
              <Text className="text-red-500">{errors.fechaFinalizacion}</Text>
            ) : null}

            <Text className="text-base">Descripción</Text>
            <TextInput
              className="border p-2 rounded mb-2"
              onChangeText={handleChange('descripcion')}
              onBlur={handleBlur('descripcion')}
              value={values.descripcion}
              placeholder="Ingresa la descripción"
              multiline
            />
            {errors.descripcion && touched.descripcion ? (
              <Text className="text-red-500">{errors.descripcion}</Text>
            ) : null}

            <Pressable
              className="bg-blue-700 rounded-lg py-2 px-4 mt-4"
              onPress={handleSubmit}
            >
              <Text className="text-white text-lg text-center">
                {proyectoId ? 'Actualizar Proyecto' : 'Crear Proyecto'}
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AbmProyecto;