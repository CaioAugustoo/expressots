import { Request, Response } from "express";
import { BaseController } from "@/providers/controller/BaseController";
import { CreatePlayerUseCase } from "./CreatePlayer.UseCase";

export class CreatePlayerController extends BaseController {
    
    constructor(private createPlayerUseCase: CreatePlayerUseCase) {
        super();
    }
    
    async handleRequest(request: Request, response: Response): Promise<Response> {

        const { name, email, faction } = request.body;

        try {
            await this.createPlayerUseCase.execute({name, email, faction});
            return  this.created(response); 
        } catch (error) {
            return this.fail(response, error || 'Internal server error!');
        }
    }   
}