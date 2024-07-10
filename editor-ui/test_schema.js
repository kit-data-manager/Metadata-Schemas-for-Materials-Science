var dataModel = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$defs": {

        "userName": {
        
            "type": "object",

            "properties": {

                "userNameValues": {
                    'termURI':'http://matwerk.datamanager.kit.edu:8001/rest/v1/DemoTerms-1/data?uri=http://matwerk.datamanager.kit.edu:8001/DemoTerms-1/en/page/username&format=application%2Fjson', 
                    "type": "string",
                    'title' : '',
                    'description' : ''
                
                }
            }
        }, 

        "userRole": {
            
            "type": "object",

            "properties": {

                "userRoleValues": {
                    'termURI' : 'http://matwerk.datamanager.kit.edu:8001/rest/v1/DemoTerms-1/data?uri=http://matwerk.datamanager.kit.edu:8001/DemoTerms-1/en/page/userrole&format=application%2Fjson',
                    "type": "string",
                    'title' : '',
                    'description' : '',
                    "enum": []
                }
            }
        }


    },
    "title": "status",
    "type": "object",
    "properties": {

        'userName': {
            "$ref": "#/$defs/userName"
        }, 

        'userRole': {
            "$ref": "#/$defs/userRole"
        },

        'physStatus': {
            "$ref": "#/$defs/physStatus"
        },

    },
    "required": ['userName', 'userRole']

}

