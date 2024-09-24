import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre es obligatorio'),
  rubro: Yup.string().required('El rubro es obligatorio'),
  monto: Yup.number().positive('El monto debe ser un número positivo').required('El monto es obligatorio'),
  // ocupacion: Yup.string().required('La ocupación es obligatoria'),
  habilidades: Yup.array().of(Yup.string().required('La habilidad no puede estar vacía')).min(1, 'Debe ingresar al menos una habilidad'),
});

export default function publicarOferta() {
  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{ nombre: '', rubro: '', monto: '', habilidades: [''] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          // Aquí puedes manejar el envío del formulario
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              value={values.nombre}
              placeholder="Nombre"
            />
            {touched.nombre && errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('rubro')}
              onBlur={handleBlur('rubro')}
              value={values.rubro}
              placeholder="Rubro"
              
            />
            {touched.rubro && errors.rubro && <Text style={styles.errorText}>{errors.rubro}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('monto')}
              onBlur={handleBlur('monto')}
              value={values.monto}
              placeholder="Monto"
              keyboardType="numeric"
            />
            {touched.monto && errors.monto && <Text style={styles.errorText}>{errors.monto}</Text>}

            <FieldArray name="habilidades">
              {({ remove, push }) => (
                <View>
                  {values.habilidades.map((habilidad, index) => (
                    <View key={index} style={styles.habilidadContainer}>
                      <TextInput
                        style={styles.habilidadInput}
                        onChangeText={handleChange(`habilidades.${index}`)}
                        onBlur={handleBlur(`habilidades.${index}`)}
                        value={habilidad}
                        placeholder={`Habilidad ${index + 1}`}
                      />
                      <Button title="-" onPress={() => remove(index)} />
                    </View>
                  ))}
                  <Button title="Agregar Habilidad" onPress={() => push('')} />
                </View>
              )}
            </FieldArray>
            {touched.habilidades && errors.habilidades && <Text style={styles.errorText}>{errors.habilidades}</Text>}

            <Button onPress={handleSubmit} title="Publicar Oferta" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  habilidadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor:'violet',
    borderWidth:1.5
  },
  habilidadInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});