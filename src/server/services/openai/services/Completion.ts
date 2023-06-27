import openai from "../openai.js";

const Completion = async (prompt: string) => {
  const res = await openai.createCompletion(
    {
      model: "text-davinci-003",
      prompt: prompt,
    },
    {
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (res.statusText !== "OK") {
    throw new Error("OpenAI API Error");
  }
  if (!res.data.choices) {
    throw new Error("OpenAI API Error: No choices");
  }
  if (!res.data.choices[0]?.text) {
    throw new Error("OpenAI API Error: No choices[0] text");
  }

  return res.data.choices[0].text;
};

export default Completion;