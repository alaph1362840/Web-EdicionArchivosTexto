//------ CLASES -----
class FraseReemplazo{
    constructor(p_origen, p_reemplazo) {
        this.p_origen= p_origen;
        this.p_reemplazo = p_reemplazo;
    }
}

class ArchivoTxt{
    constructor(texto) {
        //-- EXPRESIONES REGULARES ---
        this.exrPuntos= /[a-zA-Z]\.[a-zA-Z]/g;
        this.texto = texto;
        this.nombreArchivo="descarga.txt";
    }
    addEspacioPuntos(){
        var contadorCambios = 0;
        this.texto = this.texto.replace(this.exrPuntos, (coincidencia, indice, cadena)=>{
            let res = ""+cadena.charAt(indice) + cadena.charAt(indice+1)+" "+cadena.charAt(indice+2);
            contadorCambios++;
            return res;
        });
        if (contadorCambios > 0) {
            alertify.success("Cambios Realizados: "+ contadorCambios);
        }else{
            alertify.warning('No se encontraron coincidencias.'); 
        }         
        return this.texto;
    }
    guardarArchivo(){
        //let textoGuardar = this.texto.replace(/\n/g, "\r\n"); //Es para que los saltos de linea se muestren.
        var blob = new Blob([this.texto], {type:'text/plain',endings:'native'});
        saveAs(blob, this.nombreArchivo);        
    }
    reemplazarLista(texto, separador){
        var contadorCambios = 0;
        var centi = "";
        let arrTexto = texto.split('\n');//divide el texto en un arreglo por lineas de archivo(salto de linea)
        let arrCenti = [];//arreglo que se forma al separar la linea con un el sepadarador
        if (texto.length>0) {
            arrTexto.forEach(element => {
                //let elementV = element.replace(/(\r\n|\n|\r)/gm,"");//Elimina todos los saltos de linea.            
                let elementV = element.trim();//Elimina todos los saltos de linea.
                arrCenti = elementV.split(separador);
                switch (arrCenti.length) {
                    case 1:
                        centi = this.texto.replaceAll(arrCenti[0], "");
                        if (centi != this.texto) {
                            contadorCambios++;
                            this.texto = centi;
                        }                    
                        break;
                    case 2:
                        centi = this.texto.replaceAll(arrCenti[0], arrCenti[1]);
                        if (centi != this.texto) {
                            contadorCambios++;
                            this.texto = centi;
                        }
                        break;
                    default:
                        break;
                }           
            });
            if (contadorCambios > 0) {
                alertify.success("Cambios Realizados: "+ contadorCambios);
            }else{
                alertify.warning('No se encontraron coincidencias.'); 
            }
        } else {
            alertify.error('Debe subir un archivo con el texto a reemplazar.'); 
        }
           
        return this.texto;
    }
    numerosALetras(separadorDecimal, NDPosicion, mayusculas){
        var contadorCambios = 0;
        let sepDecimal = '';
        let sepMiles = '';
        if (separadorDecimal=='.') {
            sepDecimal = '\\.';
            sepMiles = ',';
        } else {
            sepDecimal = ',';
            sepMiles = '\\.';
        }
        var cadenaExr = "(?<=\\s|^)(([0-9]+"+sepMiles+"[0-9]+)+|[0-9]+)("+sepDecimal+"[0-9]+(?=\\s|$)|"+sepDecimal+"[0-9]+(?=\\.(\\s|$))|(?=\\.(\\s|$))|(?=\\s)|(?=$))";
        console.log(cadenaExr);
        var expNumero = new RegExp(cadenaExr,'g');        
        this.texto = this.texto.replace(expNumero, (coincidencia, indice, cadena)=>{
            let res = "";
            if (mayusculas) {
                res = this.convertirNumero(coincidencia,separadorDecimal,NDPosicion); 
            } else {
                res = this.convertirNumero(coincidencia,separadorDecimal,NDPosicion).toLowerCase();
            }
            contadorCambios++;            
            return res;
        });
        if (contadorCambios > 0) {
            alertify.success("Cambios Realizados: "+ contadorCambios);
        }else{
            alertify.warning('No se encontraron coincidencias.'); 
        }   
        return this.texto;
    }
    //Metodos basicos para la conversion de numeros a letras.
    Unidades(num, grupo){
        switch(num)
        {
            case 1:
                if (grupo == 0) {
                    return "UNO";
                } else {
                    return "UN";
                }
            case 2: return "DOS";
            case 3: return "TRES";
            case 4: return "CUATRO";
            case 5: return "CINCO";
            case 6: return "SEIS";
            case 7: return "SIETE";
            case 8: return "OCHO";
            case 9: return "NUEVE";
        }
        return "";
    }
    Decenas(num, grupo){
        let decena = Math.floor(num/10);
        let unidad = num - (decena * 10);
    
        switch(decena)
        {
            case 1:
                switch(unidad)
                {
                    case 0: return "DIEZ";
                    case 1: return "ONCE";
                    case 2: return "DOCE";
                    case 3: return "TRECE";
                    case 4: return "CATORCE";
                    case 5: return "QUINCE";
                    default: return "DIECI" + this.Unidades(unidad, grupo);
                }
            case 2:
                switch(unidad)
                {
                    case 0: return "VEINTE";
                    default: return "VEINTI" + this.Unidades(unidad, grupo);
                }
            case 3: return this.DecenasY("TREINTA", unidad, grupo);
            case 4: return this.DecenasY("CUARENTA", unidad, grupo);
            case 5: return this.DecenasY("CINCUENTA", unidad, grupo);
            case 6: return this.DecenasY("SESENTA", unidad, grupo);
            case 7: return this.DecenasY("SETENTA", unidad, grupo);
            case 8: return this.DecenasY("OCHENTA", unidad, grupo);
            case 9: return this.DecenasY("NOVENTA", unidad, grupo);
            case 0: return this.Unidades(unidad, grupo);
        }
    }
    DecenasY(strSin, numUnidades, grupo) {
        if (numUnidades > 0){
            return strSin + " Y " + this.Unidades(numUnidades, grupo);
        }
        return strSin;
    }
    Centenas(num, grupo) {
        let centenas = Math.floor(num / 100);
        let decenas = num - (centenas * 100);
        switch(centenas)
        {
            case 1:
                if (decenas > 0)
                    return "CIENTO " + this.Decenas(decenas,grupo);
                return "CIEN";
            case 2: return "DOSCIENTOS " + this.Decenas(decenas,grupo);
            case 3: return "TRESCIENTOS " + this.Decenas(decenas,grupo);
            case 4: return "CUATROCIENTOS " + this.Decenas(decenas,grupo);
            case 5: return "QUINIENTOS " + this.Decenas(decenas,grupo);
            case 6: return "SEISCIENTOS " + this.Decenas(decenas,grupo);
            case 7: return "SETECIENTOS " + this.Decenas(decenas,grupo);
            case 8: return "OCHOCIENTOS " + this.Decenas(decenas,grupo);
            case 9: return "NOVECIENTOS " + this.Decenas(decenas,grupo);
        }
        return this.Decenas(decenas, grupo);
    }
    obtnerLetrasEntero(sn) {
        let letras = "";
        //---- SEPARAR -NUMERO EN SUBGRUPOS DE 3--
        let listGrupos = [];
        let centinela = "";
        let gc=0;
        for (let i = (sn.length-1); i >= 0; i--) {
            if (gc < 3) {
                centinela = sn.charAt(i) + centinela;            
            } else {
                listGrupos.push(centinela);
                gc = 0;
                centinela = sn.charAt(i);            
            }
            if (i==0 && gc < 3) {
                listGrupos.push(centinela);
            }
            gc++;             
        }
        //---- GENERA EL TEXTO A RETORNAR
        let listMillones = [" MILLON", " BILLON", " TRILLON", " CUATRILLON", " QUINTILLON", " SEXTILLON", " SEPTILLON", " OCTILLON", " NONILLON"];
        let cmiles = false;    
        let cmillones = 0;// VERIFICA QUE AYAN PASADO 2 GRUPOS DE NUMEROS (6 DIGITOS)
        let cmillones2 = 0; //ES LA LLAVE PARA LA LISTA "listMillones" OBTINE UN STRIN DIFERENTE CADA 6 DIGITOS
        for (let j = 0; j < listGrupos.length; j++) {
            const element = parseInt(listGrupos[j]);
            if (cmiles) {
                letras = " MIL "+letras;
                cmiles = false;
            }else{
                cmiles = true;
            }
            if (cmillones==2) {
                if (element ==1) {
                    letras = listMillones[cmillones2] + " " + letras;
                }
                if (element > 1) {
                    letras = listMillones[cmillones2] + "ES " + letras;
                }
                cmillones2++;
                cmillones=0;
            }
            letras = this.Centenas(element,j) + letras;        
            cmillones++;
        }
        return letras;
    }
    /**
     * 
     * @param {String de numero a tratar} snn 
     * @param {caracter que puede ser '.' o una ','} separadorDecimal 
     * @param {nombrar decimales segun su posicion puede ser true o false} NDPosicion 
     * @returns retorna el numero en letras.
     */
    convertirNumero(snn, separadorDecimal, NDPosicion) {
        //let sn = limpiarSignos(snn);
        let numeros=['0','1','2','3','4','5','6','7','8','9'];
        let letras = "";
        //separacion de parte entera y parte decimal.
        let pEntera = "";
        let pDecimal = "";
        let exitePunto = false;
        for (let i = 0; i < snn.length; i++) {
            const element = snn.charAt(i);
            if (element == separadorDecimal) {
                exitePunto = true;
            }
            if (!exitePunto) {
                if (numeros.includes(element)) {
                    pEntera = pEntera + element;
                }            
            } else {
                if (numeros.includes(element)) {
                    pDecimal = pDecimal + element;
                }           
            }        
        }
        // --------------------- AREA PARA DEFINIR LETRAS PARA LOS DECIMALES ---------------
        let listPosicon = ["DÉCIMA", "CENTÉSIMA" , "MILÉSIMA", "DIEZMILÉSIMA", "CIENMILÉSIMA", "MILLONÉSIMA", "DIEZMILLONÉSIMA", "CIENMILLONÉSIMA", "MILMILLONÉSIMA", "DIEZMILMILLONÉSIMA"];
        let ndecimal = parseInt(pDecimal);
        let lDecimal = pDecimal.length - 1;
        //ceros a la izquierda en la parte decimal
        let sCeros="";
        let centiCeros = 0;
        if (pDecimal!=""  && ndecimal>0 ) {
            while (pDecimal.charAt(centiCeros)=='0') {
                sCeros = sCeros + "CERO ";
                centiCeros++;
            }
        }
        //NOMBRAR DECIMALES SEGUN POSICION    
        let fraseDecimal = "";
        if (NDPosicion && pDecimal!="" && ndecimal>0 ) {
            if (ndecimal == 1) {
                fraseDecimal = listPosicon[lDecimal];
            }else{
                fraseDecimal = listPosicon[lDecimal]+"S";
            }
            fraseDecimal = " " + fraseDecimal + " ";
        }

        letras = letras + this.obtnerLetrasEntero(pEntera);
        let separador = "";
        if (separadorDecimal == '.') {
            separador = " PUNTO ";
        } else {
            separador = " COMA ";
        }
        if (pDecimal!=""  && ndecimal>0) {
            letras = letras + separador + sCeros + this.obtnerLetrasEntero(pDecimal) + fraseDecimal; 
        }           
        return letras;
    }
}

