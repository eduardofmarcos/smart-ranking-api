import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidationParameterPipe implements PipeTransform{
    transform(value:any, medatada:ArgumentMetadata){

        if (!value){
            throw new BadRequestException(`email parameter can not be empty. ${medatada.type}`)
        }
        // console.log(`value ->${value}`)
        // console.log(`metadata ->${medatada.type}`)
        return value
    }
}