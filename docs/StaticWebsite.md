# Static Website
How to set up a static website on GCP.

## History (tags)
11. [11_HTTPS_website](https://github.com/numical/whispers/tree/11_HTTPS_websiteHTTPS)


## 1. Simple bucket
```shell
gsutil mb -l europe-west1 -b on gs://{bucket-name}
gsutil iam ch allUsers:objectViewer gs://{bucket-name}
```
* gives a URL of form https://storage.googleapis.com/{bucket-name}/{file-name}
* docs
  * https://cloud.google.com/storage/ to create
  * https://cloud.google.com/storage/docs/hosting-static-website-http for website-specific stuff  
* gotchas
  * [bucket names with dots are assumed to be domains](https://cloud.google.com/storage/docs/domain-name-verification)
  * IAM:
    * `roles/storage.legacyObjectReader` gives read access
    * `roles/storage.objectViewer` gives read access _and_ users can list files
  * easy uploading: `gsutil -m rsync -r -d {dir-name} gs://{bucket-name}`  
* **pros**
  * super cheap
    * pay for storage and network egress
  * super easy
  * HTTP and HTTPS  
* **cons**
  * no custom domain  
  
### Setup (from scratch):
```

// do config

gcloud projects create {project-name} --organization=379324684039
gcloud config set project {project-name}
$gcloud beta billing projects link {project-name} --billing-account=0118EE-C0AC1A-AB5E21

gcloud config configurations create {configuration-name}
gcloud config set project {project-name}
gcloud config set compute/region europe-west1
gcloud config set compute/zone europe-west1-a

gsutil mb -l europe-west1 -b on gs://www.wealthhealth.dev
gsutil iam ch allUsers:legacyObjectReader gs://www.wealthhealth.dev
gsutil -m rsync -r -d public gs://www.wealthhealth.dev
gsutil web set -m index.html -e 404.html gs://www.wealthhealth.dev
```

## 2. HTTP, custom domain
* modify DNS records
* use bucket with domain name
```
Name  Type   TTL   Data
www   CNAME  1h    c.storage.googleapis.com.
```
* docs:
  * https://cloud.google.com/storage/docs/hosting-static-website-http
* **pros**
  * costs nothing
* **cons**
  * cannot do this on root(/apex/naked) domain
  * however can use 'subdomain forward' of '@' using a 'synthetic record' on Google Domains
    

## 3. HTTPS, custom domain, CDN
* must use [HTTP/S Load Balancing](ht...tps://cloud.google.com/load-balancing/docs/https)
  ```mermaid
  graph TD
  ip[AnyCast  External IP] --> rule[Global Forwarding Rule]
  rule --> proxy[Target Proxy]
  proxy --> urlMap[URL Map - aka load balancer]
  urlMap --> service[Backend Service / Bucket]
  ```
* **pros**
  * get CDN for (almost) free
* **cons**
  * expensive for homesite: £16/month and up
  * odd errors at start (just had to wait)
    * `FAILED_NOT_VISIBLE`
    * `err_ssl_version_or_cipher_mismatch`
  * a [second](https://cloud.google.com/load-balancing/docs/https/setting-up-http-https-redirect#setting_up_the_http_load_balancer) load balancer required for HTTP-to-HTTPS
    * or is it?

### Setup:
```
To create:
gcloud compute addresses create wealthhealth-address --global --ip-version IPV4
gcloud compute ssl-certificates create wealthhealth-certificate --domains=www.wealthhealth.dev,wealthhealth.dev --global
gcloud compute backend-buckets create wealthhealth-bucket --gcs-bucket-name=www.wealthhealth.dev --cache-mode=CACHE_ALL_STATIC --enable-cdn
gcloud compute url-maps create wealthhealth-load-balancer --default-backend-bucket=wealthhealth-bucket
gcloud compute target-https-proxies create wealthhealth-load-balancer-target-proxy --ssl-certificates=wealthhealth-certificate --url-map=wealthhealth-load-balancer
gcloud compute forwarding-rules create wealthhealth-forwarding-rules --target-https-proxy=wealthhealth-load-balancer-target-proxy --load-balancing-scheme=EXTERNAL --address=wealthhealth-address --global --ports=443

then
gcloud compute addresses list
and us the IP in your domain DNS
NAME TYPE TTL  DATA
@    A    1hr  {ip}
www  A    1hr  {ip}

To delete:
gcloud compute forwarding-rules delete --global wealthhealth-forwarding-rules
gcloud compute target-https-proxies delete wealthhealth-load-balancer-target-proxy
gcloud compute url-maps delete wealthhealth-load-balancer
gcloud compute backend-buckets delete wealthhealth-bucket
gcloud compute ssl-certificates delete wealthhealth-certificate
gcloud compute addresses delete wealthhealth-address --global
```

## 4: Integrate Cloud Run
```
gcloud compute network-endpoint-groups create whispers-network-endpoint-group --network-endpoint-type=serverless --cloud-run-service=whispers --region=europe-west1
gcloud compute backend-services create whispers-backend-service --global 
gcloud compute backend-services add-backend whispers-backend-service --global --network-endpoint-group=whispers-network-endpoint-group --network-endpoint-group-region=europe-west1
gcloud compute url-maps add-path-matcher wealthhealth-load-balancer --path-matcher-name=whispers-path-matcher --default-backend-bucket=wealthhealth-bucket --backend-service-path-rules='/whispers/*=whispers-backend-service' --global

To delete:
gcloud compute url-maps remove-path-matcher wealthhealth-load-balancer --path-matcher-name=whispers-path-matcher
```
* note: fiddly with regions vs global and ports/protocols
* TODO's:
  * how remove '/whispers' sub-domain on cloud run container?
  * stop direct access to cloud run container - [ingress rules?](https://cloud.google.com/run/docs/securing/ingress#command-line)

