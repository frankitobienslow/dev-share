import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
//import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre del proyecto es obligatorio'),
  descripcion: Yup.string().required('La descripción es obligatoria'),
  fechaInicio: Yup.date().required('La fecha de inicio es obligatoria').min(new Date(), 'Debe ser una fecha futura'),
  fechaFin: Yup.date()
    .required('La fecha de fin es obligatoria')
    .min(Yup.ref('fechaInicio'), 'La fecha debe ser mayor que la inicial'),
  cliente: Yup.string().required('El cliente es obligatorio'),
  equipo: Yup.string().required('El equipo es obligatorio'),
  etapas: Yup.array().of(
    Yup.object().shape({
      nombre: Yup.string().required('El nombre de la etapa es obligatorio'),
      fechaInicio: Yup.date().required('La fecha de inicio es obligatoria').min(Yup.ref('fechaInicio'), 'Debe ser posterior a la fecha de inicio del proyecto'),
      fechaFin: Yup.date().required('La fecha de fin es obligatoria').min(Yup.ref('fechaInicio'), 'Debe ser posterior a la fecha de inicio de la etapa'),
    })
  ).min(1, 'Debe agregar al menos una etapa'),
  requerimientos: Yup.array().of(
    Yup.object().shape({
      descripcion: Yup.string().required('La descripción del requerimiento es obligatoria'),
    })
  ).min(1, 'Debe agregar al menos un requerimiento'),
});//  VALIDACION DE SCHEMA

// const datePickerWeb=()=>{
//   const [startDate,setStartDate]=useState(new Date());


// }

const DatePickerField = ({ field, form, ...props }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    form.setFieldValue(field.name, date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text>{field.value ? field.value.toLocaleDateString() : 'Seleccionar fecha'}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={field.value || new Date()}
        {...props}
      />
    </View>
  );
};

