export default class GameUI {
    constructor(car) {
        this.car = car
        this.createUIElements()
        this.setupEventListeners()
    }

    createUIElements() {
        // Create speedometer
        this.speedometer = document.createElement('div')
        this.speedometer.className = 'speedometer'
        this.speedometer.innerHTML = `
            <div class="ui-label">Speed</div>
            <div class="ui-value" id="speed-value">0</div>
            <div class="ui-unit">km/h</div>
        `
        document.body.appendChild(this.speedometer)

        // Create distance counter
        this.distanceCounter = document.createElement('div')
        this.distanceCounter.className = 'distance-counter'
        this.distanceCounter.innerHTML = `
            <div class="ui-label">Distance</div>
            <div class="ui-value" id="distance-value">0</div>
            <div class="ui-unit">m</div>
        `
        document.body.appendChild(this.distanceCounter)

        // Create instructions panel
        this.instructions = document.createElement('div')
        this.instructions.className = 'instructions'
        this.instructions.innerHTML = `
            <div class="instructions-title">Controls</div>
            <div class="instruction-item"><strong>W / ↑</strong> - Accelerate</div>
            <div class="instruction-item"><strong>S / ↓</strong> - Brake</div>
            <div class="instruction-item"><strong>A / ←</strong> - Steer Left</div>
            <div class="instruction-item"><strong>D / →</strong> - Steer Right</div>
            <div class="instruction-item"><strong>Space</strong> - Handbrake</div>
            <div class="instruction-item"><strong>R</strong> - Reset</div>
        `
        document.body.appendChild(this.instructions)

        // Create reset button
        this.resetButton = document.createElement('button')
        this.resetButton.className = 'reset-button'
        this.resetButton.textContent = 'Reset (R)'
        document.body.appendChild(this.resetButton)

        // Store initial position for distance calculation
        this.initialPosition = this.car.getPosition().clone()
        this.totalDistance = 0
    }

    setupEventListeners() {
        this.resetButton.addEventListener('click', () => {
            this.resetGame()
        })

        // Add keyboard listener for R key
        this.handleKeyPress = (event) => {
            if (event.key.toLowerCase() === 'r') {
                this.resetGame()
            }
        }
        window.addEventListener('keydown', this.handleKeyPress)
    }

    resetGame() {
        this.car.reset()
        this.initialPosition = this.car.getPosition().clone()
        this.totalDistance = 0
        this.update()
    }

    update() {
        // Update speedometer
        const speed = this.car.getSpeedKmh()
        const speedElement = document.getElementById('speed-value')
        if (speedElement) {
            speedElement.textContent = speed
        }

        // Update distance counter
        const currentPosition = this.car.getPosition()
        const distanceTraveled = currentPosition.distanceTo(this.initialPosition)
        this.totalDistance = Math.round(distanceTraveled)
        
        const distanceElement = document.getElementById('distance-value')
        if (distanceElement) {
            distanceElement.textContent = this.totalDistance
        }
    }

    destroy() {
        // Remove all UI elements
        if (this.speedometer && this.speedometer.parentNode) {
            this.speedometer.parentNode.removeChild(this.speedometer)
        }
        if (this.distanceCounter && this.distanceCounter.parentNode) {
            this.distanceCounter.parentNode.removeChild(this.distanceCounter)
        }
        if (this.instructions && this.instructions.parentNode) {
            this.instructions.parentNode.removeChild(this.instructions)
        }
        if (this.resetButton && this.resetButton.parentNode) {
            this.resetButton.parentNode.removeChild(this.resetButton)
        }

        // Remove event listeners
        window.removeEventListener('keydown', this.handleKeyPress)
    }
}
