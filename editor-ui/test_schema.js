var dataModel = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$defs": {

        "UserName": {
            "type": "object",

            "properties": {

                "UserNameValues": {
                    "type": "string",
                    'title' : '',
                    'description' : ''
                
                }
            }
        }, 

        "UserRole": {
            "type": "object",

            "properties": {

                "UserRoleValues": {
                    "type": "string",
                    'title' : '',
                    'description' : '',
                    "enum": []
                }
            }
        },

        "PhysStatus": {
            "type": "object",

            "properties": {

                "PhysStatusValues": {
                    "type": "string",
                    "enum": []
                }
            }
        }


    },
    "title": "status",
    "type": "object",
    "properties": {

        'UserName': {
            "$ref": "#/$defs/UserName"
        }, 

        'UserRole': {
            "$ref": "#/$defs/UserRole"
        },

        'PhysStatus': {
            "$ref": "#/$defs/PhysStatus"
        },

    },
    "required": ['UserName', 'UserRole', 'PhysStatus']

}

