export default class KeyboardControls {
    constructor() {
        // Initialize key state object
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            handbrake: false
        }
        
        // Bind event listeners
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        
        // Add event listeners
        window.addEventListener('keydown', this.onKeyDown)
        window.addEventListener('keyup', this.onKeyUp)
    }
    
    onKeyDown(event) {
        switch(event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.keys.forward = true
                break
            case 's':
            case 'arrowdown':
                this.keys.backward = true
                break
            case 'a':
            case 'arrowleft':
                this.keys.left = true
                break
            case 'd':
            case 'arrowright':
                this.keys.right = true
                break
            case ' ':
                this.keys.handbrake = true
                event.preventDefault()
                break
        }
    }
    
    onKeyUp(event) {
        switch(event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.keys.forward = false
                break
            case 's':
            case 'arrowdown':
                this.keys.backward = false
                break
            case 'a':
            case 'arrowleft':
                this.keys.left = false
                break
            case 'd':
            case 'arrowright':
                this.keys.right = false
                break
            case ' ':
                this.keys.handbrake = false
                event.preventDefault()
                break
        }
    }
    
    isAccelerating() {
        return this.keys.forward
    }
    
    isBraking() {
        return this.keys.backward
    }
    
    getTurnDirection() {
        if (this.keys.left && !this.keys.right) {
            return 1
        } else if (this.keys.right && !this.keys.left) {
            return -1
        }
        return 0
    }
    
    isHandbrake() {
        return this.keys.handbrake
    }
    
    destroy() {
        window.removeEventListener('keydown', this.onKeyDown)
        window.removeEventListener('keyup', this.onKeyUp)
    }
}
