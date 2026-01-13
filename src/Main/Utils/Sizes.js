export default class Sizes{

    constructor(){
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.aspectRatio = this.width / this.height

    }
    updateSize(camera, renderer, labelRenderer){
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            
            camera.aspect = this.width / this.height
            camera.updateProjectionMatrix()
            renderer.setSize(this.width, this.height)
            renderer.setPixelRatio(this.pixelRatio)

            labelRenderer.setSize( this.width, this.height );
    }
}
