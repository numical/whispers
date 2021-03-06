# Cloud Functions

## Set up project
````
gcloud auth login
gcloud projects create {project-name} --organization=379324684039
gcloud beta billing projects link {project-name}--billing-account={billing-account-id}
gcloud config set project {project-name}
gcloud services list --available
gcloud services enable cloudfunctions.googleapis.com  
gcloud services enable cloudbuild.googleapis.com
gcloud services enable texttospeech.googleapis.com
gcloud services enable speech.googleapis.com
gsutil mb -l europe-west1 -b on gs://{bucket-name}
gsutil iam ch allUsers:legacyObjectReader gs://{bucket-name}
````



## Export function
````
gcloud functions deploy playGame --runtime nodejs12 --trigger-http --allow-unauthenticated  --region=europe-west1
````
Funnies:
* `--source` must be *root* of all local files, no peer sources allowed;
* main file must be `index.js` (ignore docs that say `function.js` also possible - this errors)

## Create service account key
```
gcloud iam service-accounts keys create ./auth/whispers-key.json --iam-account={project-name}@appspot.gserviceaccount.com
```
* a 'funny': you cannot download that file again (see [Getting a service account key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys))

## Delete function
````
gcloud functions delete playGame --region=europe-west1
````

# Cloud Run

## Set up project
```
gcloud services enable run.googleapis.com
gcloud config set run/platform managed
gcloud config set run/region europe-west1

## Delete function
````
## Delete function
````
gcloud run services delete whispers 
````
````
```

