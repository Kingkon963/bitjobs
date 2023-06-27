import JobProducer from "./producers/job.producer.js";

export default class FakerAI {

  static async start() {
    console.log("FakerAI: Starting...");
    JobProducer.setTotalAmount(1);
    await JobProducer.produce();
  }
}

FakerAI.start()
  .then(() => {
    console.log("FakerAI: Done!");
  })
  .catch((error) => {
    console.log("FakerAI: Error", error);
  });