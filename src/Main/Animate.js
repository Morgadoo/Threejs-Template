import * as THREE from 'three'

export default class Animate{
    
    constructor(scene, camera, renderer, labelRenderer, controls, stats){

        const clock = new THREE.Clock()
        let lastElapsedTime = 0

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - lastElapsedTime
            lastElapsedTime = elapsedTime

            // Update stats
            stats.begin()

            // Update controls
            controls.update()

            // Render
            renderer.render(scene, camera)
            labelRenderer.render( scene, camera );

            // End stats
            stats.end()

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()

    }
}