# whispers
A Google Cloud Platform (GCP) Playground  
Discovering how to run Node.js.

## Options
![xAAS Comparison](/images/cloud-service-types.png)
* src: https://www.edureka.co/blog/what-is-google-cloud-platform/

| GCP product | Type | Unit | Abstraction level | Usage | Billing | Project focus |
| --- | --- | --- | --- | --- | --- | --- |
| Cloud Functions | FAAS | function | event, functions | events | usage | dev |
| App Engine | PAAS  | app | code, http requests | web applications | usage | dev |
| Cloud Run | CAAS | container | containers | HTTP(S) workloads | usage, provision | dev(/ops) |
| Kubernetes Engine | CAAS(?)| container | managed services | containerised apps | provision | ops|
| Compute Engine | IAAS | virtual machines | applications | legacy migration | provision | ops |

* [Where should I run my code?](https://www.youtube.com/watch?v=wzPmgWJ5fpU&feature=youtu.be)
* _"definition of enterrpise - any environments where most of the applications do not have an applications team working on them"_

## Cloud Functions

### URL's
####  Base
* https://europe-west2-numical-whispers.cloudfunctions.net/playGame
#### Params
* https://europe-west2-numical-whispers.cloudfunctions.net/playGame?iterations=5
* https://europe-west2-numical-whispers.cloudfunctions.net/playGame?text=She%20sells%20sea%20shells%20on%20the%20sea%20shore
* https://europe-west2-numical-whispers.cloudfunctions.net/playGame?voice=english
* https://europe-west2-numical-whispers.cloudfunctions.net/playGame?voice=random
#### All Together
* https://europe-west2-numical-whispers.cloudfunctions.net/playGame?iterations=5&text=round%20the%20rugged%20rock%20the%20ragged%20rascal%20ran&voice=random

### Source
https://github.com/numical/whispers/
#### History (tags)
1. [01_trivial_cloud_function](https://github.com/numical/whispers/releases/tag/01_trivial_cloud_function)
2. [02_write_to_bucket](https://github.com/numical/whispers/releases/tag/02_write_to_bucket)
3. [03_create_audio_file](https://github.com/numical/whispers/releases/tag/03_create_audio_file)
4. [04_audio_to_text](https://github.com/numical/whispers/releases/tag/04_audio_to_text)
5. [05_parametrised_plus_international](https://github.com/numical/whispers/releases/tag/05_parametrised_plus_international)

### Conclusions
* straight-forward development
  * idiomatic code
  * some minor constraints
    * index.js at root
    * no background processes
    * temp files in memory
  * cold start considerations
    * globals are good!
    * https://www.youtube.com/watch?v=IOXrwFqR6kY
* unit testing fine
  * mocks for other services
* deployment easy
  * few IAM considerations
* integration testing harder
  * logging only
  * limited service info
  * cloud debugging not formally supported
* **but** low density - concurrency of 1
  * https://cloud.google.com/functions/docs/concepts/exec#auto-scaling_and_concurrency
  * https://cloud.google.com/functions/pricing
    * insanely cheap but inefficient
  * solution?
    * https://www.nearform.com/blog/solving-the-serverless-concurrency-problem-with-google-cloud-run/

### Next Steps
* evaluate utility of [functions framework](https://cloud.google.com/functions/docs/functions-framework)
* ? use [metrics API](https://cloud.google.com/functions/docs/monitoring/metrics) to assess inefficiency of app


## Cloud Run
... TBD