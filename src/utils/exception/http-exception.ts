
export class HttpException extends Error {

    private _message : string
    private _status : number

    constructor(message : string , status : number){
        super(message)
        this._message = message
        this._status = status
    }
    
    get message() : string {
        return this._message
    }

    get status() : number {
        return this._status
    }


}