from common.clients import BasicAUTHRequest


class FacebookClient(BasicAUTHRequest):
    host = 'https://graph.facebook.com/v21.0/'

    def add_default_headers(self, headers=None):
        headers = headers or {}
        return {
            # "Content-Type": "application/json",
            # "Accept": "*/*",
            **headers
        }

    def get_url(self, access_token):
        return f'{self.host}me/?access_token={access_token}&fields=last_name,first_name,email'