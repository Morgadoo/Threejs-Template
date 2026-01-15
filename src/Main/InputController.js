export default class InputController {
    constructor() {
        this.inputState = {
            accelerate: false,
            brake: false,
            steerLeft: false,
            steerRight: false,
            handbrake: false
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
                this.inputState.accelerate = true
                break
            case 's':
            case 'arrowdown':
                this.inputState.brake = true
                break
            case 'a':
            case 'arrowleft':
                this.inputState.steerLeft = true
                break
            case 'd':
            case 'arrowright':
                this.inputState.steerRight = true
                break
            case ' ':
                this.inputState.handbrake = true
                event.preventDefault()
                break
        }
    }

    handleKeyUp(event) {
        switch(event.key.toLowerCase()) {
            case 'w':
            case 'arrowup':
                this.inputState.accelerate = false
                break
            case 's':
            case 'arrowdown':
                this.inputState.brake = false
                break
            case 'a':
            case 'arrowleft':
                this.inputState.steerLeft = false
                break
            case 'd':
            case 'arrowright':
                this.inputState.steerRight = false
                break
            case ' ':
                this.inputState.handbrake = false
                event.preventDefault()
                break
        }
    }

    getInputState() {
        return this.inputState
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown)
        window.removeEventListener('keyup', this.handleKeyUp)
    }
}
