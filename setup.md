## Set up project
````
gcloud config set project numical-whispers  
gcloud services enable cloudfunctions.googleapis.com  
gcloud services enable cloudbuild.googleapis.com
gcloud services enable compute.googleapis.com
````


## Export function
````
gcloud functions deploy playGame --runtime nodejs12 --trigger-http --allow-unauthenticated --source=cloud-function --region=europe-west2
````

## Delete function
````
gcloud functions delete playGame --region=europe-west2

````
