export default async function uniqueValidator(fieldValue) {
  try {
    const doc = await this.constructor.findOne({ fieldValue });
    if (!doc) return true;
    return false;
  } catch (error) {
    return false;
  }
}
