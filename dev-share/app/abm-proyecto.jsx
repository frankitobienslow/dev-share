
import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity ,Alert} from 'react-native';
import { Formik, FieldArray, isInteger } from 'formik';
import * as Yup from 'yup';
//import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import ListaHabilidades from '../components/ListaHabilidades';
import ListaNiveles from '../components/ListaNivel';



const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('El nombre del proyecto es obligatorio'),
  descripcion: Yup.string().required('La descripción es obligatoria'),
  equipo: Yup.string().required('El equipo es obligatorio'),
  etapas: Yup.array()
  .of(
    Yup.object().shape({
      nombre: Yup.string().required('El nombre de la etapa es obligatorio'),
      fechaInicio: Yup.date()
      .required('La fecha de inicio es obligatoria')
      .test(
        'fechaInicio',
        'La fecha de inicio no puede ser posterior a la fecha de fin',
        function(value) {
          const { fechaFin } = this.parent;
          if (!value || !fechaFin) return true;
          return new Date(value) <= new Date(fechaFin);
        }
      ),
      fechaFin: Yup.date()
          .required('La fecha de fin es obligatoria')
          .test(
            'fechaFin',
            'La fecha de fin debe ser posterior a la fecha de inicio',
            function(value) {
              const { fechaInicio } = this.parent;
              if (!value || !fechaInicio) return true;
              return new Date(value) >= new Date(fechaInicio);
            }
          ),
          requerimientos: Yup.array()
          .of(
            Yup.object().shape({
              nombre: Yup.string()
              .required('El nombre del requerimiento es obligatoria'),
              descripcion: Yup.string()
              .required('La descripción del requerimiento es obligatoria'),
              nivel: Yup.string()
              .required('Se requiere un nivel'),
              habilidades: Yup.array()
              .of(
                Yup.string()
                .required('La habilidad es obligatoria')
              )
              .min(1, 'Debe agregar al menos una habilidad'),
            })
          )
          .min(1, 'Debe agregar al menos un requerimiento'),
        })
    )
    .min(1, 'Debe agregar al menos una etapa'),
});

  
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


