
export interface  IUseCase<Dto>{
     execute(...args: any) : Promise<Dto>
}