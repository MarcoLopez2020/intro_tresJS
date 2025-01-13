# Comenzando con Create React App

Este proyecto fue inicializado con Create React App.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Ejecuta la aplicación en modo de desarrollo. Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando realices cambios. También podrás ver errores de lint en la consola.

### `npm test`

Lanza el corredor de pruebas en modo interactivo. Consulta la sección sobre [ejecución de pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run build`

Crea la versión de producción de la aplicación en la carpeta `build`. Empaqueta correctamente React en modo producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación está minificada y los nombres de los archivos incluyen hashes. ¡Tu aplicación está lista para ser desplegada!


### `npm run eject`

**Nota: esta es una operación irreversible. Una vez que ejecutes `eject`, ¡no podrás volver atrás!**

Si no estás satisfecho con las herramientas y configuraciones predeterminadas, puedes ejecutar `eject` en cualquier momento. Este comando copiará todos los archivos de configuración y dependencias al proyecto, dándote control total.

No es necesario usar `eject`. La configuración actual es adecuada para despliegos pequeños y medianos, pero si necesitas personalizarla, esta herramienta está disponible.

---

## Uso de Librerías de Three.js

Para integrar gráficos 3D con Three.js en este proyecto, sigue los siguientes pasos:

### Instalación

Ejecuta el siguiente comando para instalar Three.js:

```bash
npm install three
```

### Uso Básico

Importa Three.js en tu componente de React:

```javascript
import * as THREE from 'three';
```

### Ejemplo de Escena 3D

```javascript
import React, { useEffect } from 'react';
import * as THREE from 'three';

const Escena3D = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return null;
};

export default Escena3D;
```

Este componente crea un cubo 3D giratorio. Puedes integrarlo en tu aplicación agregando `<Escena3D />` a tu componente principal.

---

## Aprende Más

Puedes aprender más en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, revisa la [documentación de React](https://reactjs.org/).

Para profundizar en Three.js, visita la [documentación de Three.js](https://threejs.org/docs/).
