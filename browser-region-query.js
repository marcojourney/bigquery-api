  /**
   * TODO(developer): Uncomment this variable and replace with your
   *   Google Analytics 4 property ID before running the sample.
   */
  propertyId = '410718977';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');
  const {GoogleAuth} = require('google-auth-library');

  // Using a default constructor instructs the client to use the credentials
  // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

  // Runs a simple report.
  async function runReport() {
   const auth = new GoogleAuth({scopes});

   const authToken = await auth.getClient();
   analyticsDataClient.auth = authToken;

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'region',
          stringFilter: {
            value: 'Kyoto'
          }
        }
      },
      // dimensionFilter: {
      //   andGroup: {
      //     expressions: [
      //       {
      //         filter: {
      //           fieldName: 'region',
      //           stringFilter: {
      //             value: 'Phnom Penh'
      //           }
      //         }
      //       }
      //     ]
      //   }
      // },
      dimensions: [
        {
          name: 'browser',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ]
    });

    console.log('Report result:');
    response.rows.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }

  runReport();