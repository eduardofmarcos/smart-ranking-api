import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema(
  {
    category: { type: String },
    players: [{ type: mongoose.Types.ObjectId, ref: 'Player' }],
    def: { type: mongoose.Types.ObjectId, ref: 'Player' },
    result: [
      {
        set: { type: String },
      },
    ],
  },
  { timestamps: true, collection: 'matches' },
);
