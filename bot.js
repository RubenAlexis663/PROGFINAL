const { Client, LocalAuth, MessageMedia} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const readline = require('readline');
const puppeteer = require('puppeteer');
const axios = require ('axios');
const fs = require ('fs');
const NewsAPI = require('newsapi');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicializar API Gemini
const genAI = new GoogleGenerativeAI("AIzaSyC_Sp-ORGTToFjms3n0p8NT9myPkmUKO4E");
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

let iaActiva = false;
 
// Inicializar la NewsAPI con tu clave API
const newsapi = new NewsAPI('35c9922f2a4543c88eaf35170ef80f78');

// Inicializar el cliente de WhatsApp con autenticación local y configuraciones de Puppeteer
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: puppeteer.executablePath(),
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--single-process',
            '--no-zygote'
        ]
    },
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/refs/heads/main/html/2.3000.1015773999-alpha.html",
    },
});
  

// Generar código QR
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR generado. Escanea con WhatsApp para conectar.');
});

// Verificar si el cliente está listo
client.on('ready', async () => {
    console.log('¡PROGBOT está conectado y listo!');

    // Enviar mensaje de saludo solo a tu número de teléfono
    const tuNumero = '3106494594@c.us';  // Reemplaza con tu número de teléfono en formato internacional
    const saludoInicial = 'Hola, Bienvenido a PROGBOT.';
    await client.sendMessage(tuNumero, saludoInicial);
    console.log('Mensaje de saludo enviado a $',{tuNumero});
});

// Verificar si la autenticación es exitosa
client.on('authenticated', (session) => {
    console.log('Autenticación exitosa. Sesión:', session);
});

client.on('auth_failure', (msg) => {
    console.error('Fallo de autenticación', msg);
});

// Función para obtener noticias de programación usando la biblioteca NewsAPI
async function fetchProgrammingNews() {
    try {
        const response = await newsapi.v2.sources({
            q: 'technology',
            from: '2024-06-11',
            sortBy: 'popularity',
            language: 'es'
        });
        console.log('API Response:', response);
        return response.sources;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return null;
    }
} 


