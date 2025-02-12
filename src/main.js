import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const canvas = document.getElementById('canvas')

// 1. Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#F0F0F0')

// 2. Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.8 / (window.innerHeight * 0.8), 0.1, 1000)
camera.position.z = 5

// 3. Object
const geometry = new THREE.SphereGeometry(1, 128, 128)
const material = new THREE.MeshStandardMaterial({ 
    color: '#FFD700',
    metalness: 1,    
    roughness: 0.05,   
    emissive: '#FFD700',  
    emissiveIntensity: 0.6,
    clearcoat: 1,  
    clearcoatRoughness: 0 
 })
const goldenball = new THREE.Mesh(geometry, material)

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2)
const boxMaterial = new THREE.MeshStandardMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.y = -1.5

scene.add(goldenball)
scene.add(box)

// 4. Light
const light1 = new THREE.PointLight('#FFFFFF', 3, 10)
light1.position.set(3, 3, 3)

const light2 = new THREE.DirectionalLight('#FFFFFF', 2, 10)
light2.position.set(-3, 3, -3)

const light3 = new THREE.PointLight('#FFFFFF', 2, 10)
light3.position.set(0, -3, 3)
scene.add(light1, light2, light3)

// 5. Render
const renderer = new THREE.WebGLRenderer({ canvas })
const updateRendererSize = () => {
  const sceneWidth = window.innerWidth * 0.8
  const sceneHeight = window.innerHeight * 0.8

  renderer.setSize(sceneWidth, sceneHeight)
  renderer.setPixelRatio(window.devicePixelRatio)

  camera.aspect = sceneWidth / sceneHeight
  camera.updateProjectionMatrix()
}

updateRendererSize()

// 6. Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.enableZoom = true
controls.enablePan = true

// 7. Add Animations
function animate() {
  requestAnimationFrame(animate)

  box.rotation.y += 0.001

  controls.update()
  renderer.render(scene, camera)
}

// 8. Handle window resizing
window.addEventListener('resize', updateRendererSize)
animate()