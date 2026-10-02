/**
 * UserProfileDto represents user profile details passed across UI layers
 */
export class UserProfileDto {
  constructor({ uid, email, displayName, creationTime, photoURL }) {
    this.uid = uid;
    this.email = email || "No email available";
    this.displayName = displayName || email?.split("@")[0] || "Typist";
    this.creationTime = creationTime || "Recently joined";
    this.photoURL = photoURL || "";
  }
}
