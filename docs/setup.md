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
gsutil mb -l europe-west2 -b on gs://{bucket-name}
gsutil iam ch allUsers:objectViewer gs://{bucket-name}
````

gcloud beta billing projects link numical-telephone --billing-account=0118EE-C0AC1A-AB5E21



## Export function
````
gcloud functions deploy playGame --runtime nodejs12 --trigger-http --allow-unauthenticated  --region=europe-west2
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
gcloud functions delete playGame --region=europe-west2
````

# Cloud Run

## Set up project
```
gcloud services enable run.googleapis.com
```