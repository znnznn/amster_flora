import json
from base64 import b64encode

import requests


class BasicAUTHRequest:
    model_token = 'Bearer'
    api_key = None
    host = 'http'

    @staticmethod
    def get_session():
        return requests.Session()

    def add_default_headers(self, headers=None):
        headers = headers or {}
        return {
            "Authorization": self.get_auth_token(self.model_token, self.api_key),
            "Content-Type": "application/json",
            "Accept": "*/*",
            **headers
        }

    def get_url(self, prefix):
        return f'{self.host}/{prefix}'

    @staticmethod
    def get_basic_auth_token(username, password):
        token = b64encode(f"{username}:{password}".encode('utf-8')).decode("ascii")
        return f'Basic {token}'

    @staticmethod
    def get_auth_token(model_token, api_key):
        return f'{model_token} {api_key}'

    def get(self, url, headers=None):
        with self.get_session() as session:
            return session.get(url, headers=self.add_default_headers(headers))

    def post(self, url, data=None, headers=None):
        with self.get_session() as session:
            return session.post(url, data=json.dumps(data), headers=self.add_default_headers(headers))

    def put(self, url, data=None, headers=None):
        with self.get_session() as session:
            return session.put(url, data=json.dumps(data), headers=self.add_default_headers(headers))

    def delete(self, url, headers=None):
        with self.get_session() as session:
            return session.delete(url, headers=self.add_default_headers(headers))

    def patch(self, url, data=None, headers=None):
        with self.get_session() as session:
            return session.patch(url, data=json.dumps(data), headers=self.add_default_headers(headers))
