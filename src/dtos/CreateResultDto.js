import { ResultSchema } from "../interfaces/IResult";

/**
 * CreateResultDto encapsulates typing test metrics to persist to Firestore
 */
export class CreateResultDto {
  constructor({
    wpm,
    accuracy,
    correctCharacter = 0,
    inCorrectCharacter = 0,
    missedCharacter = 0,
    extraCharacter = 0,
    userId,
    timeStamp = new Date(),
  }) {
    this.wpm = Number(wpm) || 0;
    this.accuracy = Number(accuracy) || 0;
    this.correctCharacter = correctCharacter;
    this.inCorrectCharacter = inCorrectCharacter;
    this.missedCharacter = missedCharacter;
    this.extraCharacter = extraCharacter;
    this.userId = userId;
    this.timeStamp = timeStamp;
  }

  toFirestorePayload() {
    return {
      wpm: this.wpm,
      accuracy: `${this.accuracy}%`,
      timeStamp: this.timeStamp,
      characters: `Correct: ${this.correctCharacter} | Incorrect: ${this.inCorrectCharacter} | Missed: ${this.missedCharacter} | Extra: ${this.extraCharacter}`,
      userId: this.userId,
    };
  }

  isValid() {
    return (
      !isNaN(this.accuracy) &&
      ResultSchema.validate(this)
    );
  }
}
