import { IsOptional } from 'class-validator';
import { ChallengeStatus } from './../challenge-status.enum'

export class UpdateChallengeDTO {
  // @IsDateString()
  @IsOptional()
  dateTimeChallenge: Date;

  @IsOptional()
  status: ChallengeStatus;
}
