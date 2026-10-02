import { formatDateSafe } from "../Utils/dateUtils";

/**
 * ResultResponseDto represents a test result record retrieved from Firestore
 */
export class ResultResponseDto {
  constructor({ id, wpm, accuracy, characters, timeStamp, userId }) {
    this.id = id;
    this.wpm = Number(wpm) || 0;
    this.accuracy = accuracy || "0%";
    this.characters = characters || "";
    this.timeStamp = timeStamp;
    this.userId = userId || "";
  }

  get formattedDateTime() {
    return formatDateSafe(this.timeStamp, true);
  }

  get formattedDateOnly() {
    return formatDateSafe(this.timeStamp, false);
  }
}
