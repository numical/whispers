# Cloud Functions

## Set up project
````
gcloud config set project numical-whispers  
gcloud services enable cloudfunctions.googleapis.com  
gcloud services enable cloudbuild.googleapis.com
gcloud services enable compute.googleapis.com
````

## Export function
````
gcloud functions deploy playGame --runtime nodejs12 --trigger-http --allow-unauthenticated  --region=europe-west2
````
Funnies:
* `--source` must be *root* of all local files, no peer sources allowed;
* main file must be  must be `index.js` or `index.js`

## Delete function
````
gcloud functions delete playGame --region=europe-west2

````
