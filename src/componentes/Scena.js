import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Scena = () => {
  const mountRef = useRef(null);
  
  useEffect(() => {
    const currentMount = mountRef.current;
    // Crear la escena
    const scene = new THREE.Scene();
    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5; // Alejar la cámara para que se vea la escena
    scene.add(camera);

    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    //Cubo Mallas *(geometria y material)(esqueleto y piel)
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1,1,1), 
        new THREE.MeshBasicMaterial() 
    )
    scene.add(cube)
    //Renderizar la escena
    renderer.render(scene,camera)
    //clean Up
    return () => {
    currentMount.removeChild(renderer.domElement)
    }

  }, [])
  
  return (
    <div
      className='Contenedor 3D'
      ref={mountRef}
      style={{ width: '100%', height: '100vh' }}
    >
    </div>
  );
};

export default Scena;
