const configs = {
  "dev": {
    "username": process.env.POSTGRESS_USERNAME,
    "password": process.env.POSTGRESS_PASSWORD,
    "database": process.env.POSTGRESS_DB,
    "host": process.env.POSTGRESS_HOST,
    "dialect": "postgres",
    "aws_region": process.env.UDACITY_AWS_REGION,
    "aws_profile": process.env.UDACITY_AWS_PROFILE,
    "aws_media_bucket": process.env.UDACITY_AWS_MEDIA_BUCKET,
    "jwt": {
      "secret": process.env.JWT_SECRET
    }
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres",
    "aws_region": process.env.UDACITY_AWS_REGION,
    "aws_profile": process.env.UDACITY_AWS_PROFILE,
    "aws_media_bucket": process.env.UDACITY_AWS_MEDIA_BUCKET,
    "jwt": {
      "secret": process.env.JWT_SECRET
    }
  }
};

let configTmp = configs.dev;
if (process.env.NODE_ENV === 'prod') {
  configTmp = configs.prod;
}


export const config = configTmp;