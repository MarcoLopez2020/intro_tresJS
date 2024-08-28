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
    //Texturas
    //Trae la imagen como una textura no como png o jpg
    const textureloader = new THREE.TextureLoader()
    const base = textureloader.load('./bricks/base.jpg')
    const ao = textureloader.load('./bricks/ao.jpg')
    const roug = textureloader.load('./bricks/roug.jpg')
    const normal = textureloader.load('./bricks/normal.jpg')
    const heigh = textureloader.load('./bricks/heigh.png')
    const geometria = new THREE.BoxGeometry(1, 1, 1,
      250,
      250,
      250
    )
    const material = new THREE.MeshStandardMaterial({
      map: base,
      aoMap: ao,
      roughnessMap: roug,
      normalMap: normal,
      displacementMap: heigh,
      displacementScale: 0.01
    })
    const cube1 = new THREE.Mesh(geometria, material)
    scene.add(cube1)
    cube1.position.set(1, 1, 1)
    cube1.scale.set(3, 3, 3)
    //luz necesaria para standard material para "verla"
    const luz = new THREE.DirectionalLight(0xffffff, 1.4)

    scene.add(luz)
const enviromentMap = new THREE.CubeTextureLoader()
const envMap = enviromentMap.load([
  './invmap/nx.png', 
  './invmap/px.png',
  './invmap/ny.png',
  './invmap/py.png', 
  './invmap/nz.png',
  './invmap/pz.png'
])
scene.environment = envMap
scene.background = envMap

luz.position.set(5,5,5)
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

/**
 mas geometrias
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
     */