
function convertirANumeros(cadena) {
    cadena = cadena.toUpperCase();
    var letras = {
        'A':4,
        'a':4,
        'E':3,
        'e':3,
        'I':1,
        'i':1,
        'O':0,
        'o':0,
        'G':6,
        'g':6,
        'S':5,
        's':5,
        'T':7,
        't':7,
        'B':8,
        'b':8,
        'Z':2,
        'z':2
    };
    for (const key in letras) {
        const element = letras[key];
        if (cadena.includes(key)) {
            cadena = cadena.replaceAll(key,element);
        }
    }
    return cadena;
}

$("#texto").change(function () { 
    $("#respuesta").val(convertirANumeros($(this).val()));     
});