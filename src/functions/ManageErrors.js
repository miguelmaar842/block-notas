export default function getError(error){
    var {code} = error;
    console.log(code);
    var errors = {
        "auth/missing-email": "El correo es obligatorio",
        "auth/email-already-in-use" : 'El correo ha sido registrado',
        "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
        "default": "Se genero un error. Vuelve a intentarlo",
        "auth/user-not-found": "El correo no esta registrado"
    };
    return (errors[code]) || errors['default'];
}