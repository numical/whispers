# GCP - it's nearly free!

(in homage to https://www.nearlyfreespeech.net/)

## Scope
* the opposite of the enterprise viewpoint
* web application

## Free Stuff
* [Free Tier Products](https://cloud.google.com/free)
* have to consider why do Google do this
* and more pertinently for how long will they do this?
* taking a look at the GCP Onion:
  ![GCP Onion](../images/gcp-onion.png)
  
## Can you build a fully fledged web proposition from this?
* last presentation showed that Cloud Run is a practical choice;
* BUT
  * check out the [price calculator](https://cloud.google.com/products/calculator/)
  * custom domain (see [Static Website](./StaticWebsite.md))
  * storage
    * SQL
    * noSQL << TODO
    
## Firebase to the rescue!

### Stacks (my nomenclature):

####Core: 

| GCP product | Type | Unit | Abstraction level | Usage | Billing | Project focus |
| --- | --- | --- | --- | --- | --- | --- |
| Compute Engine | IAAS | virtual machines | applications | legacy migration | provision | ops |
| Kubernetes Engine | CAAS(?)| container | managed services | containerised apps | provision | ops|
| Cloud Run | CAAS | container | containers | HTTP(S) workloads | usage, provision | dev(/ops) |
| Cloud Functions| FAAS | function | event, functions | events | usage | dev |

####And:

| GCP product | Type | Unit | Abstraction level | Usage | Billing | Project focus |
| --- | --- | --- | --- | --- | --- | --- |
| App Engine | PAAS  | app | code, http requests | web applications | usage | dev |

####And Then:

| GCP product | Type | Unit | Abstraction level | Usage | Billing | Project focus |
| --- | --- | --- | --- | --- | --- | --- |
| Firebase | All-in-one  | app | app | mobile applications | usage | dev |

### Mix'n'match
* Firebase for free stuff:
  * [hosting](https://firebase.google.com/docs/hosting/use-cases)
  * [custom domain](https://firebase.google.com/docs/hosting/custom-domain)
* Firestore for free data storage
  * not much but enough and then cheap
* [Integrate with Cloud Run](https://firebase.google.com/docs/hosting/cloud-run)  for functionality

### Downsides
* dumbed down so, conversely, unintuitive, e.g:
  * schema definition
  * indexes
* not fully automated
  * limited CLI, have to use Console
  * cannot delete!
* not fully integrated   
    
### Surprise Upside
* auto-config cloud run instances using [realtime updates](https://firebase.google.com/docs/firestore/query-data/listen)


