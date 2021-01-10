# Cloud Functions

## URL's

### Base

* https://europe-west2-numical-telephone.cloudfunctions.net/playGame

### Params

* https://europe-west2-numical-telephone.cloudfunctions.net/playGame?iterations=5
* https://europe-west2-numical-telephone.cloudfunctions.net/playGame?text=She%20sells%20sea%20shells%20on%20the%20sea%20shore
* https://europe-west2-numical-telephone.cloudfunctions.net/playGame?voice=english
* https://europe-west2-numical-telephone.cloudfunctions.net/playGame?voice=random

### All Together

* https://europe-west2-numical-telephone.cloudfunctions.net/playGame?iterations=5&text=round%20the%20rugged%20rock%20the%20ragged%20rascal%20ran&voice=random

### Source
* gcp: [setup](./setup.md);
* javascript: https://github.com/numical/whispers/
* logs (if you have permission): https://console.cloud.google.com/logs/query;query=logName%3D%22projects%2Fnumical-telephone%2Flogs%2Fcloudfunctions.googleapis.com%252Fcloud-functions%22

### History (tags)

1. [01_trivial_cloud_function](https://github.com/numical/whispers/tree/01_trivial_cloud_function)
2. [02_write_to_bucket](https://github.com/numical/whispers/tree/02_write_to_bucket)
3. [03_create_audio_file](https://github.com/numical/whispers/tree/03_create_audio_file)
4. [04_audio_to_text](https://github.com/numical/whispers/tree/04_audio_to_text)
5. [05_parametrised_plus_international](https://github.com/numical/whispers/tree/05_parametrised_plus_international)
6. [06-add-timings](https://github.com/numical/whispers/tree/06_add_timings)
7. [07-use-functions-framework-for-local-run](https://github.com/numical/whispers/tree/07-use-functions-framework-for-local-run)
8. [08-switch-gcp-project-and-docs](https://github.com/numical/whispers/tree/08-switch-gcp-project-and-docs)

## Conclusions

* straight-forward development
    * with google sdk installed [mac install not so trivial](./docs/google-sdk-on-mac.md)
    * idiomatic code
    * some minor constraints
        * index.js at root
        * no background processes
        * temp files in memory
    * cold start considerations - **not** idiomatic
        * globals are good!
        * [cloud performance atlas](https://www.youtube.com/watch?v=IOXrwFqR6kY)
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
    * [documentation](https://cloud.google.com/serverless-options/#advanced-tips-and-best-practices) on this issue very limited
    * solution?
        * https://www.nearform.com/blog/solving-the-serverless-concurrency-problem-with-google-cloud-run/

## Possible Next Steps

* use [Cloud Tasks](https://cloud.google.com/tasks) for bucket writes to shorten response *if* they are critical path
* use [Google secrets](https://cloud.google.com/secret-manager) for configuration
* use [Cloud Endpoint](  https://cloud.google.com/endpoints/docs/openapi/get-started-cloud-functions) for custom domain
* understand connection details when using Cloud SQL etc.

## Resources
* [Effective NodeJS Apps on Cloud Functions (recent Google blog post)](https://cloud.google.com/blog/products/serverless/running-effective-nodejs-apps-on-cloud-functions)
* [Open Cloud Function Issues](https://issuetracker.google.com/savedsearches/559729)


[(back to README)](../README.md)