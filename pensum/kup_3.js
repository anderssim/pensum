const kup_3 = {
    "degree": "Kup 3",
    "belt": "Rød med sort stribe",
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
    ],
    "ttu": {
        "poomse": [],
        "pensum": {
            "kyorugi": {
                "sambon_kyorugi": ["1", "2", "3", "4", "5", "6", "7"],
                "hanbon_kyorugi": {
                    "son_dong_jak": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "bal_dong_jak": ["1", "2", "3", "4", "5", "6", "7", "8"],
                    "eungyong_dong_jak": ["1", "2", "3", "4"],
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
                    "protection": true
                }
            },
            "kyokpa":{
                "required": true,
                "punch": 1,
                "kick": 0,
                "jump_kick": 1,
                "bricks": {
                    "required": false,
                    "male": 0,
                    "female": 0,
                    "requirements": {
                        "age": 18
                    }
                }
            },
        }
    },
    "symbolism": {
        "gwe": {
            "name": "Gam",
            "number": 6,
            "emoji": "☴",
            "description": "Gam er det sjette af de otte trigrammer og symboliserer vind, som er det sjette af de fire grundlæggende elementer. Det repræsenterer også det kvindelige princip og styrken i naturen. Son Gwe er den bløde kvindelige Gwe som markerer den uendelige koncentration af Yin energi.",
        }, 
    }, 
    "physical": {
        "timeSeconds": 300,
        "push_ups": 50,
        "sit_ups": 50,
        "jumping_jacks": 50,
    }
}