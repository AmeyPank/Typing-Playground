import { UserProfileDto } from "../dtos/UserProfileDto";
import { UserProfileSchema } from "../interfaces/IUser";

export class UserMapper {
  static toUserProfileDto(firebaseUser) {
    if (!UserProfileSchema.validate(firebaseUser)) return null;

    return new UserProfileDto({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      creationTime: firebaseUser.metadata?.creationTime,
      photoURL: firebaseUser.photoURL,
    });
  }
}
