// todo with translations
// interface Type

export interface VerbForms {
	first: string;
	second: string;
	third: string;
}

export interface Word {
	type: string;
	forms: VerbForms;
	ruTranslation: string;
}

export interface Verb extends Word {
	type: 'verb';
}
