import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
    camera.position.z = 12; // Alejar la cámara para que se vea la escena
    scene.add(camera);

    // Crear el renderizador
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    //Control Orbital
    const controls = new OrbitControls(camera, renderer.domElement);
    //ubicacion del target
   // controls.target = new THREE.Vector3(3, 0, 0)
    controls.enableDamping = true;
    //Cubo Mallas *(geometria y material)(esqueleto y piel)
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.5,
        wireframe : true
      })
    )
    scene.add(cube)
    //Esfera
    const textureloader = new THREE.TextureLoader()
    const matcap1 = textureloader.load('./texturas/mapcap1.png');


    const geometry = new THREE.SphereGeometry(0.6, 32, 16);
    const material = new THREE.MeshMatcapMaterial({matcap: matcap1}
      
    );
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphere.position.x = 0
    sphere.position.y = 1.5
    sphere.position.z = 0
    //torus
    const geometry1 = new THREE.TorusKnotGeometry(0.5, 0.18, 100, 10);
    const material1 = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.81,
      flatShading: true

    });
    const torusKnot = new THREE.Mesh(geometry1, material1);
    scene.add(torusKnot);
    //torusKnot.position.x = -2
    //torusKnot.scale.x   = 2
    torusKnot.position.set(0, -1.5, 0)
    torusKnot.scale.set(1, 1, 1)
    //Renderizar la escena
    //Frames para el renderer
    const animate = () => {
      controls.update(); // Actualizar los controles orbitales
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate()

    // Limpiar al desmontar el componente
    return () => {
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);


  return (
    <div
      className="Contenedor 3D"
      ref={mountRef}
      style={{ width: '100%', height: '100vh' }}
    ></div>
  );
};

export default Scena;
