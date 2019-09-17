// création d'une requête avec activation de suivi de Cookies.
var request = require('request').defaults({
    jar: true
});

exports.postAuthenticateReq = postAuthenticateReq;
exports.getMatriculeSelonNomReq = getMatriculeSelonNomReq;
exports.getInfosCollegueSelonMatricule = getInfosCollegueSelonMatricule;

function postAuthenticateReq(identifiant, mdp, callbackFn) {
    console.log("passage dans postAuthenticateReq");
    console.log(`identifiant = ${identifiant}, mdp = ${mdp}`);
    console.log(`"identifiant": "${identifiant.toString()}"`);
    request('https://jbmerand-collegues-api.herokuapp.com/auth', {
            method: 'POST',
            json: true,
            body: {
                "identifiant": identifiant,
                "motDePasse": mdp
            }
        },
        function (err, res, body) {
            callbackFn(res.statusCode);
        }
    );
}

function getMatriculeSelonNomReq(nom, callbackFn, errorFn) {
    console.log("passage dans getMatriculeSelonNomReq", nom);
    // https://jbmerand-collegues-api.herokuapp.com/collegues?nom=durand
    request("https://jbmerand-collegues-api.herokuapp.com/collegues?nom=" + nom, {
            method: 'GET',
            json: true
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn(body);
            } else {
                errorFn("Erreur dans la récupération des matricules.")
            }

        }
    );
}

function getInfosCollegueSelonMatricule(matricule, callbackFn, errorFn) {
    // https://jbmerand-collegues-api.herokuapp.com/collegues/{matriculeDuCollegueIci}
    request("https://jbmerand-collegues-api.herokuapp.com/collegues/" + matricule, {
            method: 'GET',
            json: true,
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callbackFn(body);
            } else {
                errorFn("Erreur dans la récupération des informations du collègue.")
            }
        }
    );
}