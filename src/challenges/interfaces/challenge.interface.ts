import { Document } from 'mongoose';
import { ChallengeStatus } from './../challenge-status.enum';
import { Player } from './../../players/interfaces/player.interface';
export interface Challenge extends Document {
  dateTimeChallenge: Date;
  status: ChallengeStatus;
  dateTimeRequest: Date;
  dateTimeResponse: Date;
  requester: Player;
  Category: String;
  players: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: String;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
