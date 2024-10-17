from decouple import config

AWS_S3_ACCESS_KEY_ID = config('AWS_S3_ACCESS_KEY_ID')
AWS_S3_SECRET_ACCESS_KEY = config('AWS_S3_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME')

STORAGES = {
    "default": {"BACKEND": "storages.backends.s3boto3.S3Boto3Storage"},
    "staticfiles": {"BACKEND": "storages.backends.s3boto3.S3StaticStorage"}
}

AWS_LOCATION = 'static'
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
AWS_S3_FILE_OVERWRITE = False
COUNTRIES_FLAG_URL = 'flags/{code}_16.png'
MEDIA_URL = f'{AWS_S3_CUSTOM_DOMAIN}/media/'
STATIC_URL = f'{AWS_S3_CUSTOM_DOMAIN}/static/'

AWS_S3_DEFAULT_ACL = 'public-read'
