import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { Player } from 'src/players/interfaces/player.interface';
import { Result } from './../../interfaces/challenge.interface';

export class AssignMatchToAChallengeDTO {
  // @IsDateString()
  @IsNotEmpty()
  def: Player;
  @IsArray()
  @IsOptional()
  result: Array<Result>;
}
