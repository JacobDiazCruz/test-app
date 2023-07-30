export default function deepCopy(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  }

  const copiedObject: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "function") {
        // If the property is a function, copy it directly
        copiedObject[key] = obj[key];
      } else {
        // Otherwise, perform a deep copy of the property
        copiedObject[key] = deepCopy(obj[key]);
      }
    }
  }

  return copiedObject;
};