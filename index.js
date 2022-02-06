//-- CARGAR EL TEXTO DEL ARCHIVO EN EL TEXT AREA
function cargarArchivo(e) {
    //e.preventDefault();
    let file = e.target.files[0];
    let path = e.target.value;
    if (path.includes(".txt")) {
        if (file) { //este if verifica que el archivo exista
            let reader = new FileReader();
            reader.onload = function (e) {
                let texto = e.target.result;  
                textoArchivo = texto;
                $("#txtArchivo").val(textoArchivo);
                //console.log(texto);            
            }
            reader.readAsText(file);
            
        } else {
            alert('¡He dicho archivo de texto!');
        }
    } else {
        alert('¡Por favor ingrese un archivo de texto .txt para continuar!'); 
    }       
}
let textoArchivo = "";
var archivo = document.getElementById("archivo");
archivo.addEventListener("change", cargarArchivo);

// --- OCULTAR O MOSTRAR INFORMACION DE AYUDA
$("#ayudaRM").hide();
$("#ayudaCN").hide();

$("#btnInstruccionRM").click(function () { 
    let t = `<i class="far fa-eye"></i> Explicacion`;
    let f = `<i class="far fa-eye-slash"></i> Explicacion`;    
    if ($(this).html() == f) {
        $(this).html(t);
        $("#ayudaRM").show();
    } else {
        $(this).html(f);
        $("#ayudaRM").hide();
    }    
});

$("#btnInstruccionCN").click(function () { 
    let t = `<i class="far fa-eye"></i> Explicacion`;
    let f = `<i class="far fa-eye-slash"></i> Explicacion`;    
    if ($(this).html() == f) {
        $(this).html(t);
        $("#ayudaCN").show();
    } else {
        $(this).html(f);
        $("#ayudaCN").hide();
    }    
});

//------ CLASES -----
// class ArchivoTxt{
//     constructor(texto) {
//         this.texto = texto;

//     }
//     addEspacioPuntos(){
//         let cb = '';
//         let c = '';
//         let ca = '';

//     }
// }

class FraseReemplazo{
    constructor(p_origen, p_reemplazo) {
        this.p_origen= p_origen;
        this.p_reemplazo = p_reemplazo;
    }
}

// PRUEBAS PARA EXPRESIONES REGULARES>

let x = "la marea estaba alta.Pero el velero no se volca.Sin no que cual pajaro parecia volar sobre las olas";

let exrPuntos= /[a-zA-Z]\.[a-zA-Z]/g;
console.log(x.match(exr));

let resultado = x.replace(exrPuntos,(coincidencia, indice, cadena)=>{
    // console.log("Coincidencia: "+coincidencia);    
    // console.log("posicion: "+indice);
    // console.log("cadenaOriginal: "+cadena);
    let res = ""+cadena.charAt(indice) + cadena.charAt(indice+1)+" "+cadena.charAt(indice+2);
    return res;
});

console.log(resultado);


// console.log("Hola mundo");