// Función para mostrar video
function mostrarVideo(videoId) {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Configura aquí tus videos reales (reemplaza los IDs de YouTube)
    const videos = {
        'video1': 'https://www.youtube.com/embed/m3FKkhcXBVw?si=f8YqZNnKHwqOpSp5',
        'video2': 'https://www.youtube.com/embed/7edCKYkoadA?si=9U20YXhzGFxfUBU7',
        'video3': 'https://www.youtube.com/embed/5ORAPRJ2tAk?si=g4FcBc7jZByrX6AP'
    };
    
    videoFrame.src = videos[videoId];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar video
function cerrarVideo() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    videoFrame.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('videoModal')) {
        cerrarVideo();
    }
});



// Datos de los lugares
// Coordenadas exactas de Terrenate, Tlaxcala
// Coordenadas exactas del centro de Terrenate, Tlaxcala
const centroTerrenate = [19.4740, -97.9220]; // Latitud y Longitud exactas

// Datos de ubicaciones en Terrenate
const lugaresData = {
    'campamento': {
        titulo: 'Campamento Camaxtli',
        descripcion: 'En San José Villarreal, Terrenate',
        horario: 'Lunes a Domingo de 8:00 am a 20:00 pm',
        mapa: 'https://maps.app.goo.gl/YFi2H3fszRTcmEB1A',
        coordenadas: [19.50667669560337, -97.90227690550164], // Ajustado a Terrenate
        zoom: 15
    },
    'parroquia': {
        titulo: 'Parroquia San Nicolás Tolentino',
        descripcion: 'Templo principal de Terrenate',
        horario: 'Abierto todo el día',
        mapa: 'https://maps.app.goo.gl/UjbSVmkAie2VwKRq5',
        coordenadas: [19.478001817121704, -97.91879798978032], // Ajustado a Terrenate
        zoom: 16
    },
    'miel': {
        titulo: 'Ruta de la Miel',
        descripcion: 'Experiencia apícola en Guadalupe Victoria',
        horario: 'Con cita previa',
        mapa: 'https://maps.app.goo.gl/JaB5K98DhqGURF9V9',
        coordenadas: [19.44115690010858, -97.945599436649], // Ajustado a Terrenate
        zoom: 15
    },
    'noria': {
        titulo: 'Hacienda La Noria',
        descripcion: 'Histórica hacienda del siglo XVI',
        horario: 'Lunes a Domingo de 3:00 pm a 12:00 am',
        mapa: 'https://maps.app.goo.gl/rmt7iSPVwnFSydNY8',
        coordenadas: [19.473974858809584, -97.93641930753071], // Ajustado a Terrenate
        zoom: 16
    },
    'tenexac': {
        titulo: 'Hacienda Tenexac',
        descripcion: 'Una de las haciendas más antiguas',
        horario: 'Visitas guiadas previa cita',
        mapa: 'https://maps.app.goo.gl/XEkkfsgAc68p8P4k7',
        coordenadas: [19.490466552026962, -97.97890431186838], // Ajustado a Terrenate
        zoom: 16
    }
};

let map;
let markers = [];

function initMap() {
    // Centro del mapa en Terrenate (coordenadas del centro del pueblo)
    map = L.map('mapa-terrenate').setView([19.4740, -97.9220], 14);
    
    // Capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);
    
    // Marcador personalizado
    const icono = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
    
    // Añadir marcadores para cada lugar
    Object.keys(lugaresData).forEach(key => {
        const lugar = lugaresData[key];
        const marker = L.marker(lugar.coordenadas, {
            icon: icono,
            title: lugar.titulo
        }).addTo(map);
        
        marker.bindPopup(`
            <b>${lugar.titulo}</b><br>
            ${lugar.descripcion}<br>
            <small><i class="fa fa-clock"></i> ${lugar.horario}</small>
        `);
        
        markers.push(marker);
    });
}

