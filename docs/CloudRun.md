# Cloud Run

## URL's

### Base
* https://whispers-jw74mcmvea-nw.a.run.app  

### API
* https://whispers-jw74mcmvea-nw.a.run.app/playGame + params
* https://whispers-jw74mcmvea-nw.a.run.app/listVoices

## Additional Setup
```
gcloud services enable run.googleapis.com
gcloud config set run/platform managed
gcloud config set run/region europe-west2
```

## History (tags)
9. [09_initial-cloud-run](https://github.com/numical/whispers/releases/tag/09-initial-cloud-run)
10. [10_add_load_tests](https://github.com/numical/whispers/releases/tag/10_add_load_tests)

## Conclusions
* mini-CI:  [cloud build triggers](https://cloud.google.com/cloud-build/docs/automating-builds/create-github-app-triggers)
* more flexible runtime options:
  * "Service [whispers] revision [whispers-00001-noy] has been deployed and is serving 100 percent of traffic."
* [concurrency](https://cloud.google.com/run/docs/about-concurrency)
  * `gcloud run services describe whispers`
  * `gcloud run services update whispers --concurrency 50`  
  * see load tests

## Possible Next Steps
* [custom domain](https://cloud.google.com/run/docs/mapping-custom-domains)

## Resources
* [pricing](https://cloud.google.com/run/pricing)


[(back to README)](../README.md)

