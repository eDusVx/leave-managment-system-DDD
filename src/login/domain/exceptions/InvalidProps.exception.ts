export class InvalidPropsException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'InvalidPropsException'
    }

    toString() {
        return `${this.name}: ${this.message}`
    }
}
