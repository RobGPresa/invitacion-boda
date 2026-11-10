document.addEventListener("DOMContentLoaded", function () {
    console.log("¡JavaScript externo conectado y funcionando!");

    // 1. CONFIGURACIÓN DEL CONTADOR REGRESIVO (Fecha fija)
    const fechaBoda = new Date("2027-02-14T18:00:00").getTime(); 

    function actualizarContador() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        if (distancia < 0) {
            clearInterval(intervalo);
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) countdownEl.innerHTML = "<h3>¡Llegó el gran día!</h3>";
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        const elDias = document.getElementById("dias");
        const elHoras = document.getElementById("horas");
        const elMinutos = document.getElementById("minutos");
        const elSegundos = document.getElementById("segundos");

        if (elDias && elHoras && elMinutos && elSegundos) {
            elDias.textContent = dias < 10 ? "0" + dias : dias;
            elHoras.textContent = horas < 10 ? "0" + horas : horas;
            elMinutos.textContent = minutos < 10 ? "0" + minutos : minutos;
            elSegundos.textContent = segundos < 10 ? "0" + segundos : segundos;
        }
    }

    actualizarContador();
    const intervalo = setInterval(actualizarContador, 1000);

       // 2. CONFIGURACIÓN DEL FORMULARIO DE WHATSAPP
    const formulario = document.getElementById("form-asistencia");

    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            // Reemplaza con el número de tu cliente (sin signos + ni espacios)
            const telefonoNovios = "522223785573"; 

            const nombreInvitado = document.getElementById("nombre").value;
            const respuestaAsistencia = document.querySelector('input[name="asistencia"]:checked').value;

            const mensaje = "✨ *Confirmación de Asistencia* ✨\n\n" +
                            "Hola, quiero confirmar mi asistencia a su boda.\n\n" +
                            "👤 *Nombre:* " + nombreInvitado + "\n" +
                            "💌 *Respuesta:* " + respuestaAsistencia;

            const mensajeCodificado = encodeURIComponent(mensaje);
            
            // ENLACE CORREGIDO CON LA BARRA DIAGONAL
            const urlWhatsApp = "https://wa.me/" + telefonoNovios + "?text=" + mensajeCodificado;

            window.open(urlWhatsApp, "_blank");

        });
    }
    // ==========================================================================
    // 3. GENERADOR DE CALENDARIO UNIVERSAL (.ICS)
    // ==========================================================================
    const btnCalendario = document.getElementById("btn-calendario");

    if (btnCalendario) {
        btnCalendario.addEventListener("click", function () {
            // DETALLES DEL EVENTO (Personalizables por cliente)
            const titulo = "Boda de Nuestra Boda"; // Nombre del evento
            const descripcion = "¡Acompáñanos a celebrar nuestro gran día! Recuerda confirmar tu asistencia.";
            const lugar = "Iglesia Central y Jardín Los Olivos";
            
            // FECHAS EN FORMATO ICS (AñoMesDíaTHoraMinutosSegundosZ)
            // Ejemplo: 20271017T170000 (17 de Octubre de 2027 a las 17:00 hrs)
            const fechaInicio = "20271017T170000"; 
            const fechaFin    = "20271018T020000"; // Termina a las 02:00 am del día siguiente

            // Construcción del archivo estándar ICS de Apple/Google
            const contenidoICS = [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "BEGIN:VEVENT",
                "SUMMARY:" + titulo,
                "DESCRIPTION:" + descripcion,
                "LOCATION:" + lugar,
                "DTSTART:" + fechaInicio,
                "DTEND:" + fechaFin,
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\n");

            // Crear un enlace temporal de descarga en el navegador
            const blob = new Blob([contenidoICS], { type: "text/calendar;charset=utf-8;" });
            const link = document.createElement("a");
            
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", "evento-boda.ics"); // Nombre del archivo descargado
            document.body.appendChild(link);
            
            link.click(); // Ejecuta la descarga automáticamente
            document.body.removeChild(link);
        });
    }
        // ==========================================================================
    // 4. CONTROLADOR DE MÚSICA FLOTANTE PREMIUM (Volumen Suave & Iconos Limpios)
    // ==========================================================================
    window.controlarMusica = function() {
        const audio = document.getElementById("musica-boda");
        const boton = document.getElementById("btn-musica");
        const icono = document.getElementById("icono-musica");

        if (!audio || !boton || !icono) return;

        // CONTROL DE VOLUMEN AUTOMÁTICO: Establece la música al 30% (suave y ambiental)
        // Valores válidos van desde 0.0 (silencio) hasta 1.0 (volumen máximo)
        audio.volume = 0.01; 

        if (audio.paused) {
            audio.play().then(() => {
                icono.textContent = "‖"; // Símbolo de pausa elegante
                boton.classList.add("musica-activa"); 
            }).catch(error => {
                console.log("El navegador bloqueó la reproducción: ", error);
            });
        } else {
            audio.pause();
            icono.textContent = "▶"; // Símbolo de reproducción elegante
            boton.classList.remove("musica-activa"); 
        }
    };


});
