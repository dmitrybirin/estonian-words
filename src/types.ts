export type EstonianLevels = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export enum WordType {
	noun,
	verb,
	adjective,
	numeral,
	other
}

// todo with translations
// interface Type

export interface VerbForms {
	maForm: string;
	daForm: string;
	thirdForm: string;
	tudForm: string;
}

interface CaseForm {
	singular: string;
	plural: string[];
}

export interface CaseForms {
	first: CaseForm;
	second: CaseForm;
	third: CaseForm;
	fourth: CaseForm;
}

export interface Word {
	id: string;
	esInitial: string;
	level: EstonianLevels;
	sonaveebUrl: string;
	type: WordType;
	esType: string;
	forms?: VerbForms | CaseForms;
	ruTranslations: string[];
}

export interface ErrorWord {
	problematicWord: string;
	errorText: string;
}
