'use client'

import React, { useState, useEffect, useCallback, useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';
import styles from '../../styles/Carousel.module.css'
// --- Tipado de Datos ---
interface CardData {
  title: string;
  subtitle: string;
  content: string;
  footer: string;
  backTitle: string;
  backContent: string;
}

// --- Datos para el carrusel (Se agregaron más datos en el código original) ---
const cardsData: CardData[] = [
  // ... (Datos omitidos para brevedad, usando los 7 elementos del código original)
  // Nota: Asegúrate de tener al menos 7 elementos para una distribución 3D uniforme.
  {
    title: "Debugging the Matrix",
    subtitle: "The Delusion Stream",
    content: "The error messages multiplied, haunting my console... I saw the code behind reality. Every loop was a life, every crash a death. The debugger whispered: 'You're not in control.'",
    footer: "Posted 2 days ago",
    backTitle: "Análisis del Código",
    backContent: "Este carrusel utiliza CSS 3D (transformaciones y perspective) para la rotación. El efecto de volteo se aplica a un contenedor interno para no interferir con el posicionamiento cilíndrico de la tarjeta en el carrusel."
  },
  {
    title: "The Recursive Dream",
    subtitle: "Infinite Loops of Consciousness",
    content: "I dreamt I was dreaming. And then I dreamed I was dreaming that dream. Recursion became my reality. When will it end? Or is the base case... me?",
    footer: "Posted 5 days ago",
    backTitle: "Teoría de la Recursión",
    backContent: "En programación, la recursión es una función que se llama a sí misma para resolver un problema, descomponiéndolo en versiones más pequeñas. Es crucial tener una condición de salida (caso base) para evitar un bucle infinito."
  },
  {
    title: "Quantum Variables",
    subtitle: "Uncertainty Principle in Code",
    content: "You can't know both the value and the type at the same time. Schrödinger's variable: it’s undefined until observed. Collapse the wave function — or leave it in superposition.",
    footer: "Posted 1 week ago",
    backTitle: "Tipos de Variables",
    backContent: "JavaScript es flexible, pero lenguajes fuertemente tipados (como TypeScript) requieren declarar el tipo antes de usar la variable, eliminando la 'incertidumbre' en tiempo de compilación."
  },
  {
    title: "The Ghost in the Shell Script 1",
    subtitle: "Bash Hauntings",
    content: "It runs when you don’t call it. It fails silently. It leaves no trace. The shell script that shouldn’t exist... but does. Check your crontab. You’re not alone.",
    footer: "Posted 3 weeks ago",
    backTitle: "Mantenimiento de Servidores",
    backContent: "La mejor defensa contra 'scripts fantasma' es el monitoreo exhaustivo, el versionado del código y la revisión regular de los trabajos programados (cron jobs)."
  },
  {
    title: "The Ghost in the Shell Script 2",
    subtitle: "More Bash Hauntings",
    content: "Another haunting! It runs when you don’t call it. It fails silently. It leaves no trace.",
    footer: "Posted 3 weeks ago",
    backTitle: "Mantenimiento de Servidores",
    backContent: "La mejor defensa contra 'scripts fantasma' es el monitoreo exhaustivo, el versionado del código y la revisión regular de los trabajos programados (cron jobs)."
  },
  {
    title: "The Ghost in the Shell Script 3",
    subtitle: "Final Bash Hauntings",
    content: "The third ghost. It runs when you don’t call it. It fails silently. It leaves no trace.",
    footer: "Posted 3 weeks ago",
    backTitle: "Mantenimiento de Servidores",
    backContent: "La mejor defensa contra 'scripts fantasma' es el monitoreo exhaustivo, el versionado del código y la revisión regular de los trabajos programados (cron jobs)."
  },
  {
    title: "The Ghost in the Shell Script 4",
    subtitle: "The last Hauntings",
    content: "The fourth ghost. It runs when you don’t call it. It fails silently. It leaves no trace.",
    footer: "Posted 3 weeks ago",
    backTitle: "Mantenimiento de Servidores",
    backContent: "La mejor defensa contra 'scripts fantasma' es el monitoreo exhaustivo, el versionado del código y la revisión regular de los trabajos programados (cron jobs)."
  }
];

// --- Constantes 3D y de Interacción ---
const totalCards = cardsData.length;
const angleStep = 360 / totalCards;
const Z_DISTANCE = 400; // Radio del carrusel 3D 
const AUTO_ROTATE_TIME = 3000;
const DRAG_SENSITIVITY = 5.0; // Factor de sensibilidad: píxeles a grados (aumentado para más fluidez)

// --- Componente principal ---

const Draggable3DCarousel: React.FC = () => {
  // Estado para la rotación actual del carrusel
  const [currentAngle, setCurrentAngle] = useState(0);
  // Estado para manejar el volteo de cada tarjeta individualmente
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  // Estado para manejar el cursor durante el arrastre
  const [isDragging, setIsDragging] = useState(false);
  
  // Referencias mutables para almacenar valores de arrastre sin causar re-renders
  const dragState = useRef({
    startX: 0,
    rotationStartAngle: 0,
    hasMoved: false,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    hasSnapped: false,
  });

  // Referencia para el contenedor para manipular el cursor
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Lógica de Rotación y Posicionamiento ---

  // Rota el carrusel globalmente (usado por auto-rotación)
  const rotateCarousel = useCallback((direction: 1 | -1) => {
    setCurrentAngle(prevAngle => prevAngle + direction * angleStep);
    // Al rotar automáticamente, reiniciamos el flip de las tarjetas
    setFlippedCards({}); 
  }, []);

  // Función para alternar el estado de volteo de una tarjeta
  const toggleFlip = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index] // Alternar el estado de volteo
    }));
  };
  
  // Calcula el estilo de transformación 3D para cada tarjeta
  const getCardTransformStyle = (index: number) => {
    const cardRotation = index * angleStep;
    // La tarjeta mantiene su posición 3D estática dentro del carrusel.
    return {
        transform: `rotateY(${cardRotation}deg) translateZ(${Z_DISTANCE}px)`
    };
  };

  // --- Lógica de Auto-Rotación ---

  const stopAutoRotate = useCallback(() => {
    const timer = window.localStorage.getItem('carouselTimer');
    if (timer) {
      clearInterval(Number(timer));
      window.localStorage.removeItem('carouselTimer');
    }
  }, []);

  const startAutoRotate = useCallback(() => {
    stopAutoRotate();
    const newTimer = setInterval(() => {
        rotateCarousel(-1); // Gira a la derecha
    }, AUTO_ROTATE_TIME);
    window.localStorage.setItem('carouselTimer', String(newTimer));
  }, [rotateCarousel, stopAutoRotate]);

  // Efecto para iniciar y limpiar el intervalo de auto-rotación
  useEffect(() => {
    startAutoRotate();

    // Limpieza al desmontar
    return () => {
      stopAutoRotate();
    };
  }, [startAutoRotate, stopAutoRotate]);


  // --- Lógica de Arrastre (Drag-to-Rotate) ---

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    
    // Calcular la distancia de arrastre horizontal
    const dragDistance = e.clientX - dragState.current.startX;
    
    if (Math.abs(dragDistance) > 5) {
      dragState.current.hasMoved = true;
    }
    
    // Snap on slight drag
    if (Math.abs(dragDistance) > 10 && !dragState.current.hasSnapped) {
      const direction = dragDistance > 0 ? 1 : -1;
      const currentIndex = Math.round(-currentAngle / angleStep) % totalCards;
      const normalizedCurrentIndex = currentIndex < 0 ? currentIndex + totalCards : currentIndex;
      const targetIndex = (normalizedCurrentIndex + direction + totalCards) % totalCards;
      const targetAngle = - (targetIndex * angleStep);
      const obj = { angle: currentAngle };
      gsap.to(obj, {
        angle: targetAngle,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => setCurrentAngle(obj.angle)
      });
      dragState.current.hasSnapped = true;
    }
    
    // Calcular velocity
    const now = Date.now();
    const deltaTime = now - dragState.current.lastTime;
    if (deltaTime > 0) {
      const deltaX = e.clientX - dragState.current.lastX;
      dragState.current.velocity = deltaX / deltaTime; // px/ms
    }
    dragState.current.lastX = e.clientX;
    dragState.current.lastTime = now;
    
    // Convertir distancia a cambio de ángulo
    const angleDelta = dragDistance * DRAG_SENSITIVITY;
    
    // Calcular el nuevo ángulo total
    const newAngle = dragState.current.rotationStartAngle + angleDelta;
    
    // Aplicar la rotación (se actualizará en el render de React)
    setCurrentAngle(newAngle);
    
    e.preventDefault(); 
  }, [isDragging, currentAngle]); // Solo se recrea si cambia isDragging

  const onPointerUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragState.current.hasMoved) {
      // Aplicar inercia si se movió
      const velocity = dragState.current.velocity;
      if (Math.abs(velocity) > 0.1) { // threshold para inercia
        const inertiaAngle = velocity * 500; // ajustar factor
        const obj = { angle: currentAngle };
        gsap.to(obj, {
          angle: currentAngle + inertiaAngle,
          duration: 1,
          ease: 'power2.out',
          onUpdate: () => setCurrentAngle(obj.angle)
        });
      }
    }
    
    // Quitar listeners globales después de soltar
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);

    // No reanudamos la rotación aquí, ya que el 'onMouseLeave' del contenedor lo hará si el ratón está fuera.
  }, [isDragging, onPointerMove, currentAngle]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stopAutoRotate();
    e.preventDefault();
    setIsDragging(true);
    
    // Almacenar el estado inicial en la referencia mutable
    dragState.current.startX = e.clientX;
    dragState.current.rotationStartAngle = currentAngle;
    dragState.current.hasMoved = false;
    dragState.current.lastX = e.clientX;
    dragState.current.lastTime = Date.now();
    dragState.current.velocity = 0;
    dragState.current.hasSnapped = false;

    // Agregar listeners al documento para que el arrastre no se interrumpa
    // al salir del área del carrusel.
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  // Handlers para touch (móviles)
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    stopAutoRotate();
    e.preventDefault();
    setIsDragging(true);
    
    dragState.current.startX = e.touches[0].clientX;
    dragState.current.rotationStartAngle = currentAngle;
    dragState.current.hasMoved = false;
    dragState.current.lastX = e.touches[0].clientX;
    dragState.current.lastTime = Date.now();
    dragState.current.velocity = 0;
    dragState.current.hasSnapped = false;
    
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    
    const dragDistance = e.touches[0].clientX - dragState.current.startX;
    
    if (Math.abs(dragDistance) > 5) {
      dragState.current.hasMoved = true;
    }
    
    // Snap on slight drag
    if (Math.abs(dragDistance) > 10 && !dragState.current.hasSnapped) {
      const direction = dragDistance > 0 ? 1 : -1;
      const currentIndex = Math.round(-currentAngle / angleStep) % totalCards;
      const normalizedCurrentIndex = currentIndex < 0 ? currentIndex + totalCards : currentIndex;
      const targetIndex = (normalizedCurrentIndex + direction + totalCards) % totalCards;
      const targetAngle = - (targetIndex * angleStep);
      const obj = { angle: currentAngle };
      gsap.to(obj, {
        angle: targetAngle,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => setCurrentAngle(obj.angle)
      });
      dragState.current.hasSnapped = true;
    }
    
    // Calcular velocity
    const now = Date.now();
    const deltaTime = now - dragState.current.lastTime;
    if (deltaTime > 0) {
      const deltaX = e.touches[0].clientX - dragState.current.lastX;
      dragState.current.velocity = deltaX / deltaTime; // px/ms
    }
    dragState.current.lastX = e.touches[0].clientX;
    dragState.current.lastTime = now;
    
    const angleDelta = dragDistance * DRAG_SENSITIVITY;
    const newAngle = dragState.current.rotationStartAngle + angleDelta;
    
    setCurrentAngle(newAngle);
    e.preventDefault();
  }, [isDragging, currentAngle]);

  const onTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragState.current.hasMoved) {
      // Aplicar inercia si se movió
      const velocity = dragState.current.velocity;
      if (Math.abs(velocity) > 0.1) { // threshold para inercia
        const inertiaAngle = velocity * 500; // ajustar factor
        const obj = { angle: currentAngle };
        gsap.to(obj, {
          angle: currentAngle + inertiaAngle,
          duration: 1,
          ease: 'power2.out',
          onUpdate: () => setCurrentAngle(obj.angle)
        });
      }
    }
    
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }, [isDragging, onTouchMove, currentAngle]);
  
  // Efecto para actualizar el cursor y limpiar los listeners globales si el componente se desmonta inesperadamente
  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.style.cursor = isDragging ? 'grabbing' : 'grab';
    }

    // Limpieza final de listeners en caso de unmount (además de onPointerUp y onTouchEnd)
    return () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging, onPointerMove, onPointerUp, onTouchMove, onTouchEnd]);


  return (
    <div className={styles['carousel-3d-wrapper']}>
      

      <div
        ref={containerRef}
        className={styles['carousel-container']}
        onPointerDown={onPointerDown}
        onTouchStart={onTouchStart}
        onMouseEnter={stopAutoRotate} // Pausa el auto-giro al entrar
        onMouseLeave={startAutoRotate} // Reanuda el auto-giro al salir
        style={{ touchAction: 'none' }} // Evita scroll en móviles
      >
        <div
          className={styles.carousel}
          style={{ transform: `rotateY(${currentAngle}deg)` }} // Aplica la rotación del carrusel
        >
          {cardsData.map((data, index) => (
            <div
              key={index}
              className={`${styles.card} ${flippedCards[index] ? styles.flipped : ''}`}
              style={getCardTransformStyle(index)} // Aplica la posición 3D
              onClick={() => {
                if (dragState.current.hasMoved) return; // Prevent click if it was a drag
                
                // Calculate the current center index
                const centerIndex = Math.round(-currentAngle / angleStep) % totalCards;
                const normalizedCenterIndex = centerIndex < 0 ? centerIndex + totalCards : centerIndex;
                
                if (index === normalizedCenterIndex) {
                  // If it's the central card, toggle flip
                  toggleFlip(index);
                } else {
                  // Otherwise, center the clicked card
                  const targetAngle = - (index * angleStep);
                  const obj = { angle: currentAngle };
                  gsap.to(obj, {
                    angle: targetAngle,
                    duration: 0.5,
                    ease: 'power2.out',
                    onUpdate: () => setCurrentAngle(obj.angle)
                  });
                }
              }}
            >
              <div className={styles['card-inner']}>
                {/* Cara Frontal */}
                <div className={`${styles['card-face']} ${styles['front-face']}`}>
                  <div className={styles['card-title']}>{data.title}</div>
                  <div className={styles['card-subtitle']}>{data.subtitle}</div>
                  <div className={styles['card-content']}>{data.content}</div>
                  <div className={styles['card-footer']}>{data.footer}</div>
                </div>
                {/* Cara Trasera */}
                <div className={`${styles['card-face']} ${styles['back-face']}`}>
                  <div className={styles['card-title']}>{data.backTitle || 'Detalle'}</div>
                  <div className={styles['card-content']}>{data.backContent || 'Información adicional no disponible.'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Draggable3DCarousel;