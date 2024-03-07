export default function formatDate(dateISO8601){

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
