# Cloud Run

## URL's
(will not run from tag 12 onwards as ingress restrictions added)

### Base
* https://whispers-5lblqp2zha-ew.a.run.app  

### API
* https://whispers-5lblqp2zha-ew.a.run.app/playGame + params
* https://whispers-5lblqp2zha-ew.a.run.app/listVoices

## Additional Setup
```
gcloud services enable run.googleapis.com
gcloud config set run/platform managed
gcloud config set run/region europe-west1

gcloud domains list-user-verifiedg
gcloud beta run domain-mappings create --service {service-name} --domain {domain-name}
```

## History (tags)
9. [09_initial-cloud-run](https://github.com/numical/whispers/tree/09-initial-cloud-run)
10. [10_add_load_tests](https://github.com/numical/whispers/tree/10_add_load_tests)

## Conclusions
* mini-CI:  [cloud build triggers](https://cloud.google.com/cloud-build/docs/automating-builds/create-github-app-triggers)
* [concurrency](https://cloud.google.com/run/docs/about-concurrency)
  * `gcloud run services describe whispers`
  * `gcloud run services update whispers --concurrency 50`  
  * see load tests
* more flexible revision options for rollout:
  * "Service [whispers] revision [whispers-00001-noy] has been deployed and is serving 100 percent of traffic."
* [custom domain](https://cloud.google.com/run/docs/mapping-custom-domains)
  * do not need a serverless [network endpoint group](https://cloud.google.com/load-balancing/docs/negs/serverless-neg-concepts) or an https load balancer
  * _if_ in specific regions
  * but very faffy and cannot use apex domain
* base unit for next onion ring
* containers go into repo `gcr.io/{project-name}`
  * so `gcloud container images list --repository=gcr.io/{project-name}`

## Resources
* [pricing](https://cloud.google.com/run/pricing)
* [unofficial cloud run faq](https://github.com/ahmetb/cloud-run-faq)
* [curated list of cloud run resources](https://github.com/steren/awesome-cloudrun)


[(back to README)](../README.md)