function mostrarLugar(lugarId, elemento) {
    event.preventDefault();
    
    // Actualizar lista activa
    document.querySelectorAll('.lugares-lista a').forEach(item => {
        item.classList.remove('active-lugar');
    });
    elemento.classList.add('active-lugar');
    
    // Actualizar información
    const lugar = lugaresData[lugarId];
    document.getElementById('lugar-titulo').textContent = lugar.titulo;
    document.getElementById('lugar-descripcion').textContent = lugar.descripcion;
    document.getElementById('lugar-horario').innerHTML = `<i class="fa fa-clock mr-2"></i>${lugar.horario}`;
    document.getElementById('lugar-mapa-link').href = lugar.mapa;
    
    // Centrar el mapa en la ubicación
    map.setView(lugar.coordenadas, lugar.zoom);
    
    // Abrir popup del marcador
    markers.forEach(marker => {
        if (marker.options.title === lugar.titulo) {
            marker.openPopup();
        }
    });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    mostrarLugar('campamento', document.querySelector('[data-lugar="campamento"]'));
});


// Función para mostrar información en ventana flotante
function mostrarInfo(numero) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    
    // Ocultar todas las informaciones primero
    document.querySelectorAll('#ventana-info .info').forEach(info => {
        info.style.display = 'none';
    });
    
    // Mostrar la información seleccionada
    const info = document.getElementById(`info-${numero}`);
    if (info) {
        info.style.display = 'block';
    }
    
    // Mostrar la ventana
    document.getElementById('ventana-info').classList.remove('oculto');
    document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
}

// Función para cerrar ventana flotante
function cerrarVentana() {
    document.getElementById('ventana-info').classList.add('oculto');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar al hacer clic fuera del contenido
document.getElementById('ventana-info').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarVentana();
    }
});



// Función para mostrar información del lugar
function mostrarLugar(lugarId, elemento) {
    event.preventDefault(); // Añade esta línea para prevenir el comportamiento por defecto
    
    // Actualizar lista activa
    document.querySelectorAll('.lugares-lista a').forEach(item => {
        item.classList.remove('active-lugar');
    });
    elemento.classList.add('active-lugar');
    
    // Resto del código permanece igual...
    // Actualizar marcadores del mapa
    document.querySelectorAll('.mapa-marcador').forEach(marcador => {
        marcador.classList.remove('active');
        if (marcador.dataset.lugar === lugarId) {
            marcador.classList.add('active');
        }
    });
    
    // Actualizar información del lugar
    const lugar = lugaresData[lugarId];
    document.getElementById('lugar-titulo').textContent = lugar.titulo;
    document.getElementById('lugar-descripcion').textContent = lugar.descripcion;
    document.getElementById('lugar-horario').innerHTML = lugar.horario;
    document.getElementById('lugar-mapa-link').href = lugar.mapa;
    
    // Centrar mapa en la ubicación (simulado con parámetros)
    const iframe = document.getElementById('mapa-interactivo');
    iframe.src = `https://maps.google.com/maps?q=${lugar.mapa.split('q=')[1].split('&')[0]}&z=15&output=embed`;
}

// Array con todas las imágenes de la galería
const galleryImages = [
    {src: 'img/galeria1.jpg', title: 'Paisaje de Terrenate', desc: 'Hermosos paisajes naturales de nuestra región'},
    {src: 'img/galeria2.jpg', title: 'Arquitectura colonial', desc: 'Nuestro patrimonio histórico y cultural'},
    {src: 'img/galeria3.jpg', title: 'Gastronomía local', desc: 'Los sabores tradicionales de Terrenate'},
    {src: 'img/galeria4.jpg', title: 'Festividades', desc: 'Celebraciones y tradiciones de nuestra comunidad'},
    {src: 'img/galeria5.jpg', title: 'Artesanías', desc: 'Trabajos artesanales hechos por nuestros talentosos artistas'},
    {src: 'img/galeria6.jpg', title: 'Comunidad', desc: 'La calidez y amabilidad de nuestra gente'}
];

let currentImageIndex = 0;

// Función para abrir modal de galería
function abrirModal(src, altText = '') {
    const modal = document.getElementById("modal-galeria");
    const modalImg = document.getElementById("img-modal");
    const captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = src;
    modalImg.alt = altText;
    captionText.innerHTML = altText;
    
    // Forzar dimensiones exactas
    modalImg.style.width = "500px";
    modalImg.style.height = "200px";
    modalImg.style.objectFit = "cover";
  }
  
  function cerrarModal() {
    document.getElementById("modal-galeria").style.display = "none";
  }
  
  // Navegación entre imágenes (opcional)
  function navigateModal(direction) {
    // Tu lógica de navegación aquí
  }
  
  // Cerrar al hacer clic fuera de la imagen
  window.onclick = function(event) {
    const modal = document.getElementById("modal-galeria");
    if (event.target == modal) {
      cerrarModal();
    }
  }

