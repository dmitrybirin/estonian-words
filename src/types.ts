// todo with translations
// interface Type

export interface VerbForms {
	first: string;
	second: string;
	third: string;
}

export interface Word {
	id: string;
	type: string;
	forms: VerbForms;
	ruTranslation: string;
}

export interface Verb extends Word {
	type: 'verb';
}
