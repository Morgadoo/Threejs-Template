import * as THREE from 'three'

export default class Animate{
    
    constructor(scene, camera, renderer, labelRenderer, controls, car){

        const clock = new THREE.Clock()
        let lastElapsedTime = 0

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - lastElapsedTime
            lastElapsedTime = elapsedTime

            // Update car physics
            car.update(deltaTime, controls)
            
            // Update camera to follow car
            camera.update(car.getPosition(), car.getRotation())

            // Render
            renderer.render(scene, camera)
            labelRenderer.render( scene, camera );

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()

    }
}