export default async function uniqueValidator(fieldName, fieldValue) {
  const search = {};
  search[fieldName] = fieldValue;
  try {
    const doc = await this.constructor.findOne(search);
    if (!doc) return true;
    return false;
  } catch (error) {
    return false;
  }
}