let cArchivo = new ArchivoTxt($("#txtArchivo").val());

//-- CARGAR EL TEXTO DEL ARCHIVO EN EL TEXT AREA
function cargarArchivo(e) {
    //crea archivo 
    let file = e.target.files[0];
    //obtener el nombre del archivo subido
    let path = e.target.value;
    let exrRuta = /[A-Za-z0-9_ -]+\.[A-Za-z0-9]+\b(?!\\|\/)/;
    let nombreArchivo = exrRuta.exec(path)[0];    
    if (path.includes(".txt")) {
        if (file) { //este if verifica que el archivo exista
            //---LECTURA DE ARCHIVO---
            let reader = new FileReader();
            let codi = $("#codificacion").val();
            reader.readAsText(file, codi);
            reader.onload = function (e) {
                let texto = e.target.result;  
                textoArchivo = texto;
                $("#txtArchivo").val(textoArchivo);
                $("#txtArchivo").trigger("change");
                cArchivo.nombreArchivo = nombreArchivo;       
            }
            reader.readAsText(file);            
        } else {
            alertify.error('Debes seleccionar un archivo de texto para trabajar.');
        }
    } else {
        alertify.error('Debes seleccionar un archivo de texto para trabajar.');
    }       
}
var archivo = document.getElementById("archivo");
archivo.addEventListener("change", cargarArchivo);
$("#txtArchivo").change(function () {
    cArchivo.texto = $(this).val();   
});

