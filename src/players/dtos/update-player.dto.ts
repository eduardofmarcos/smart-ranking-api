import { IsNotEmpty } from 'class-validator';

//what comes in request and will traffic in all app, there is no behavior
export class UpdatePlayerDTO {
  @IsNotEmpty()
  readonly phoneNumber: string;
  @IsNotEmpty()
  readonly name: string;
}
