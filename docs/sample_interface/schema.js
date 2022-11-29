var dataModel = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "$defs": {
        "Gender": {
            "type": "string",
            "enum": ["Male", "Female", "Transgender", "Non-binary", "Not provided"]
        }
    },
	"type": "object",
    "properties": {
        "familyName": {
                "type": "string"
                },
                "givenName": {
                    "type": "string"
                },
				"age":{
					"type": "integer"
				},
                "gender": {
                   "$ref": "#/$defs/Gender"
                }
    }
}