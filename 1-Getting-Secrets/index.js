const AWS = require('aws-sdk')
const sm = new AWS.SecretsManager({ region: 'us-east-1' })

const getSecrets = async (SecretId) => {
  return await new Promise((resolve, reject) => {
    sm.getSecretValue({ SecretId }, (err, result) => {
      if (err) reject(err)
      else resolve(JSON.parse(result.SecretString))
    })
  })
}

const main = async (event) => {
  console.log('Event:', event)
  const { apikey } = await getSecrets(
    process.env.prod ? 'test_prod_secrets' : 'test_dev_secrets'
  )
  return apikey
}

exports.handler = main
