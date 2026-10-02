import { db } from "../firebaseConfig";
import { CreateResultDto } from "../dtos/CreateResultDto";
import { ResultMapper } from "../mappers/ResultMapper";

export class ResultService {
  // Save a validated test result to Firestore
  static async saveResult(createResultDto) {
    if (!(createResultDto instanceof CreateResultDto)) {
      throw new Error("Invalid result payload.");
    }

    if (!createResultDto.isValid()) {
      throw new Error("Invalid test result data.");
    }

    const docRef = await db
      .collection("results")
      .add(createResultDto.toFirestorePayload());

    return docRef.id;
  }

  static async getUserResults(userId) {
    if (!userId) {
      throw new Error("User ID is required to fetch results.");
    }

    const snapshot = await db
      .collection("results")
      .where("userId", "==", userId)
      .orderBy("timeStamp", "desc")
      .get();

    const results = ResultMapper.toResultDtoList(snapshot.docs);
    const graphData = ResultMapper.toHistoricalChartData(snapshot.docs);

    return { results, graphData };
  }
}