// Función para navegar entre imágenes
function navigateModal(direction) {
    currentImageIndex += direction;
    
    // Circular navigation
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const modalImg = document.getElementById("img-modal");
    const caption = document.getElementById("caption");
    
    modalImg.src = galleryImages[currentImageIndex].src;
    caption.innerHTML = `<h3>${galleryImages[currentImageIndex].title}</h3><p>${galleryImages[currentImageIndex].desc}</p>`;
}

function cerrarModal() {
    document.getElementById("modal-galeria").style.display = "none";
    document.body.style.overflow = "auto";
}

// Cerrar modal al hacer clic fuera de la imagen
window.onclick = function(event) {
    const modal = document.getElementById("modal-galeria");
    if (event.target == modal) {
        cerrarModal();
    }
}

// Botón "Ver más fotos" (simulado)
document.getElementById('load-more').addEventListener('click', function() {
    // En una implementación real, aquí cargarías más imágenes dinámicamente
    alert('En una implementación completa, aquí se cargarían más imágenes dinámicamente');
});

// Función para mostrar información en ventana flotante del carrusel
function mostrarInfoCarrusel(numero) {
    event.preventDefault(); // Prevenir comportamiento por defecto
    
    // Ocultar todas las informaciones primero
    document.querySelectorAll('#ventana-info-carrusel .info').forEach(info => {
        info.style.display = 'none';
    });
    
    // Mostrar la información seleccionada
    const info = document.getElementById(`info-carrusel-${numero}`);
    if (info) {
        info.style.display = 'block';
    }
    
    // Mostrar la ventana
    document.getElementById('ventana-info-carrusel').classList.remove('oculto');
    document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
}

// Función para cerrar ventana flotante del carrusel
function cerrarVentanaCarrusel() {
    document.getElementById('ventana-info-carrusel').classList.add('oculto');
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar al hacer clic en el fondo oscuro (pero no en el contenido)
document.addEventListener('DOMContentLoaded', () => {
    const fondoInfo = document.getElementById('ventana-info');
    const fondoCarrusel = document.getElementById('ventana-info-carrusel');
  
    fondoInfo.addEventListener('click', function(e) {
      if (!e.target.closest('.ventana-contenido')) {
        cerrarVentana();
      }
    });
  
    fondoCarrusel.addEventListener('click', function(e) {
      if (!e.target.closest('.ventana-contenido')) {
        cerrarVentanaCarrusel();
      }
    });
  });

  function mostrarInfoGastronomia(numero) {
    event.preventDefault();
    document.querySelectorAll('#ventana-info-gastronomia .info').forEach(info => {
        info.style.display = 'none';
    });
    const info = document.getElementById(`info-gastronomia-${numero}`);
    if (info) {
        info.style.display = 'block';
    }
    document.getElementById('ventana-info-gastronomia').classList.remove('oculto');
    document.body.style.overflow = 'hidden';
}

function cerrarVentanaGastronomia() {
    document.getElementById('ventana-info-gastronomia').classList.add('oculto');
    document.body.style.overflow = 'auto';
}

 // Agrega esto en tu archivo sitio.js o sitio2.js
$(document).ready(function() {
    // Coordina el desplazamiento del botón con la flecha
    $(window).scroll(function() {
      // Obtén la posición actual de desplazamiento
      var scroll = $(window).scrollTop();
      
      // Ajusta la opacidad del botón según el desplazamiento
      if (scroll > 300) {
        $('.btn-flotante-facebook').css('bottom', '100px');
      } else {
        $('.btn-flotante-facebook').css('bottom', '20px');
      }
    });
  
    // Efecto al hacer clic (opcional)
    $('.btn-flotante-facebook').click(function(e) {
      e.preventDefault();
      window.open($(this).attr('href'), '_blank');
      // Efecto visual al hacer clic
      $(this).css('transform', 'scale(0.9)');
      setTimeout(() => {
        $(this).css('transform', 'scale(1)');
      }, 200);
    });
  });