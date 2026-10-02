export const formatDateSafe = (timeStamp, includeTime = true) => {
  if (!timeStamp) return "N/A";

  try {
    let dateObj;
    if (typeof timeStamp.toDate === "function") {
      dateObj = timeStamp.toDate();
    } else if (timeStamp instanceof Date) {
      dateObj = timeStamp;
    } else if (typeof timeStamp === "number" || typeof timeStamp === "string") {
      dateObj = new Date(timeStamp);
    }

    if (!dateObj || isNaN(dateObj.getTime())) {
      return "N/A";
    }

    if (includeTime) {
      return dateObj.toLocaleString();
    }
    return dateObj.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};
