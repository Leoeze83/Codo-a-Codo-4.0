console.log(location.search); // lee los argumentos pasados a este formulario
var id = location.search.split("=")[1]; // usuario_update.html?id=1
console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      id: 0,
      nombre: "",
      correo: "",
      telefono: 0,
      mensaje: "",
      url: "http://localhost:5000/usuarios/" + id,
      usuario: "",
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(id);
          this.id = data.id;
          this.nombre = data.nombre;
          this.correo = data.correo;
          this.telefono = data.telefono;
          this.mensaje = data.mensaje;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let usuario = {
        nombre: this.nombre,
        correo: this.correo,
        telefono: this.telefono,
        mensaje: this.mensaje,
      };
      var options = {
        body: JSON.stringify({ usuario }), // Envuelve el objeto usuario en otro objeto
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro modificado");
          window.location.href = "usuarios.html"; // navega a usuarios.html
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