async function peticion(url, metodo, token, body = null) {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
  const response = await fetch(url, { method:metodo, headers, body: JSON.stringify(body) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export default function CrearProyecto() {
  const {user} = useUser();
  
  // MANEJO DEL SUBMIT 
  const submit = async (values)=>{
    //console.log(user.id);
    //console.log(values);
    try{
        //console.log(values);
        const token = await AsyncStorage.getItem("token");
        const urlGeneral='http://localhost:3000/api';
        if(!token){
          throw new Error('No hay token de validacion');
        }
        //**** CREAR EQUIPO ********
        
          const urlEquipo = urlGeneral+'/equipo';
          const metodoE = 'POST';
          const bodyE ={nombre:values.equipo};
          let equipo =await peticion(urlEquipo,metodoE,token,bodyE);
        
        // ******** CREAR ETAPAS DEL PROYECTO *************
        
          const urlEtapa = urlGeneral+'/etapa';
          const metodoEtapa='POST';
          let etapas = values.etapas.map(item=>({
            nombre:item.nombre
          }));
          const body={nombresEtapas:etapas}
          const resEtapas = await peticion(urlEtapa,metodoEtapa,token,body);
  
        // ****** CREACION DEL PROYECTO************
        
          const urlProyecto=urlGeneral+'/proyectos';
          const metodoProyecto='POST';
          const proyecto = {titulo:values.nombre,descripcion:values.descripcion,id_cliente:user.id,id_equipo:equipo.id}
          const resProject = await peticion(urlProyecto,metodoProyecto,token,proyecto);


          /*************** CREACION DE PROYECTO ETAPA ************************ */
          const urlPE=urlGeneral+'/proyectoEtapa';
          const metodoPE='POST';
          await Promise.all(values.etapas.map(async(etapa,index)=>{
            const bodyPE={
              id_proyecto:resProject.id,
              id_etapa:resEtapas.data[index].id,
              fecha_inicio:etapa.fechaInicio,
              fecha_fin:null
            }
            const resPE = await peticion(urlPE,metodoPE,token,bodyPE);
            
            /*******************CREACION DE LOS REQUERIMIENTOS************************ */
            const urlReq = urlGeneral+'/requerimiento';
            const metodoReq='POST';
            await Promise.all(etapa.requerimientos.map(async (req)=>{
              //console.log(resPE);
              const requerimiento={
                nombre:req.nombre,
                id_proyecto_etapa:resPE.id,
                descripcion:req.descripcion,
                disponible:1
              };
              const resReq = await peticion(urlReq,metodoReq,token,requerimiento);

              /************** CREACION REQUERIMIENTO HABILIDAD************************* */
              const urlReqHab = urlGeneral+'/requerimiento-habilidad';
              const metodoRH = 'POST';
              await Promise.all(req.habilidades.map(async (habilidad)=>{
                
                const reqHab={
                  id_requerimiento:resReq.id,
                  id_habilidad:habilidad,
                  id_nivel:req.nivel,
                  id_desarrollador:user.id,
                }
                const resReqHab = await peticion(urlReqHab,metodoRH,token,reqHab);
                console.log(resReqHab);
              }));
            }));
          }));
          


      }// fin del bloque try
      catch(error){
        console.error('Error al crear el proyecto ',error.message);
      }



  }// fin submit

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Formik
        initialValues={
          {
            nombre:'',
            descripcion:'',
            equipo:'',
            etapas: [
              {
                nombre:'',
                fechaInicio:new Date(),
                fechaFin:new Date(),
                requerimientos:[
                  {
                    nombre:'',
                    descripcion:'',
                    nivel:"",
                    habilidades:[""]
                  }
                ]
              }
            ]
          }
        }
        validationSchema={validationSchema}
        onSubmit={submit}
    
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
              {
                // <DatePickerField
                //   field={{ name: 'fechaFin', value: values.fechaFin }}
                //   form={ setFieldValue }
                // />
              }
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
          
          <View style={{marginTop:10,marginBottom:10}}>
            <Text>Fecha Inicio</Text>  
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
          
         {/* <View style={{marginTop:10,marginBottom:10}}>
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
          )}}

          {/* REQUERIMIENTOS DENTRO DE ETAPA */}
          <FieldArray
            name={`etapas.${index}.requerimientos`}
          >
            {({remove: removeReq, push: pushReq}) => (
              <View>
                {etapa.requerimientos.map((requerimiento, indexR) => (
                  <View key={indexR} style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Requerimiento {indexR + 1}</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange(`etapas.${index}.requerimientos.${indexR}.nombre`)}
                      onBlur={handleBlur(`etapas.${index}.requerimientos.${indexR}.nombre`)}
                      value={requerimiento.nombre}
                      placeholder='Nombre Requerimiento'
                    />
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange(`etapas.${index}.requerimientos.${indexR}.descripcion`)}
                      onBlur={handleBlur(`etapas.${index}.requerimientos.${indexR}.descripcion`)}
                      value={requerimiento.descripcion}
                      placeholder='Requerimiento'
                    />
                    
                    {/* Campo nivel */}
                    <Text style={styles.sectionTitle}>Nivel:</Text>
                    <ListaNiveles
                      onNivelSelect={(itemValue)=>{
                        setFieldValue(`etapas.${index}.requerimientos.${indexR}.nivel`,itemValue)
                      }}
                    />
                    
                    
                      {/* Sección de Habilidades */}
                      <View style={styles.habilidadesContainer}>
                        <Text style={styles.sectionTitle}>Habilidades</Text>
                        <FieldArray
                          name={`etapas.${index}.requerimientos.${indexR}.habilidades`}
                        >
                          {({ remove: removeHab, push: pushHab }) => (
                            <View>
                              {requerimiento.habilidades?.map((habilidad, indexH) =>(
                                <View key={indexH} style={styles.habilidadItem}>
                                  <ListaHabilidades
                                    selectValue={habilidad}
                                    onHabilidadSelect={(itemValue)=>{
                                      setFieldValue(`etapas.${index}.requerimientos.${indexR}.habilidades.${indexH}`,itemValue)
                                    }}
                                  />

                                  <TouchableOpacity
                                    style={styles.deleteHabilidadButton}
                                    onPress={() => removeHab(indexH)}
                                  >
                                    <Text style={styles.deleteButtonText}>Eliminar Habilidad</Text>
                                  </TouchableOpacity>
                                </View>
                              ))}
                              <TouchableOpacity
                                style={styles.addHabilidadButton}
                                onPress={() => pushHab('')}
                              >
                                <Text style={styles.addButtonText}> Agregar Habilidad</Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </FieldArray>
                      </View>



                    {touched.etapas?.[index]?.requerimientos?.[indexR]?.descripcion && 
                     errors.etapas?.[index]?.requerimientos?.[indexR]?.descripcion && (
                      <Text style={styles.errorText}>
                        {errors.etapas[index].requerimientos[indexR].descripcion}
                      </Text>
                    )}
                    <Button 
                      title="Eliminar Requerimiento" 
                      onPress={() => removeReq(indexR)}
                      style={styles.deleteReqButton}
                    />
                  </View>
                ))}
                <Button 
                  title="Agregar Requerimiento" 
                  onPress={() => 
                    pushReq({
                      descripcion: '',
                      nivel: '',
                      habilidades: []
                    })
                  } 
                  style={styles.addReqButton}
                />
              </View>
            )}
          </FieldArray>

          <Button 
            title="Eliminar Etapa" 
            onPress={() => remove(index)}
            style={styles.deleteEtapaButton} 
          />
        </View>
      ))}
      <Button 
        title="Agregar Etapa" 
        onPress={() => push({ 
          nombre: '', 
          fechaInicio: new Date(), 
          fechaFin: new Date(),
          requerimientos: [{
            descripcion: '',
            nivel: '',
            habilidades: []
          }]
        })} 
        style={styles.addEtapaButton}
      />
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
  addReqButton:{
    color:'white',
    width:50,
    fontSize:'10',
  },
  addButtonText:{
    fontSize:'22',
    color:'black',
    fontWeight:'bold',
  },
  deleteHabilidadButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 4,
  },
  addHabilidadButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});