//-- ESTABLECER FRASES DE REEMPLAZO.
let textoReemplazo = "";
let separador ='--';
function cargarArchivoReemplazos(e) {
    let file = e.target.files[0];
    let path = e.target.value;
    if (path.includes(".txt")) {
        if (file) { //este if verifica que el archivo exista
            let reader = new FileReader();
            reader.onload = function (e) {
                textoReemplazo = e.target.result;  
                separador = $("#txtSeparadorFrases").val();
                //console.log("Hola desde el segundo archivo");     
            }
            reader.readAsText(file);            
        } else {
            alertify.error('Debes seleccionar un archivo de texto para trabajar.');
        }
    } else {
        alert('¡Por favor ingrese un archivo de texto .txt para continuar!'); 
    }       
}
var archivoR = document.getElementById("archivoRemplazos");
archivoR.addEventListener("change", cargarArchivoReemplazos);

// --- OCULTAR O MOSTRAR INFORMACION DE AYUDA
$("#ayudaRM").hide();
$("#ayudaCN").hide();
let cOjoAbierto = "fa-eye";
let cOjoCerrado = "fa-eye-slash";
let instruccionRM= false;
let instruccionCN= false;
$("#btnInstruccionRM").click(function () { 
    if (instruccionRM) {
        $("#ayudaRM").hide();
        instruccionRM=false;
    } else {
        $("#ayudaRM").show();
        instruccionRM=true;
    }
    $("#eyeRM").toggleClass(cOjoAbierto);
    $("#eyeRM").toggleClass(cOjoCerrado);    
});
$("#btnInstruccionCN").click(function () { 
    if (instruccionCN) {
        $("#ayudaCN").hide();
        instruccionCN = false;
    } else {
        $("#ayudaCN").show();
        instruccionCN = true;
    }
    $("#eyeCN").toggleClass(cOjoAbierto);
    $("#eyeCN").toggleClass(cOjoCerrado);    
});

// ------ CORRECCION DE PUNTOS SIN ESPACIO -----
$("#btnAgregarEspacios").click(function () {
    $("#txtArchivo").val(cArchivo.addEspacioPuntos());
});

//-- GUARDAR ARCHIVO ----
$("#btnGuardarArchivo").click(function () { 
    cArchivo.guardarArchivo();    
});

//----- REEMPLAZOS ----
$("#btnReemplazosMultiples").click(function () {
    $("#txtArchivo").val(cArchivo.reemplazarLista(textoReemplazo, separador));
        
});

//------ CONVERTIR NUMEROS A LETRAS ------------
$("#btnConvertirNumeros").click(function () {
    let separador = $("#txtSeparadorDecimal").val();
    let NDPosicion = false;
    let mayusculas = false;
    if ($('#switchNDecimales').prop('checked')) {
        NDPosicion = true;
    }
    if ($('#switchMaysucula').prop('checked')) {
        mayusculas = true;
    }
    $("#txtArchivo").val(cArchivo.numerosALetras(separador, NDPosicion, mayusculas));
       
});
 
