
// Transforme un objet Date en une String au format 'JJ/MM/AAAA'.

export function formatDate(dateISO8601){

    // Création d'un objet Date à partir de la chaîne ISO 8601
    let date = new Date(dateISO8601);

    // Extraction des éléments de la date
    let jour = date.getDate();
    let mois = date.getMonth() + 1; // Notez que getMonth() renvoie les mois de 0 à 11
    let annee = date.getFullYear();
    let heure = date.getHours();
    let minute = date.getMinutes();
    
    if (jour <= 10){ jour = "0" + jour};
    if (mois <= 10){ mois = "0" + mois};
    if (heure <= 10){ heure = "0" + heure};
    if (minute <= 10){ minute = "0" + minute};

    // Formatage de la date au format souhaité
    return `${jour}/${mois}/${annee} ${heure}h${minute}`;

}


// Transforme une date de type String format 'JJ/MM/AAAA' en objet Date.

export function transformInDate(dateString){
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}

// Vérifie qu'une date est au format 'JJ/MM/AAAA'

export function checkFormatDate(date){
        // Définition de l'expression régulière pour le format 'JJ/MM/AAAA'
        var regex = /^\d{2}\/\d{2}\/\d{4}$/;
    
        // Vérification du format en utilisant test() de l'objet RegExp
        if (regex.test(date)) {
            return true;
        } else {
            return false;
        }
    
}