// Manejar mensajes entrantes
client.on('message', async msg => {
    const palabrasClave = ['hola', 'que tal', 'hello', 'hi', 'alo', 'bot?', 'progbot', 'chat', 'hay alguien', 'botsito'];
    const confirmaciones = ['si', 'claro', 'por supuesto', 'obvio', 'desde luego', 'claro que yes'];
    const opciones1 = ['1', 'uno'];
    const opciones2 = ['2', 'dos'];
    const opciones3 = ['3', 'tres'];
    const opciones4 = ['4', 'cuatro'];
    const opciones5 = ['5', 'cinco'];
    const opciones6 = ['6', 'seis'];
    const opciones7 = ['7', 'siete', 'no'];
    const desactivarIA = ['Bye IA'];
    const mensajeUsuario = msg.body.toLowerCase();



    if (palabrasClave.some(palabra => mensajeUsuario.includes(palabra)) && msg.from.endsWith('@c.us')) {
        const respuesta = 'Hola un gusto saludar te, soy PROGBOT 🤖🖐🏼\n¿Quieres ver la lista de funciones que tengo para ti?';
        await client.sendMessage(msg.from, respuesta);
    } 

    if (confirmaciones.some(confirmacion => mensajeUsuario.includes(confirmacion)) && msg.from.endsWith('@c.us')) {
        const opciones = `De acuerdo 😁, te mostare la lista de mis funciones (Recuerda escribir el número de la función que deseas que realice):\n
1. Saber sobre PROGBOT y PROGRAMMASY 🤓
2. Repositorios de los semestres anteriores 🗂️
3. Perfiles de los creadores del programa 😏
4. Consultar cursos online gratuitos 🔍
5. Mundo actual de las tecnologías 🗞️
6. Conversar con IA 💬
7. Me tengo que ir 🎶`;
        await client.sendMessage(msg.from, opciones);
    }

    if (opciones1.some(opcion => mensajeUsuario.includes(opcion)) && msg.from.endsWith('@c.us')) {
        const respuesta1 = `Listo te compartire información sobre Programmasy y yo 😙 ProgBot:\n
        
Programmasy es un proyecto de programación desarrollado principalmente con Node.js y React. Básicamente, la funcionalidad de este programa web es recopilar en un solo sitio una extensa cantidad de conocimientos en el mundo de la programación y los sistemas. Estos conocimientos te los traemos a la mano en forma de cursos gratuitos y de pago, para que puedas aprender autónomamente. Aquí te comparto el link de la página para que la visites y así puedas saber más de PROGRAMMASY: https://rubenalexis663.github.io/PROGRAMMASY/\n

Ahora te hablaré un poco sobre PROGBOT (osea yo). PROGBOT es un módulo móvil de Programmasy el cual cumple la función de interactuar con los usuarios de manera fácil, rápida y dinámica. Yo PROGBOT poseo ciertas funciones que tú puedes utilizar para que yo las cumpla. Cabe recalcar que mi funcionamiento, aunque no esté en un módulo móvil independiente, sigo siendo dentro de lo que cabe un aplicativo móvil que llevas en tu WhatsApp y que puedes utilizar cuando quieras y necesites. Tanto PROGRAMMASY y PROGBOT son proyectos creados para la carrera de Tecnología en Desarrollo de Software de la Universidad de San Buenaventura.`;
        await client.sendMessage(msg.from, respuesta1);

        setTimeout(async() => {
            await client.sendMessage(msg.from, '¿Necesitas hacer algo más?');
        }, 10000);
    }

    if (opciones2.some(opcion => mensajeUsuario.includes(opcion)) && msg.from.endsWith('@c.us')) {
        const respuesta2 = `Excelente, te compartire los enlaces directos hacia los respositorios en donde se alojan los avances realizados en el proyecto PROG:\n
        
Primer Semestre: https://academiausbbogedu-my.sharepoint.com/personal/raduranm_academia_usbbog_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fraduranm%5Facademia%5Fusbbog%5Fedu%5Fco%2FDocuments%2FPROYECTO%20PROGRAMMASY%2FRepositorios%20Semestres&ga=1\n
Segundo Semestre: https://academiausbbogedu-my.sharepoint.com/personal/raduranm_academia_usbbog_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fraduranm%5Facademia%5Fusbbog%5Fedu%5Fco%2FDocuments%2FPROYECTO%20PROGRAMMASY%2FRepositorios%20Semestres%2FSemestre%202&ga=1\n
Tercer Semestre: https://academiausbbogedu-my.sharepoint.com/personal/raduranm_academia_usbbog_edu_co/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fraduranm%5Facademia%5Fusbbog%5Fedu%5Fco%2FDocuments%2FPROYECTO%20PROGRAMMASY%2FRepositorios%20Semestres%2FSemestre%202%2FSemestre%203&ga=1\n
Cuarto Semestre: https://github.com/RubenAlexis663/PROGRAMMASY\n
Quinto Semestre: https://github.com/RubenAlexis663/PROGRAMMASY/tree/PROG-v3`;
        await client.sendMessage(msg.from, respuesta2);

        setTimeout(async() => {
            await client.sendMessage(msg.from, '¿Necesitas hacer algo más?');
        }, 10000);
    }

    if (opciones3.some(opcion => mensajeUsuario.includes(opcion)) && msg.from.endsWith('@c.us')) {
        try {
            const imagenPath1 = fs.readFileSync('./imagenes/RubenDuran.jpeg');
            const imagenPath2 = fs.readFileSync('./imagenes/CristianMesa.png');
            const imagenPath3 = fs.readFileSync('./imagenes/JorgeAgudelo.jpeg');

            const respuesta3_1 = 'Ruben Duran, es el líder del proyecto y primer desarrollador del mismo, mide 1.85 metros \ntiene 21 años y aunque no era su meta ser programador, el dinero fue la principal motivación para estudiar esta carrera. 🤤';
            const respuesta3_2 = 'Cristian Mesa, desarrollador y líder de diseño del proyecto Programmasy, 1.73 metros, 37 años \ntécnico profesional en gestión contable y financiera, y me enfoqué en la parte de desarrollo de software por la gran salida en este campo y el sueldo que puedo ganar. 😎';
            const respuesta3_3 = 'Jorge Agudelo, 1.70 metros, 35 años, especializado en Inteligencia Artificial y aprendizaje automático \ncon un enfoque en la mejora continua de los sistemas de Programmasy. 😜';

            const instagramLinks = `Si quieres conocer más sobre ellos aquí te dejo sus Instagram:
        
Ruben Duran: https://www.instagram.com/ry_duran/
Jorge Agudelo: https://www.instagram.com/jorgeagudel01/
Cristian Mesa: https://www.instagram.com/Cristiancamilo8751/`;

            await client.sendMessage(msg.from, new MessageMedia('image/jpeg', imagenPath1.toString('base64'), 'RubenDuran.jpg'));
            await client.sendMessage(msg.from, respuesta3_1);
            await client.sendMessage(msg.from, new MessageMedia('image/png', imagenPath2.toString('base64'), 'CristianMesa.jpg'));
            await client.sendMessage(msg.from, respuesta3_2);
            await client.sendMessage(msg.from, new MessageMedia('image/jpeg', imagenPath3.toString('base64'), 'JorgeAgudelo.jpg'));
            await client.sendMessage(msg.from, respuesta3_3);
            await client.sendMessage(msg.from, instagramLinks);

        } catch (error) {
            console.error('Error al enviar las imágenes:', error);
            await client.sendMessage(msg.from, 'Hubo un error al enviar las imágenes. Por favor, inténtalo de nuevo más tarde.');
        }

        setTimeout(async() => {
            await client.sendMessage(msg.from, '¿Necesitas hacer algo más?');
        }, 10000);
    }


    if (opciones4.some(opcion => mensajeUsuario.includes(opcion)) && msg.from.endsWith('@c.us')) {
        fs.readFile('cursos.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error al leer el archivo JSON:', err);
                client.sendMessage(msg.from, 'Hubo un error al consultar los cursos. Por favor, inténtalo de nuevo más tarde.');
                return;
            }

            const cursos = JSON.parse(data).cursos;
            let mensajeCursos = 'Bien, los siguientes son algunos de los mejores cursos online gratuitos en programación 🥸:\n\n';
            cursos.forEach(curso => {
                mensajeCursos += `Nombre: ${curso.Nombre}\nDescripción: ${curso.Descripcion}\nURL: ${curso.Url}\nCategoría: ${curso.Categoria}\n\n`;
            });

            client.sendMessage(msg.from, mensajeCursos);
        });
        setTimeout(async() => {
            await client.sendMessage(msg.from, '¿Necesitas hacer algo más?');
        }, 10000);
    }

    if (opciones5.some(opcion => mensajeUsuario.includes(opcion)) && msg.from.endsWith('@c.us')) {
        const sources = await fetchProgrammingNews();
        console.log('SOURCES:', sources);  // Agregar log para revisar las fuentes obtenidas

        if (sources && sources.length > 0) {
            let responseMessage = 'Aquí tienes unas de las fuentes de noticias más recientes, allí podras ver noticias de Tecnología 💻:\n\n';
            sources.forEach((source, index) => {
                responseMessage += `${index + 1}. ${source.name} - ${source.description} - ${source.url}\n\n`;
            });
            await client.sendMessage(msg.from, responseMessage);
        } else {
            await client.sendMessage(msg.from, 'Lo siento, no pude encontrar noticias de tecnología en este momento.');
        }

        setTimeout(async() => {
            await client.sendMessage(msg.from, '¿Necesitas hacer algo más?');
        }, 10000);
    }


    // Función para manejar conversación con IA (opción 6)
    //if (opciones6.some(opcion => mensajeUsuario.includes(opcion)) && msg.from.endsWith('@c.us')) {

        //iaActiva = true;
       // await client.sendMessage(msg.from, 'De acuerdo, ahora puedes conversar con la IA Gemini, seguro te divertiras más con ella...😒');
       // }else if (desactivarIA.some(palabra => mensajeUsuario.includes(palabra )) && msg.from.endsWith('@c.us')){
           // iaActiva = false;
           // await client.sendMessage(msg.from, 'La IA se a ido');
      // }
       // client.on('message', async msg => {

           // const mensajeIA = msg.body.toLowerCase();

           // const result = await model.generateContent(mensajeIA);
            
           // await client.sendMessage(msg.from, result.response.text());
        //});
    


    
    
        if (opciones7.includes(mensajeUsuario)) {
            await client.sendMessage(msg.from, 'Bueno ya que te vas quiero decirte algo rapidamente 😭:');
            const audio = MessageMedia.fromFilePath('./despedida.mp3');
            await client.sendMessage(msg.from, audio);
            await client.sendMessage(msg.from, 'Nos vemos en otra ocasión ☺️.');
        }

});

client.initialize();