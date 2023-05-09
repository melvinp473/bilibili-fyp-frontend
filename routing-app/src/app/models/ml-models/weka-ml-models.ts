export class WekaMLModels {
    algorithm_name: string
    algorithm_code: string

    constructor(name: string, code: string) {
        this.algorithm_name = name
        this.algorithm_code = code
    }
}