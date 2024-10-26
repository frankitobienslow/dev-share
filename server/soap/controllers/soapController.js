const dbService = require("../services/dbService");

const getRecordById = async (args) => {
  try {
    const record = await dbService.getRecordById(args.id);
    return record ? { ...record } : { error: "Record not found" };
  } catch (error) {
    console.error("Error in getRecordById:", error);
    return { error: "Database error" };
  }
};

const getAllRecords = async () => {
  try {
    const records = await dbService.getAllRecords();
    return { records };
  } catch (error) {
    console.error("Error in getAllRecords:", error);
    return { error: "Database error" };
  }
};

module.exports = {
  getRecordById,
  getAllRecords,
};
