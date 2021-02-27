const initial_verbs_homework = [
	// ['Elama', 'elada', 'Elab', 'жить'],
	// ['Töötama', 'töötada', 'Töötab', 'работать'],
	// ['Õpetama', 'õpetada', 'õpetab', 'учить', 'преподавать'],
	// ['Õppima', 'õppida', 'õpib', 'учиться',],
	// ['Arvama', 'arvata', 'arvab', 'думать', 'считать',],
	// ['vabandama', 'vabandada', 'vabandab', 'извиняться',],
	// ['Võtma', 'võtta', 'võtab', 'брать',],
	// ['Andma', 'anda', 'annab', 'давать',],
	// ['Paluma', 'paluda', 'palub', 'просить',],
	// ['Tänama', 'tänada', 'tänab', 'благодарить',],
	// ['olema', 'olla', 'on', 'быть',],
	// ['armastama', 'armastada', 'armastab', 'любить',],
	// ['rääkima', 'rääkida', 'räägib', 'говорит',],
	// ['sõitma', 'sõita', 'sõidab', 'ехать'],
	// ['aru saama', 'aru saada', 'saab aru', 'понимать'],
	// ['tuttavaks saama', 'tuttavaks saada', 'saab tuttavaks', 'знакомиться'],
	// ['hiljaks jääma', 'hiljaks jääda', 'jääb hiljaks', 'опаздывать'],
// [	'tulema','tulla','tuleb','	приходить, возвращаться'],
// ['pärit olema	',' pärit olla ','on pärit',		'быть родом'],
// ['sündima','sündida','sünnib','рождаться'],
// ['puhkama','puhata','puhkab','отдыхать'],
// ['magama','magada','magab','cпать'],
// ['mängima','mängida','mängib','Играть'],
// ['lugema','lugeda','loeb','	Читать '],
// ['kirjutama','kirjutada','kirjutab','Писать'],
// ['oskama','osata','oskab','	Знать, уметь'],
// ['teadma','teada','teab','	Знать'],
['abielluma','abielluda','abiellub','жениться, выходить замуж'],
['surema','surra','sureb','умирать'],
['sööma','süüa','sööb' ,'кушать'],
['jooma','juua','joob' ,'пить'],
['laulma','laulda','laulab','петь'],
['tantsima','tantsida','tantsib' ,'танцевать'],
['vaatama','vaadata','vaatab','смотреть'],
['nägema','näha','näeb','видеть'],
['kuulama','kuulata','kuulab','слушать'],
['kuulma','kuulda','kuuleb','слышать'],
]

const result = initial_verbs_homework.map(word => ({
	type: 'verb',
	ruTranslation: word[3].trim().trim().toLowerCase(),
	forms: {
		first: word[0].trim().toLowerCase(),
		second: word[1].trim().toLowerCase(),
		third: word[2].trim().toLowerCase()
	}
}))

console.log(JSON.stringify(result, null, 4))