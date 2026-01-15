export default class KeyboardControls {
    constructor() {
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            brake: false
        }
        
        this.setupEventListeners()
    }
    
    setupEventListeners() {
        window.addEventListener('keydown', (event) => this.handleKeyDown(event))
        window.addEventListener('keyup', (event) => this.handleKeyUp(event))
    }
    
    handleKeyDown(event) {
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
                this.keys.brake = true
                event.preventDefault()
                break
        }
    }
    
    handleKeyUp(event) {
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
                this.keys.brake = false
                event.preventDefault()
                break
        }
    }
    
    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown)
        window.removeEventListener('keyup', this.handleKeyUp)
    }
}
