1. Download gcoul cli into local marchine with this link: https://cloud.google.com/sdk/docs/downloads-versioned-archives
2. User credentials provided by using the gcloud CLI
      gcloud auth login: Generates user credentials that are used to authenticate to and authorize access to Google Cloud services.
      gcloud auth application-default login: Generates user credentials that are provided to Application Default Credentials for use in a local development environment.
      gcloud auth application-default login --scopes=https://www.googleapis.com/auth/analytics.readonly
   then it will save credentials in the following file $HOME/.config/gcloud/application_default_credentials.json 