// todo with translations
// interface Type

interface VerbForms {
	first: string,
	second: string
	third: string
}

interface Word {
	type: string
	forms: VerbForms
	ruTranslation: string
}

interface Verb extends Word {
	type: 'verb',
}

export const words: Verb[] = [
    {
        "type": "verb",
        "ruTranslation": "жить",
        "forms": {
            "first": "elama",
            "second": "elada",
            "third": "elab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "работать",
        "forms": {
            "first": "töötama",
            "second": "töötada",
            "third": "töötab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "учить",
        "forms": {
            "first": "õpetama",
            "second": "õpetada",
            "third": "õpetab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "учиться",
        "forms": {
            "first": "õppima",
            "second": "õppida",
            "third": "õpib"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "думать",
        "forms": {
            "first": "arvama",
            "second": "arvata",
            "third": "arvab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "извиняться",
        "forms": {
            "first": "vabandama",
            "second": "vabandada",
            "third": "vabandab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "брать",
        "forms": {
            "first": "võtma",
            "second": "võtta",
            "third": "võtab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "давать",
        "forms": {
            "first": "andma",
            "second": "anda",
            "third": "annab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "просить",
        "forms": {
            "first": "paluma",
            "second": "paluda",
            "third": "palub"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "благодарить",
        "forms": {
            "first": "tänama",
            "second": "tänada",
            "third": "tänab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "быть",
        "forms": {
            "first": "olema",
            "second": "olla",
            "third": "on"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "любить",
        "forms": {
            "first": "armastama",
            "second": "armastada",
            "third": "armastab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "говорит",
        "forms": {
            "first": "rääkima",
            "second": "rääkida",
            "third": "räägib"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "ехать",
        "forms": {
            "first": "sõitma",
            "second": "sõita",
            "third": "sõidab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "понимать",
        "forms": {
            "first": "aru saama",
            "second": "aru saada",
            "third": "saab aru"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "знакомиться",
        "forms": {
            "first": "tuttavaks saama",
            "second": "tuttavaks saada",
            "third": "saab tuttavaks"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "опаздывать",
        "forms": {
            "first": "hiljaks jääma",
            "second": "hiljaks jääda",
            "third": "jääb hiljaks"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "приходить, возвращаться",
        "forms": {
            "first": "tulema",
            "second": "tulla",
            "third": "tuleb"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "быть родом",
        "forms": {
            "first": "pärit olema",
            "second": "pärit olla",
            "third": "on pärit"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "рождаться",
        "forms": {
            "first": "sündima",
            "second": "sündida",
            "third": "sünnib"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "отдыхать",
        "forms": {
            "first": "puhkama",
            "second": "puhata",
            "third": "puhkab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "cпать",
        "forms": {
            "first": "magama",
            "second": "magada",
            "third": "magab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "играть",
        "forms": {
            "first": "mängima",
            "second": "mängida",
            "third": "mängib"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "читать",
        "forms": {
            "first": "lugema",
            "second": "lugeda",
            "third": "loeb"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "писать",
        "forms": {
            "first": "kirjutama",
            "second": "kirjutada",
            "third": "kirjutab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "знать, уметь",
        "forms": {
            "first": "oskama",
            "second": "osata",
            "third": "oskab"
        }
    },
    {
        "type": "verb",
        "ruTranslation": "знать",
        "forms": {
            "first": "teadma",
            "second": "teada",
            "third": "teab"
        }
    },
		{
			"type": "verb",
			"ruTranslation": "жениться, выходить замуж",
			"forms": {
				"first": "abielluma",
				"second": "abielluda",
				"third": "abiellub"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "умирать",
			"forms": {
				"first": "surema",
				"second": "surra",
				"third": "sureb"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "кушать",
			"forms": {
				"first": "sööma",
				"second": "süüa",
				"third": "sööb"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "пить",
			"forms": {
				"first": "jooma",
				"second": "juua",
				"third": "joob"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "петь",
			"forms": {
				"first": "laulma",
				"second": "laulda",
				"third": "laulab"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "танцевать",
			"forms": {
				"first": "tantsima",
				"second": "tantsida",
				"third": "tantsib"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "смотреть",
			"forms": {
				"first": "vaatama",
				"second": "vaadata",
				"third": "vaatab"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "видеть",
			"forms": {
				"first": "nägema",
				"second": "näha",
				"third": "näeb"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "слушать",
			"forms": {
				"first": "kuulama",
				"second": "kuulata",
				"third": "kuulab"
			}
		},
		{
			"type": "verb",
			"ruTranslation": "слышать",
			"forms": {
				"first": "kuulma",
				"second": "kuulda",
				"third": "kuuleb"
			}
		}
]
