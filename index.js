//jshint esversion:6

const { response } = require('express');
const express = require('express')
const bodyParser = require("body-parser");
const app = express();
const port = 5000
var promptText;
var recipe = '';


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

require("dotenv").config();


const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
  apiKey:process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);


app.post("/recipegenerator", async (req, res) => {
  promptText = req.body.prompt;
  console.log(promptText);
  try {
    if (promptText == null) {
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
    const completion=response.data.choices[0].text;
    recipe=completion;
   console.log(recipe);
  } catch (error) {
    console.log(error.message);
  }
  res.redirect("/recipe");
});

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');  
});

app.post('/', (req, res)=>{
  res.redirect("/recipegenerator");  
});

app.get('/recipegenerator', (req, res)=>{
  res.sendFile(__dirname + '/RecipeGenerator.html');  
});

/* app.get('/recipe', (req, res)=>{
  const promptText = req.promptText;
  const recipe = req.recipe;
  res.sendFile(__dirname + '/recipe.html',{ prompt: promptText, recipes: recipe });
  //res.render('recipe', );  
});
 */
/*app.get('/recipe', (req, res)=>{
 
  const filePath = __dirname + '/recipe.html';
  const options = {
    headers: {
      'Content-Type': 'text/html'
    }
  };
  const html = `
`;
  res.status(200).send(html);
});
*/


app.get('/aboutus', (req, res)=>{
  res.sendFile(__dirname + '/aboutus.html');  
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`)
})
