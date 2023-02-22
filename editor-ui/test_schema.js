var dataModel = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$defs": {

        "UserName": {
            "type": "object",

            "properties": {

                "UserNameValues": {
                    "type": "string"
                }
            }
        }, 

        "UserRole": {
            "type": "object",

            "properties": {

                "UserRoleValues": {
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
        }
    },
    "required": ['UserName', 'UserRole']

}

