module.exports.generateRecipe = generateRecipe;

async function generateRecipe(promptText) {
    try {
      if (promptText == null) {
        throw new Error("Uh oh, no prompt was provided");
      }
    
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Write a recipe based on these ingredients and instructions:" + promptText,
        temperature: 0.3,
        max_tokens: 120,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      completion.push( response.data.choices[0].text);
      console.log(completion)
    } catch (error) {
      console.log(error.message);
    }
    }
    