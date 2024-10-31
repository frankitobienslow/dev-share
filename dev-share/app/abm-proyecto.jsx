
import React, { useState } from 'react';
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
  // const {user} = useUser();
  // console.log(user.id);
  const {user} = useUser();
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Formik
        initialValues={{
          nombre: 'ropaL',
          descripcion: 'descripcion proyecto',
          equipo: 'tubirones',
          etapas: [{
            nombre: 'etapa1',
            fechaInicio: new Date('2024-10-28'),
            fechaFin: new Date('2024-11-05'),
            requerimientos: [
              {
                nombre:'nombre1',
                descripcion: 'req1',
                nivel: 'nivel1',
                habilidades: ['hab1', 'hab2', 'hab3']
              },
              {
                nombre:'nombre2',
                descripcion: 'req2',
                nivel: 'nivel1',
                habilidades: ['hab1']
              },
              {
                nombre:'nombre3',
                descripcion: 'req3',
                nivel: 'nivel1',
                habilidades: ['hab1', 'hab2']
              }
            ]},
      {nombre: 'etapa2',
        fechaInicio: new Date('2024-11-06'),
        fechaFin: new Date('2024-11-15'),
        requerimientos: [
          {
            nombre:'nombre1-2',
            descripcion: 'req1-2',
            nivel: 'nivel2',
            habilidades: ['hab1-2', 'hab2-2']
          },
          {
            nombre:'nombre2-2',
            descripcion: 'req2',
            nivel: 'nivel2',
            habilidades: ['hab1-2', 'hab2-2', 'hab2-3']
          },
          {
            nombre:'nombre3-2',
            descripcion: 'req3',
            nivel: 'nivel2',
            habilidades: ['hab1']
          }
        ]
      }
  ]}}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          //ENVIO DE DATOS A LA BD
          
          const {nombre,descripcion,equipo,...restoValores}=values;
          const token = await AsyncStorage.getItem("token");
          console.log(restoValores);
          // 
          // console.log('Resto de los Valores : ');
          // //  OBTENER TODOS LAS HABILIDADES DE UN REQUERIMIENTO;
          // console.log('HABILIDADES DE UN REQUERIMIENTOS: ')
          // console.log(restoValores.etapas[0].requerimientos[0].habilidades);
          // console.log('fECHA INICIO DE UNA ETAPA')
          // console.log(restoValores.etapas[0].fechaInicio);
          // console.log('FECHA FIN DE UNA ETAPA')
          // console.log(restoValores.etapas[0].fechaFin);
          // console.log('REQUERIMIENTOS DE UNA ETAPA')
          // console.log(restoValores.etapas[0].requerimientos);

          /** CONFIGURACION DE LA VARIABLES PARA LOS METODOS POST */

          /***********CREACION DEL EQUIPO DEL PROYECTO*************/ 
          // const nombreEquipo = {"nombre":equipo};
          // try{
          //     if(!token){
          //         throw new Error('No hay token de vaidacion');
          //       }
          //       if(typeof(nombreEquipo)!=='object'){
          //           throw new Error('Datos de equipo invalidos');
          //         }
          //         const response = await fetch ('http://localhost:3000/api/equipo',{
          //             method:'POST',
          //             headers:{'Content-Type':'application/json',
          //               'Authorization':`Bearer ${token}`,
          //         },
          //         body: JSON.stringify(nombreEquipo),
          //       }); 
          //       console.log("Status =>  ", response.status);
          //       console.log("HEADERS  =>  ", response.headers);

          //       if(!response.ok){
          //           const errorData = await response.json();
          //           throw new Error(errorData.menssage || `Error ${response.status}: ${response.statusText}`);

          //       }
                
          //   // RESPUESTA EXITOSA 
          //   const data = await response.json();
          //   console.log('Equipo creado: ' , data);
          //   return data; 
          
          // }
          // catch (error){
          //     console.log(error);
          //     Alert.alert("Error", data,menssage || "Hubo un error al cargar el nombre del equipo en la BD");
          //   }// fin try-catch de create equipo
            
            
            /**********  CREACION DE LA ETAPA *********** */
            //nombresEtapas.map(item=>{console.log(item[0])});
        //     const nombresEtapas = restoValores.etapas.map(item=>({
        //       nombre:item.nombre
        //     }));
        //     console.log(nombresEtapas);
            
        //     try{
        //       if(!token){
        //         throw new Error("No hay token de validacion");
        //       }
        //       restEtapas = await fetch('http://localhost:3000/api/etapa',{
        //         method:'POST',
        //         headers:{
        //           'Content-Type':'application/json',
        //           'Authorization':`Bearer ${token}`,
        //         },
                
        //         body:JSON.stringify({nombresEtapas}),
        //       });
        //       if(!restEtapas.ok){
        //         const errorData = await restEtapas.json();
        //         //console.log(restEtapas);
        //         throw new Error(errorData.menssage || `Error ${restEtapas.status}:${restEtapas.statusText}`);
        //       }// fin if 

        //       /** RESPUESTA EXITOSA */
        //       const dataEtapas = await restEtapas.json();
        //       console.log('Datos exitosos de la creacion de la etapa',dataEtapas);
        //     return dataEtapas;
        //   }// fin del try
        //  catch (error){
        //     console.log(error);
        //     //Alert.alert("Error", dataEtapas,menssage || "Hubo un error al cargar las etapas en la BD");
        //   }// fin try-catch de create etapas


          /** *******CREACION DEL PROYECTO ***********/
          // Obtencion del ID del equipo creado 
          // console.log(user.id);
          // try {
          //   const response = await fetch(`http://localhost:3000/api/equipo/${equipo}`,{
          //     method: 'GET',
          //     headers: {
          //       'Authorization': `Bearer ${token}`,
          //       'Content-Type': 'application/json',
          //     },
          //   });
      
          //   if (!response.ok){
          //     const errorMessage = await response.text();
          //     console.error("Error al obtener el nombre del equipo:", errorMessage);
          //     throw new Error(`HTTP error! status: ${response.status}`);
          //   }
      
          //   const dataEquipo = await response.json();
          //   // LLAMADO AL POST DE LA TABLA PROYECTO
          //   try{
          //     const responseProyecto = await fetch(`http://localhost:3000/api/proyectos`,{
          //       method: 'POST',
          //       headers:{
          //         'Authorization':`Bearer ${token}`,
          //         'Content-Type': 'application/json',
          //       },
          //       body:JSON.stringify({titulo:nombre,descripcion:descripcion,id_cliente:user.id,id_equipo:dataEquipo.id}),
          //     });
          //     if(!responseProyecto.ok){
          //       const errorMensaje = await responseProyecto.text();
          //       console.error('Error al crear el proyecto',errorMensaje);
          //       throw new Error(`HTTP error! status: ${responseProyecto.status}`);

          //     }
          //   }
          //   catch(error){
          //     console.log(error);
          //   }

          // }// fin try
          // catch (error) {
          //   console.log('Error consulta nombre del  equipo:', error.message);
          // }// fin catch
          
          /********* CREACION DEL PROYECTO  - ETAPA *********** */
          // const etapasProyecto = restoValores.etapas;
          // try{
          //   const proyectos = await fetch(`http://localhost:3000/api/proyectos`,{
          //     method: 'GET',
          //     headers:{
          //       'Authorization': `Bearer ${token}`,
          //       'Content-Type': 'application/json',
          //     },
          //   });
          //   const proyects = await proyectos.json();
          //   //console.log(etapasProyecto);
          //   //console.log(proyects);

          //   let indexProyect = proyects.findIndex((value)=>{
          //     return value.titulo === nombre;
          //   });

          //   /** RECORRE LAS ETAPAS QUE TIENE EL FORMULARIO Y LAS COMPARA CON LAS QUE ESTAN EN LA BD PARA OBTENER EL ID */
          //   for (let unEtapa of etapasProyecto){
          //     const fechaInicio = unEtapa.fechaInicio;
          //     const fechaFin = unEtapa.fechaFin;
          //     //console.log(fechaInicio);
          //     //console.log(fechaFin);
          //     try{
          //       console.log(unEtapa.nombre);
          //       const etapasBD = await fetch(`http://localhost:3000/api/etapa/${unEtapa.nombre}`,{
          //         method:'GET',
          //         headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          //       });
          //       //console.log(etapasBD);
          //       let etapasP = await etapasBD.json();
          //       //console.log(etapasP);
          //       /** CREATE DE PROYECTO ETAPA */
                
          //         const proyectoEtapa = await fetch(`http://localhost:3000/api/proyectoEtapa`,{
          //           method: 'POST',
          //           headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          //           body:JSON.stringify({id_proyecto:proyects[indexProyect].id,
          //             id_etapa:etapasP.id,
          //             fecha_inicio:fechaInicio,
          //             fecha_fin:fechaFin,
          //           }),  
          //         });// fin peticion
                  
          //         if(!proyectoEtapa.ok){
          //           const errorMensaje = await proyectoEtapa.text();
          //           console.error('Error al crear el proyecto',errorMensaje);
          //           throw new Error(`HTTP error! status: ${proyectoEtapa.status}`);
          //         }// fin if 
          //         else{
          //           const dataEP = await proyectoEtapa.json();
          //           console.log('Datos exitosos de la creacion del proyetco-etapa',dataEP);

          //         }// fin else



          //     }// fin try

          //     catch (error){
          //       console.log('Ocurrio un error al obtener los ID de las etapas');
          //       console.log(error);
          //     }// fin catch 

          //   }// fin for 
          //   //console.log(proyects[indexProyect].id);
          // }// fin try
          // catch(error){
          //   console.log(error);
          // }// fin catch 

          /**********************CREACION DE LOS REQUERIMIENTOS ************************ */
          
          // let id_proyecto=5;//proyects[indexProyect].id
          //  // Obtengo las etapas del proyecto desde la BD. 
          //  const etapasProyect = await fetch(`http://localhost:3000/api/proyectoEtapa`,{
          //           method:'GET',
          //           headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          //         });
          //         //console.log(etapasBD);
          //         let listEtapas = await etapasProyect.json();
                  
          //         const cantEtapasProyect = listEtapas.filter((value)=>{
          //           return value.id_proyecto === id_proyecto;
          //         });

          //         //console.log(cantEtapasProyect);
          //         //console.log(reqPorEtapas)
          //         // /** RECORRIDO DE DE LAS ETAPAS */
          //         for(let i=0; i<cantEtapasProyect.length;i++){
          //           const id_proyecto_etapa = cantEtapasProyect[i].id;
          //           const reqPorEtapas = restoValores.etapas[i].requerimientos;
          //           // RECORRIDO DE LOS REQUERIMIENTO DE UNA ETAPA
          //           for(let k=0; k<reqPorEtapas.length;k++){
          //             const nombre=reqPorEtapas[k].nombre;
          //             const descripcion=reqPorEtapas[k].descripcion;
          //             // CREAR REQUERIMIENTO 
          //             try{
          //               const resReq = await fetch(`http://localhost:3000/api/requerimiento`,{
          //                 method:'POST',
          //                 headers:{'Authorization':`Bearer ${token}`,'Content-Type':'application/json'},
          //                 body:JSON.stringify({
          //                   nombre:nombre,
          //                   id_proyecto_etapa:id_proyecto_etapa,
          //                   descripcion:descripcion,
          //                 })

          //               }); // fin metodo POST

          //               if(resReq.ok){
          //                 const exitoReq = await resReq.json();
          //                 console.log(exitoReq);
          //                 /** HACER LA LLAMADA A REQ-HABILIDAD */
          //               }
          //               else{
          //                 const errorMensaje = await resReq.text();
          //                 console.error('Error al crear el proyecto',errorMensaje);
          //                 throw new Error(`HTTP error! status: ${resReq.status}`);
          //               }
          //             }
          //             catch(error){
          //               console.log(error);
          //             }

          //           }// fin for 


          //         }// fin for 

                  /** ***************** CREACION DEREQUERIMIENTO HABILIDAD ************************** */


            


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
                    <TextInput 
                      style={styles.input}
                      onChangeText={handleChange(`etapas.${index}.requerimientos.${indexR}.nivel`)}
                      onBlur={handleBlur(`etapas.${index}.requerimientos.${indexR}.nivel`)}
                      value={requerimiento.nivel}
                      placeholder='Nivel'
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
                                  <Picker
                                    selectedValue={habilidad}
                                    style={styles.picker} // Añade estilos específicos para el Picker
                                    onValueChange={(itemValue) =>
                                      handleChange(`etapas.${index}.requerimientos.${indexR}.habilidades.${indexH}`)(itemValue)
                                    }
                                  >
                                    <ListaHabilidades/>
                                  </Picker>

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






