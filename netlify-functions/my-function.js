const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const promptText = body.prompt;

    if (!promptText) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Write a recipe based on these ingredients and instructions:" + promptText,
      temperature: 0.3,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const recipe = response.data.choices[0].text;

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe }),
    };
  } catch (error) {
    console.log(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Something went wrong" }),
    };
  }
};
