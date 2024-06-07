/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const Model_Name = "gemini-1.5-flash";
  const API_KEY= "AIzaSyBUetwJaZhuhxrtTwrnpMxHWdLrDTU2W7I";

  async function run(prompt) {
     const genAI = new GoogleGenerativeAI(API_KEY)
     const model = genAI.getGenerativeModel({model: Model_Name})

     const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };

      const safetySettings = [
        {category:HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
        {category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
        {category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
        {category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
      },
   
    ]

    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  export default run;