// Import the Google Cloud client library using default credentials
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery({ projectId: 'todo-list-a6ea9' });
async function query() {
  // Queries the U.S. given names dataset for the state of Texas.

  const query = `SELECT 
  *
  FROM \`todo-list-a6ea9.analytics_395031298.events_intraday_20231019\`, unnest(user_properties) as user_properties
  where user_properties.key = 'user_id' and user_properties.value.string_value = "a9832199a9cf00bdc7aa330e9eed71d5" LIMIT 1`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log('Rows:');
  rows.forEach(row => console.log(row));
}

query();