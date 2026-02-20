// =============================
// USUARIO ACTIVO (SIMULADO)
// =============================
// Cambia manualmente para probar:
// "diputado1"
// "diputado2"
// "admin"

const usuarioActivo = "admin";
const usuarioActivo = "admin";


// =============================
// BASE DE DATOS SIMULADA
// =============================

const iniciativas = [
    {
        id: 1,
        titulo: "Reforma a Ley de Turismo",
        entidad: "Yucatán",
        materia: "Turismo",
        fecha: "18/02/2026",
        viabilidad: "Alta",
        resumen: "Fortalecimiento de certificación turística y regulación de plataformas digitales.",
        enlace: "expedientes/turismo-yucatan.html",
        visiblePara: ["diputado1", "admin"]
    },
    {
        id: 2,
        titulo: "Reforma a Ley de Movilidad",
        entidad: "Nuevo León",
        materia: "Movilidad",
        fecha: "10/01/2026",
        viabilidad: "Media",
        resumen: "Actualización de regulación para transporte digital.",
        enlace: "expedientes/movilidad-nl.html",
        visiblePara: ["diputado2", "admin"]
    }
];


// =============================
// RENDERIZAR INICIATIVAS
// =============================

function renderizarIniciativas(lista) {

    const contenedor = document.getElementById("lista-iniciativas");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron iniciativas con esos criterios.</p>";
        return;
    }

    lista.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h4>${item.titulo}</h4>
            <p>${item.entidad} | ${item.materia}</p>
            <p><strong>Viabilidad:</strong> ${item.viabilidad}</p>
            <p>${item.resumen}</p>
            <a href="${item.enlace}" class="btn-expediente">Ver Expediente</a>

            ${esAdmin ? `
                <div style="margin-top:15px;">
                    <strong>Control de Visibilidad:</strong><br>

                    <label>
                        <input type="checkbox"
                               onchange="toggleVisibilidad(${item.id}, 'diputado1')"
                               ${item.visiblePara.includes('diputado1') ? 'checked' : ''}>
                        Diputado 1
                    </label>

                    <label style="margin-left:10px;">
                        <input type="checkbox"
                               onchange="toggleVisibilidad(${item.id}, 'diputado2')"
                               ${item.visiblePara.includes('diputado2') ? 'checked' : ''}>
                        Diputado 2
                    </label>
                </div>
            ` : ''}
        `;

        // 🔴 ESTA LÍNEA ES FUNDAMENTAL
        contenedor.appendChild(card);

    });
}


// =============================
// CONTROL DE VISIBILIDAD (ADMIN)
// =============================

function toggleVisibilidad(id, diputado) {

    const iniciativa = iniciativas.find(item => item.id === id);
    if (!iniciativa) return;

    if (iniciativa.visiblePara.includes(diputado)) {

        iniciativa.visiblePara =
            iniciativa.visiblePara.filter(d => d !== diputado);

    } else {

        iniciativa.visiblePara.push(diputado);

    }

    aplicarFiltros();
}


// =============================
// FILTRO COMBINADO + CONTROL DE ACCESO
// =============================

function aplicarFiltros() {

    const texto = document.getElementById("buscador").value.toLowerCase();
    const materiaSeleccionada = document.getElementById("filtro-materia").value;

    const filtradas = iniciativas.filter(item => {

        // 1️⃣ Control de acceso por usuario
        const tieneAcceso = item.visiblePara.includes(usuarioActivo);

        // 2️⃣ Filtro por texto
        const coincideTexto =
            item.titulo.toLowerCase().includes(texto) ||
            item.materia.toLowerCase().includes(texto) ||
            item.entidad.toLowerCase().includes(texto);

        // 3️⃣ Filtro por materia
        const coincideMateria =
            materiaSeleccionada === "" ||
            item.materia === materiaSeleccionada;

        return tieneAcceso && coincideTexto && coincideMateria;
    });

    renderizarIniciativas(filtradas);
}


// =============================
// EVENT LISTENERS
// =============================

document.getElementById("buscador")
    .addEventListener("input", aplicarFiltros);

document.getElementById("filtro-materia")
    .addEventListener("change", aplicarFiltros);


// =============================
// INICIALIZACIÓN
// =============================

aplicarFiltros();



