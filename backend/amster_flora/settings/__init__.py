from .base import *

ENVIRONMENT = config('ENVIRONMENT', default='prod')

if ENVIRONMENT == 'prod':
    try:
        from .prod import *
    except:
        pass
else:
    try:
        from .local import *
    except:
        pass