const dan_1 = {
    "degree": "1. Dan",
    "belt": "Sort",
    "taegeuk": [
        {
            "name": "Il Jang",
            "number": 1,
            "prefix": "Taegeuk",
            'key': "il_jang",
        },
        {
            "name": "Yi Jang",
            "number": 2,
            "prefix": "Taegeuk",
            'key': "yi_jang",
        },
        {
            "name": "Sam Jang",
            "number": 3,
            "prefix": "Taegeuk",
            'key': "sam_jang",
        },
        {
            "name": "Sah Jang",
            "number": 4,
            "prefix": "Taegeuk",
            'key': "sah_jang",
        },
        {
            "name": "Oh Jang",
            "number": 5,
            "prefix": "Taegeuk",
            'key': "oh_jang",
        },
        {
            "name": "Yuk Jang",
            "number": 6,
            "prefix": "Taegeuk",
            'key': "yuk_jang",
        },
        {
            "name": "Chil Jang",
            "number": 7,
            "prefix": "Taegeuk",
            'key': "chil_jang",
        },
        {
            "name": "Pal Jang",
            "number": 8,
            "prefix": "Taegeuk",
            'key': "pal_jang",
        },
        {
            "name": "Koryo",
            "number": 9,
            "prefix": "Poomse",
            'key': "koryo",
        },
    ],
    "ttu":{ 
        "poomse": [
            {
                "name": "Il Jang",
                "number": 1,
                "prefix": "Gibon",
            },
            {
                "name": "Yi Jang",
                "number": 2,
                "prefix": "Gibon",
            },
            {
                "name": "Sam Jang",
                "number": 3,
                "prefix": "Gibon",
            }],
        "pensum": {
            "kyorugi": {
                "sambon_kyorugi": ["1", "2", "3", "4", "5", "6", "7", "8"],
                "hanbon_kyorugi": {
                    "son_dong_jak": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "bal_dong_jak": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "eungyong_dong_jak": ["1", "2", "3", "4", "5", "6", "7", "8"],
                },
                "hosinsul":{
                    "mom_jagbi": ["1", "2", "3", "4"],
                    "palmok_jagbi": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "jireugi": ["1", "2", "3", "4"],
                },
                "sparring": {
                    "required": true,
                    "rounds": 3,
                    "roundTimeSeconds": 180,
                    "1vs2": true,
                    "protection": false
                }
            },
            "kyokpa":{
                "required": true,
                "punch": 1,
                "kick": 1,
                "jump_kick": 1,
                "bricks": {
                    "required": true,
                    "male": 4,
                    "female": 2,
                    "requirements": {
                        "age": 18
                    }
                }
            },
        }
    },  
    "physical": {
        "timeSeconds": 390,
        "push_ups": 70,
        "sit_ups": 70,
        "jumping_jacks": 70,
    },
}