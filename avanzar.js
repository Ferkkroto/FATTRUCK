$(document).ready(function() {
  // 1. Inicialización del Carrusel
  inicializarCarrusel();
  // 2. Interacción con el Carrusel (hover en slides)
  interaccionConCarrusel();
  // 6. Scroll Suave a Secciones
  scrollSuaveASecciones();
  // 7. Modal de Imágenes
  modalDeImagenes();
});

// Funciones del Carrusel
function inicializarCarrusel() {
  const track = $('.carousel-track');
  const slides = $('.carousel-slide');
  const nextButton = $('.next-button');
  const prevButton = $('.prev-button');
  const indicators = $('.carousel-indicator');
  let currentIndex = 0;

  function moveCarouselTo(index, animated = true) {
      const moveAmount = slides.first().outerWidth(true) * index;
      track.css({
          'transform': `translateX(-${moveAmount}px)`,
          'transition': animated ? 'transform 0.3s ease-out' : 'none'
      });
      currentIndex = index;
      updateButtonState();
      updateIndicators();
  }

  function updateButtonState() {
      prevButton.prop('disabled', currentIndex === 0);
      nextButton.prop('disabled', currentIndex >= slides.length - 1);
  }

  function updateIndicators() {
      indicators.removeClass('active');
      indicators.eq(currentIndex).addClass('active');
  }

  nextButton.click(() => moveCarouselTo(currentIndex + 1));
  prevButton.click(() => moveCarouselTo(currentIndex - 1));
  indicators.click(function() {
      const slideTo = parseInt($(this).attr('data-slide-to'), 10);
      moveCarouselTo(slideTo);
  });

  moveCarouselTo(currentIndex);
  updateButtonState();
  updateIndicators();
}

function interaccionConCarrusel() {
  $('.carousel-slide').hover(
      function() {
          $('img', this).css('width', '100%');
          $(this).css('min-width', '80%');
      },
      function() {
          $('img', this).css('width', '100%');
          $(this).css('min-width', 'calc((40% / 2) + (100% / 4))');
      }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  // 3. FAQ Toggle Funcionalidad
  toggleFAQ();
  // 4. Tooltip para Puntos Interactivos
  tooltipParaPuntos();
  // 5. Ajuste de Posiciones de Puntos
  ajustarPosicionesDePuntos();
});

function toggleFAQ() {
  document.querySelectorAll('.faq-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
          toggle.classList.toggle('active');
          let answer = toggle.closest('.faq-item').querySelector('.faq-answer');
          answer.style.display = toggle.classList.contains('active') ? 'block' : 'none';
          toggle.textContent = toggle.classList.contains('active') ? '−' : '+';
      });
  });
}

function tooltipParaPuntos() {
  // Código de Tooltips aquí...
}

function ajustarPosicionesDePuntos() {
  // Código para ajustar posiciones de puntos aquí...
}

function scrollSuaveASecciones() {
  var myButton = document.querySelector('.my-button');
  if (myButton) {
      myButton.addEventListener('click', function(event) {
          event.preventDefault();
          var section = document.querySelector(this.getAttribute('href'));
          if (section) {
              section.scrollIntoView({behavior: 'smooth'});
          } else {
              console.log('Sección objetivo no encontrada.');
          }
      });
  } else {
      console.log('Botón .my-button no encontrado.');
  }
}

function modalDeImagenes() {
  window.abrirModal = function(src, alt) {
      $('.modal-contenido').attr('src', src);
      $('.modal-caption').text(alt);
      $('#modalId').css('display', 'flex');
  };

  $('.cerrar').on('click', function() {
      $('#modalId').hide();
  });
}
function tooltipParaPuntos() {
  const points = document.querySelectorAll('.point');

  const showTooltip = (point) => {
      hideTooltips(); // Oculta otros tooltips abiertos
      const description = point.getAttribute('data-description');
      const tooltip = document.createElement('div');
      tooltip.classList.add('point-tooltip');
      tooltip.innerText = description;

      tooltip.style.position = 'absolute';
      tooltip.style.bottom = '120%';
      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';
      tooltip.style.backgroundColor = '#fff';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      tooltip.style.width = '150px';
      tooltip.style.textAlign = 'center';
      tooltip.style.zIndex = '100';

      point.appendChild(tooltip);
  };

  const hideTooltips = () => {
      const tooltips = document.querySelectorAll('.point-tooltip');
      tooltips.forEach(tooltip => tooltip.remove());
  };

  points.forEach(point => {
      point.addEventListener('mouseenter', () => showTooltip(point));
      point.addEventListener('mouseleave', hideTooltips);
      point.addEventListener('touchstart', () => showTooltip(point));
      point.addEventListener('touchend', hideTooltips);
  });

  // Oculta los tooltips cuando se hace clic fuera de un punto
  document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('point')) {
          hideTooltips();
      }
  });
}
function ajustarPosicionesDePuntos() {
  const contenedorDeImagen = document.querySelector('.interactive-image-container');
  if (contenedorDeImagen) {
      const imagen = contenedorDeImagen.querySelector('.img-fluid');
      if (imagen && imagen.complete) {
          actualizarPosicionesDePuntos(imagen);
      } else if (imagen) {
          imagen.onload = () => actualizarPosicionesDePuntos(imagen);
      } else {
          console.log('La imagen dentro del contenedor no se encontró.');
      }
  } else {
      console.log('El contenedor de la imagen no se encontró.');
  }
}

function actualizarPosicionesDePuntos(imagen) {
  const puntos = document.querySelectorAll('.interactive-image-container .point');
  puntos.forEach(punto => {
      const topPorcentaje = parseFloat(punto.getAttribute('data-top')) / 100;
      const leftPorcentaje = parseFloat(punto.getAttribute('data-left')) / 100;

      punto.style.top = (imagen.offsetHeight * topPorcentaje) + 'px';
      punto.style.left = (imagen.offsetWidth * leftPorcentaje) + 'px';
  });
}

