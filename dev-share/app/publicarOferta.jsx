import React from 'react';
import { View, Text, TextInput, StyleSheet, Label} from 'react-native';
import {useFormik, Form, Field} from 'formik';
import { Button } from 'react-native';


const formik = useFormik({
    initialValues: {
        proyecto: '',
        rubro: '',
        habilidades: [],
        monto: 0,
    },
    onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
    },
});
  

const publicarOferta = ()=>{
    return (
    <View>
        <Text>
            Publique su Oferta Laboral
        </Text>
        <Form>
            <Label>Ingrese el nombre del proyecto:</Label>
            <Field
                as={TextInput}
                name="proyecto"
                style={styles.input}
                value={formik.values.proyecto}
            />
            <Label>
                Ingrese el rubro del proyecto
            </Label>
            <Field
                as={TextInput}
                name="rubro"
                style={styles.input}
                value={formik.values.rubro}
            />
            <Label>
                Ingrese las Habilidades Necesarias
            </Label>
            <Label>
                Ingrese el monto a pagar (ARG $)
            </Label>
            <Field
                as = {Number}
                name= "monto"
                value={formik.values.monto}
            />
            <Button
                onPress = {formik.handleSubmit} 
                title = "Publicar"
            />
        </Form>

    </View>
    );

}// fin publicarOferta

const styles= StyleSheet.create({
    input:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:5,
    }
});

export default publicarOferta;