from rest_framework.decorators import api_view
from rest_framework.response import Response
from  api.services import weekly , monthly , demand_data
@api_view(['GET'])
def getData(request):
    person = {'from_frontend': demand_data}  
    return Response(person)