export default function CrearProyecto() {
  //const [fecha,setFecha]=useState(new Date());
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Formik
        initialValues={{
          nombre: 'ropaL',
          descripcion: 'descripcion proyecto',
          fechaInicio: new Date(),
          fechaFin: new Date(),
          cliente: 'pablo',
          equipo: 'tibirones',
          etapas: [{ nombre: '', fechaInicio: new Date(), fechaFin: new Date(),requerimientos:[{descripcion:''}]}],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          //ENVIO DE DATOS A LA BD

          const {nombre,descripcion,fechaInicio,fechaFin,cliente,equipo,...restoValores}=values;
        //   console.log('Nombre: ');
        //   console.log(nombre);
        //   console.log('Descripcion: ');
        //   console.log(descripcion);
        //   console.log('fecha de Inicio : ');
        //   console.log(fechaInicio);
        //   console.log('fecha fin : ');
        //   console.log(fechaFin);
        //   console.log('Cliente: ');
        //   console.log(cliente);
        //   console.log('Equipo: ');
        //   console.log(equipo);
          console.log('Resto de los Valores : ');
          console.log(restoValores.etapas[0]);

          
          // Aquí puedes manejar el envío del formulario
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <View style={styles.container}>
            <Text style={{fontSize:20,marginBottom:10,fontFamily:'arial'}}>Formulario de Proyecto</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              value={values.nombre}
              placeholder="Nombre del Proyecto"
            />
            {touched.nombre && errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('descripcion')}
              onBlur={handleBlur('descripcion')}
              value={values.descripcion}
              placeholder="Descripción"
            />
            {touched.descripcion && errors.descripcion && <Text style={styles.errorText}>{errors.descripcion}</Text>}
              {
              //   <DatePickerField
              //    field={{ name: 'fechaInicio', value: values.fechaInicio }}
              //    form={setFieldValue }
              //  />

              }
              <View style={{marginTop:10}}>

              <Text>Fecha Inicio</Text>  
              <DatePicker
              selected={values.fechaInicio}
              placeholderText='fecha inicio'
              onChange={(date)=>setFieldValue('fechaInicio',date)}
              dateFormat="dd/MM/yyyy"
              />
              </View>
              {touched.fechaInicio && errors.fechaInicio && <Text style={styles.errorText}>{errors.fechaInicio}</Text>}
              
              {
                // <DatePickerField
                //   field={{ name: 'fechaFin', value: values.fechaFin }}
                //   form={ setFieldValue }
                // />
              }
              <View style={{marginTop:10,marginBottom:10}}>
              <Text>Fecha Fin</Text>  
              <DatePicker
              selected={values.fechaFin}
              placeholder='fecha fin'
              onChange={(date)=>setFieldValue('fechaFin',date)}
              dateFormat="dd/MM/yyyy"
              />
              </View>
              {touched.fechaFin && errors.fechaFin && <Text style={styles.errorText}>{errors.fechaFin}</Text>}  

            <TextInput
              style={styles.input}
              onChangeText={handleChange('cliente')}
              onBlur={handleBlur('cliente')}
              value={values.cliente}
              placeholder="Cliente"
            />
            {touched.cliente && errors.cliente && <Text style={styles.errorText}>{errors.cliente}</Text>}

            <TextInput
              style={styles.input}
              onChangeText={handleChange('equipo')}
              onBlur={handleBlur('equipo')}
              value={values.equipo}
              placeholder="Equipo"
            />
            {touched.equipo && errors.equipo && <Text style={styles.errorText}>{errors.equipo}</Text>}

            <FieldArray name="etapas">
              {({ remove, push }) => (
                <View>
                  {values.etapas.map((etapa, index) => (
                    <View key={index} style={styles.sectionContainer}>
                      <Text style={styles.sectionTitle}>Etapa {index + 1}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(`etapas.${index}.nombre`)}
                        onBlur={handleBlur(`etapas.${index}.nombre`)}
                        value={etapa.nombre}
                        placeholder="Nombre de la Etapa"
                      />
                      {touched.etapas?.[index]?.nombre && errors.etapas?.[index]?.nombre && (
                        <Text style={styles.errorText}>{errors.etapas[index].nombre}</Text>
                      )}
                       {

                      // <DatePickerField
                      //   field={{ name: `etapas.${index}.fechaInicio`, value: etapa.fechaInicio }}
                      //   form={ setFieldValue }
                      // />
                       }
                        <View style={{marginTop:10,marginBottom:10}}>
                        <Text>Fecha Fin</Text>  
                        <DatePicker
                        selected={etapa.fechaInicio}
                        placeholder='fecha inicio'
                        onChange={(date)=>setFieldValue(`etapas.${index}.fechaInicio`,date)}
                        dateFormat="dd/MM/yyyy"
                        />
                        </View>
                          
                      {touched.etapas?.[index]?.fechaInicio && errors.etapas?.[index]?.fechaInicio && (
                        <Text style={styles.errorText}>{errors.etapas[index].fechaInicio}</Text>
                      )}
                      {

                      // <DatePickerField
                      //   field={{ name: `etapas.${index}.fechaFin`, value: etapa.fechaFin }}
                      //   form={setFieldValue} 
                      // />
                      } 
                        <View style={{marginTop:10,marginBottom:10}}>
                        <Text>Fecha Fin</Text>  
                        <DatePicker
                        selected={etapa.fechaFin}
                        placeholder='fecha fin'
                        onChange={(date)=>setFieldValue(`etapas.${index}.fechaFin`,date)}
                        dateFormat="dd/MM/yyyy"
                        />
                        </View>      
                      {touched.etapas?.[index]?.fechaFin && errors.etapas?.[index]?.fechaFin && (
                        <Text style={styles.errorText}>{errors.etapas[index].fechaFin}</Text>
                      )}

                      {/** PROBANDO REQUERIMIENTOS ESTE DENTRO DE ETAPA  */}
                      <FieldArray
                      name ={`etapas.${index}.requerimientos`}
                      >
                        {({remove:removeReq,push:pushReq})=>(
                          <View>
                            {etapa.requerimientos.map((requerimiento,indexR)=>(
                            <View key={indexR} style={styles.sectionContainer}>
                              <Text style={styles.sectionTitle}>Requerimiento {indexR +1}</Text>
                              <TextInput
                              style={styles.input}
                              onChangeText={handleChange(`etapas.${index}.requerimientos.${indexR}.descripcion`)}
                              onBlur={handleBlur(`etapas.${index}requerimientos.${indexR}.descripcion`)}
                              value={requerimiento.descripcion}
                              placeholder='Requerimiento'
                              />
                              {touched.etapas?.[index]?.requerimientos?.[indexR]?.descripcion && errors.etapas?.[index]?.requerimientos?.[indexR]?.descripcion && (
                                <Text style={styles.errorText}>{errors.etapas[index].requerimientos[indexR].descripcion}</Text>
                              )}
                              <Button title="Eliminar Requerimientos" onPress={() => removeReq(index)} />
                            </View>
                            ))}
                            <Button  title="Agregar Requerimientos" onPress={() =>pushReq('')} />
                          </View>
                        )}

                      </FieldArray>


                      <Button title="Eliminar Etapa" onPress={() => remove(index)} />
                    </View>
                  ))}
                  <Button title="Agregar Etapa" onPress={() => push({ nombre: '', fechaInicio: new Date(), fechaFin: new Date() ,requerimientos:[{descripcion:''}]})} />
                </View>
              )}
            </FieldArray>
          
            <View style={{ marginTop: 20 }}>
              <Button onPress={handleSubmit} title="Crear Proyecto" />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'30%',
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});


