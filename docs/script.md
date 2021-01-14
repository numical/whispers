* GCP - dev perspective
* Why cloud
  * cost
  * elasticity
  * density
  * capabilities
* how run node.js (web API)
* options- abstract
  * bottom right quadrant for enterprise
* but perhaps not - onion - 'server-less'  
  * note no app engine
  * continuum
* functional spec
  * some sort of load / data IO
  * use GCP capabilities
  * bugging me - fidelity/correctness of speech API's  
  * demos
* cloud functions
  * as a lazy dev decided to least work I could 
  * AWS lambda 4 years ago pretty unfriendly
  * essential
    * I can use my own IDE / CI / tools etc.
    * testable  
    * [repeatable scripts](./setup.md) ("infrastructure as code")
  * [contract](https://cloud.google.com/functions/docs/quickstart-nodejs)
  * testing  
    * [locally](https://github.com/numical/whispers/blob/04_audio_to_text/src/whisper.js)
      * mock side effects (google api calls)
      * `npm run test`  
    * [in cloud](https://console.cloud.google.com/functions/details/europe-west1/playGame?project=numical-whispers&tab=testing)
    * locally using [functions framework](https://cloud.google.com/functions/docs/functions-framework)
      * `npm run playGame`
  * deploy
    * 'npm run deploy'
  * [conclusions](./CloudFunctions.md)  
    * insane concurrency issue for io-based node
* cloud run
  * before start - load test
    * `npm run loadtest xxx`
  * more onion layers - but minimal
    * express
    * docker image
  * then run through npm scripts
  * [conclusions](./CloudRun.md)
* which would I use? cloud run always