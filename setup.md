# Cloud Functions

## Set up project
````
gcloud config set project numical-whispers  
gcloud services list --available
gcloud services enable cloudfunctions.googleapis.com  
gcloud services enable cloudbuild.googleapis.com
gcloud services enable compute.googleapis.com  << not necessary
gcloud services enable texttospeech.googleapis.com
gcloud services enable speech.googleapis.com
gsutil mb -l europe-west2 -b on gs://whispers-audio-files
gsutil iam ch allUsers:objectViewer gs://whispers-audio-files
````

## Export function
````
gcloud functions deploy playGame --runtime nodejs12 --trigger-http --allow-unauthenticated  --region=europe-west2
````
Funnies:
* `--source` must be *root* of all local files, no peer sources allowed;
* main file must be `index.js` (ignore docs that say `function.js` also possible - this errors)

## Delete function
````
gcloud functions delete playGame --region=europe-west2
````
