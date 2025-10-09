# Componente Robot 3D con Paneles Flotantes

## Descripción
Componente de React con Next.js que muestra un robot 3D animado rodeado de 6 paneles de texto flotantes con efecto glow azul.

## Estructura de Componentes

### 1. **Robot3DScene.tsx** (Principal)
- Componente contenedor que integra todo
- Configura el Canvas de React Three Fiber
- Coordina el robot 3D y los paneles HTML

### 2. **RobotModel.tsx**
- Carga el modelo 3D GLTF del robot
- Aplica material emisivo azul para efecto glow
- Animación de flotación y rotación suave

### 3. **StarField.tsx**
- Sistema de partículas 3D (1000 estrellas)
- Movimiento lento y rotación continua
- Fondo espacial atmosférico

### 4. **FloatingPanels.tsx**
- 6 paneles HTML con texto de servicios
- Posicionados en círculo alrededor del centro
- Animación de flotación vertical independiente
- Efecto glow con Tailwind CSS

## Características Implementadas

✅ Robot 3D con efecto glow azul intenso
✅ Fondo negro con partículas de estrellas
✅ 6 paneles flotantes con texto:
   - Auditoría Digital
   - Automatizaciones
   - Desarrollo Web
   - Consultoría IT
   - Cloud Solutions
   - Ciberseguridad
✅ Animaciones suaves de flotación
✅ Responsive y optimizado
✅ Integrado en la landing page

## Tecnologías Utilizadas

- **Next.js 14** - Framework React
- **React Three Fiber** - Renderizado 3D
- **@react-three/drei** - Helpers para R3F
- **Three.js** - Motor 3D
- **Tailwind CSS** - Estilos y efectos glow
- **TypeScript** - Tipado estático

## Uso

El componente ya está integrado en `src/app/page.tsx`:

```tsx
import Robot3DScene from '@/components/landing/Robot3DScene'

export default function Home() {
  return (
    <main>
      <Robot3DScene />
    </main>
  )
}
```

## Personalización

### Cambiar servicios en los paneles:
Edita el array en `FloatingPanels.tsx`:

```tsx
const services = [
  { title: 'Tu Servicio', angle: 0 },
  // ...
]
```

### Ajustar color del glow:
En `RobotModel.tsx` cambia el color:

```tsx
material.emissive = new THREE.Color(0x00d4ff) // Color azul
```

### Modificar velocidad de animación:
En `RobotModel.tsx`:

```tsx
groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
// Aumenta 0.5 para más velocidad
```

## Notas Técnicas

- El modelo 3D debe estar en `/public/assets/model3D/SOLU.glb`
- El componente usa 'use client' para renderizado del lado del cliente
- Las animaciones usan requestAnimationFrame para rendimiento óptimo
- Los paneles son HTML overlay sobre el Canvas 3D
