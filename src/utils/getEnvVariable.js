const getEnvVariable = async () => {
  return {
    IV: await process.env.REACT_APP_AES_IV,
    generatedKey: await process.env.REACT_APP_AES_GENERATED_KEY,
  };
};

export default getEnvVariable;
