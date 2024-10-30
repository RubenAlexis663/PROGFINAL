import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Linking, Image } from 'react-native';

const IndexScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../img/inicio.gif')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>PROG-BOT</Text>
        <Text style={styles.paragraph}>
          Programmasy presenta a Progbot, en este semestre decidimos crear un chat bot en WhatsApp, anteriormente en Programmasy los usuarios podían tener a la mano una gran variedad de cursos online en el mundo de la programación, ahora bien ProgBot además de poder hacer eso, también tiene otras funciones únicas para la interacción directa con los usuarios. 
          </Text>
          <Text style={styles.paragraph}>
          ProgBot está más enfocado a las noticias en la comunidad de programadores con lo cual podrás ver noticias de último momento, nuevas tecnologías, lenguajes más usados, entre otras cosas más. Ahora que te hemos dado esta breve explicación, con el botón de abajo podrás ir al chat en WhatsApp y poder chatear con ProgBot ; ).
        </Text>
        <TouchableOpacity style={styles.chatButton} onPress={() => Linking.openURL('https://wa.me/573106494594')}>
          <Text style={styles.chatButtonText}>CHAT</Text>
        </TouchableOpacity>
        <View style={styles.qrContainer}>
          <View style={styles.lineContainer}>
            <Text style={styles.qrText}>Código QR de ProgBot, escanéalo para chatear.</Text>
            <View style={styles.line} />
          </View>
          <Image source={require('../img/PROGBOT.png')} style={styles.qrImage} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', // Centra el fondo horizontalmente
    alignItems: 'center', // Centra el fondo verticalmente
  },
  container: {
    flex: 1,
    width: '100%', // Asegura que el contenedor ocupe todo el ancho
    padding: 20,
    justifyContent: 'flex-start', // Alinea los elementos al inicio del contenedor
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'sans-serif', // Puedes cambiar esto a la tipografía que prefieras
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    textAlign: 'right',
    marginTop: 30, // Añade margen superior para espacio desde arriba
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium', // Puedes cambiar esto a la tipografía que prefieras
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginVertical: 10,
  },
  paragraph: {
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'sans-serif-light', // Puedes cambiar esto a la tipografía que prefieras
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginVertical: 10,
  },
  chatButton: {
    backgroundColor: '#00aaff', // Color azul celeste
    padding: 15,
    width: 150,
    borderRadius: 10, // Esquinas redondeadas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  chatButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  qrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  qrText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'sans-serif-light',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginRight: 10,
  },
  lineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    flex: 1,
    marginLeft: 10,
  },
  qrImage: {
    width: 170,
    height: 170,
    marginLeft: 10,
  },
});

export default IndexScreen;