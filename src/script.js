import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// loader
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/img/earth.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .7, 64, 64 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;

material.color = new THREE.Color(0x292929)
// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0x253ce6, 0.1)
pointLight.position.set(2.12,-0.12,1.79)
pointLight.intensity = 10
scene.add(pointLight)


// const light1 = gui.addFolder('Light 1')
// const light1Color = {
//     color:0xffcccc
// }
// light1.addColor(light1Color, 'color')
// .onChange(()=>{
//     pointLight.color.set(light1Color.color)
// })

// light1.add(pointLight.position,'x').min(-3).max(3).step(0.01)
// light1.add(pointLight.position,'y').min(-6).max(6).step(0.01)
// light1.add(pointLight.position,'z').min(-3).max(3).step(0.01)
// light1.add(pointLight,'intensity').min(-10).max(10).step(0.01)

// const pointLightHelper1 = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper1);
// pointLightHelper 



const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-2.11,5.04,2.78)
pointLight2.intensity = 10
scene.add(pointLight2)


// const light2 = gui.addFolder('Light 2')
// const light2Color = {
//     color:0xff0000
// }
// light2.addColor(light2Color, 'color')
// .onChange(()=>{
//     pointLight2.color.set(light2Color.color)
// })

// light2.add(pointLight2.position,'x').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position,'y').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
// light2.add(pointLight2,'intensity').min(-10).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
 const updateSphere = (event)=>{
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere);





document.addEventListener('mousemove',onDocumentMouseMove)

function onDocumentMouseMove (event){
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = innerWidth /2
const windowY = innerHeight /2

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX * .001
    targetY = mouseY * .001


    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 1 * elapsedTime

    sphere.rotation.y+=.5 * (targetX -sphere.rotation.y)
    sphere.rotation.x+=.05 * (targetY -sphere.rotation.x)
    sphere.rotation.z+=-.05 * (targetY -sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()