const dbService = require('../services/dbService');

const getEvaluationByDeveloperSkill = async (args) => {
  const { developerId, skillId } = args;
  
  try {
    const evaluation = await dbService.getDeveloperEvaluation(developerId, skillId);
    
    if (evaluation) {
      return {
        status: evaluation.status,
        result: evaluation.resultado,
        skillName: evaluation.skillName,
        levelName: evaluation.levelName,
        date: evaluation.fecha,
      };
    } else {
      return { message: "No evaluation found for this developer and skill." };
    }
  } catch (error) {
    console.error("Error in SOAP getEvaluationByDeveloperSkill:", error);
    throw new Error("Failed to retrieve evaluation data");
  }
};

module.exports = { getEvaluationByDeveloperSkill };
