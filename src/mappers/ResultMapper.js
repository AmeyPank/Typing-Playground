import { ResultResponseDto } from "../dtos/ResultResponseDto";
import { ChartPointDto } from "../dtos/ChartDataDto";
import { formatDateSafe } from "../Utils/dateUtils";

export class ResultMapper {
  static toResultDto(doc) {
    const data = doc.data() || {};
    return new ResultResponseDto({
      id: doc.id,
      wpm: data.wpm,
      accuracy: data.accuracy,
      characters: data.characters,
      timeStamp: data.timeStamp,
      userId: data.userId,
    });
  }

  static toResultDtoList(docs = []) {
    return docs.map((doc) => ResultMapper.toResultDto(doc));
  }

  static toHistoricalChartData(docs = []) {
    const list = docs.map((doc) => {
      const data = doc.data() || {};
      const dateLabel = formatDateSafe(data.timeStamp, false);
      const wpm = Number(data.wpm) || 0;
      return new ChartPointDto(dateLabel, wpm).toArray();
    });

    return list.reverse();
  }

  static toLiveChartCoordinates(rawGraphPoints = []) {
    const seen = new Set();
    const result = [];

    for (const point of rawGraphPoints) {
      if (!point || point.length < 2) continue;
      const key = point[0];
      if (!seen.has(key)) {
        seen.add(key);
        result.push(new ChartPointDto(key, point[1]).toArray());
      }
    }

    return result;
  }
}
