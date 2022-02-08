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
        this.texto = this.texto.replace(this.exrPuntos, (coincidencia, indice, cadena)=>{
            let res = ""+cadena.charAt(indice) + cadena.charAt(indice+1)+" "+cadena.charAt(indice+2);
            return res;
        });        
        return this.texto;
    }
    guardarArchivo(){
        //let textoGuardar = this.texto.replace(/\n/g, "\r\n"); //Es para que los saltos de linea se muestren.
        var blob = new Blob([this.texto], {type:'text/plain',endings:'native'});
        saveAs(blob, this.nombreArchivo);        
    }
    reemplazarLista(texto, separador){
        let arrTexto = texto.split('\n');//divide el texto en un arreglo por lineas de archivo(salto de linea)
        let arrCenti = [];//arreglo que se forma al separar la linea con un el sepadarador
        
        arrTexto.forEach(element => {
            //let elementV = element.replace(/(\r\n|\n|\r)/gm,"");//Elimina todos los saltos de linea.            
            let elementV = element.trim();//Elimina todos los saltos de linea.
            arrCenti = elementV.split(separador);
            switch (arrCenti.length) {
                case 1:
                    this.texto = this.texto.replaceAll(arrCenti[0], "");
                    break;
                case 2:
                    this.texto = this.texto.replaceAll(arrCenti[0], arrCenti[1]);
                    break;
                default:
                    break;
            }           
        });
        return this.texto;
    }

}

let cArchivo = new ArchivoTxt($("#txtArchivo").val());


//-- CARGAR EL TEXTO DEL ARCHIVO EN EL TEXT AREA
function cargarArchivo(e) {
    //e.preventDefault();
    let file = e.target.files[0];
    let path = e.target.value;
    console.log(path);
    let exrRuta = /[A-Za-z0-9_ -]+\.[A-Za-z0-9]+\b(?!\\|\/)/;
    let nombreArchivo = exrRuta.exec(path)[0];    
    if (path.includes(".txt")) {
        if (file) { //este if verifica que el archivo exista
            let reader = new FileReader();
            reader.onload = function (e) {
                let texto = e.target.result;  
                textoArchivo = texto;
                $("#txtArchivo").val(textoArchivo);
                $("#txtArchivo").trigger("change");
                cArchivo.nombreArchivo = nombreArchivo;       
            }
            reader.readAsText(file);            
        } else {
            alert('¡He dicho archivo de texto!');
        }
    } else {
        alert('¡Por favor ingrese un archivo de texto .txt para continuar!'); 
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
    //e.preventDefault();
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
            alert('¡He dicho archivo de texto!');
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
 
