function numerosALetras(numero,separadorDecimal, NDPosicion, mayusculas){
    let texto = numero;
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
    var expNumero = new RegExp(cadenaExr,'g');        
    texto = texto.replace(expNumero, (coincidencia, indice, cadena)=>{
        let res = "";
        if (mayusculas) {
            res = convertirNumero(coincidencia,separadorDecimal,NDPosicion); 
        } else {
            res = convertirNumero(coincidencia,separadorDecimal,NDPosicion).toLowerCase();
        }            
        return res;
    });  
    return texto;
}
//Metodos basicos para la conversion de numeros a letras.
function  Unidades(num, grupo){
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
function Decenas(num, grupo){
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
                default: return "DIECI" + Unidades(unidad, grupo);
            }
        case 2:
            switch(unidad)
            {
                case 0: return "VEINTE";
                default: return "VEINTI" + Unidades(unidad, grupo);
            }
        case 3: return DecenasY("TREINTA", unidad, grupo);
        case 4: return DecenasY("CUARENTA", unidad, grupo);
        case 5: return DecenasY("CINCUENTA", unidad, grupo);
        case 6: return DecenasY("SESENTA", unidad, grupo);
        case 7: return DecenasY("SETENTA", unidad, grupo);
        case 8: return DecenasY("OCHENTA", unidad, grupo);
        case 9: return DecenasY("NOVENTA", unidad, grupo);
        case 0: return Unidades(unidad, grupo);
    }
}
function DecenasY(strSin, numUnidades, grupo) {
    if (numUnidades > 0){
        return strSin + " Y " + Unidades(numUnidades, grupo);
    }
    return strSin;
}
function Centenas(num, grupo) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);
    switch(centenas)
    {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas,grupo);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas,grupo);
        case 3: return "TRESCIENTOS " + Decenas(decenas,grupo);
        case 4: return "CUATROCIENTOS " + Decenas(decenas,grupo);
        case 5: return "QUINIENTOS " + Decenas(decenas,grupo);
        case 6: return "SEISCIENTOS " + Decenas(decenas,grupo);
        case 7: return "SETECIENTOS " + Decenas(decenas,grupo);
        case 8: return "OCHOCIENTOS " + Decenas(decenas,grupo);
        case 9: return "NOVECIENTOS " + Decenas(decenas,grupo);
    }
    return Decenas(decenas, grupo);
}
function obtnerLetrasEntero(sn) {
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
        letras = Centenas(element,j) + letras;        
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
 function convertirNumero(snn, separadorDecimal, NDPosicion) {
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

    letras = letras + obtnerLetrasEntero(pEntera);
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
    numero = $("#numero").val();
    $("#respuesta").val(numerosALetras(numero, separador, NDPosicion, mayusculas));
       
});

