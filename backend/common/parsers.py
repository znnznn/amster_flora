import ast
import json

from rest_framework.parsers import MultiPartParser, DataAndFiles, FormParser


class MultipartJsonParser(MultiPartParser):

    def parse(self, stream, media_type=None, parser_context=None):
        result = super().parse(stream, media_type=media_type, parser_context=parser_context)
        data = {}

        for key, value in result.data.items():
            if type(value) != str:
                data[key] = value
                continue
            if '{' in value or "[" in value:
                try:
                    data[key] = json.loads(value)
                except ValueError:
                    data[key] = value
            else:
                data[key] = value
        return DataAndFiles(data, result.files)


class DictFormParser(FormParser):
    media_type = 'application/x-www-form-urlencoded'

    def parse(self, stream, media_type=None, parser_context=None):
        try:
            raw_data = stream.read().decode('utf-8')  # Read and decode the stream
            print(raw_data)
            # Attempt to parse the string as a dictionary
            parsed_data = ast.literal_eval(raw_data)
            if not isinstance(parsed_data, dict):
                raise ValueError("Parsed data is not a dictionary")
            return parsed_data
        except (ValueError, SyntaxError):
            return super().parse(stream, media_type, parser_context)
