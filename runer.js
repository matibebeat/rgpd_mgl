
//TODO la partie de l'application qui fait des trucs intelligents
console.log('Hello from the runner.js');



/*

   c'est la partie de l'extension qui est executé a chaque fois que l'utilisateur ouvre une page web

*/
const keywords = [
   ' Conditions Générales de Vente ',
   'privacy',
   'policy',
   'data',
   'donnees',
   'Charte de données personnelles',
   'Données personnelles',
   'CGU',
   'GCU',
   'Confidentialité',
   'GDPR',
   'Consentement',
   'Sécurité des données',
   'Protection des données',
   'Cookies'
];

/*when the page is loaded find on the page if there are links on he page that contains a word in the list*/
/*
function findLinks() {
   let links = document.querySelector('a');
   //query selector with the text 'bla'
   text = document.querySelector('bla');
   let linksText = [];
   console.log(links);
   for (const element of links) {
      console.log(element);

      for (const keyword of keywords) {
         if (element.innerText.toLowerCase().includes(keyword.toLowerCase())) {
            element.style.color = 'red';
            element.style.fontWeight = 'bold';
            element.style.textDecoration = 'underline';
            linksText.push(element.innerText);
         }
      }
   }
   console.log(linksText);
}
*/
/*wait that all the dom is loaded */


function findLinks() {
   let links = document.getElementsByTagName('a');
   let linksText = [];
   hrefs = [];
   for (const element of links) {
      linksText.push(element.innerText);
      for (const keyword of keywords) {
         if (element.innerText.toLowerCase().includes(keyword.toLowerCase())) {
            element.style.color = 'red';
            element.style.fontWeight = 'bold';
            element.style.textDecoration = 'underline';
            linksText.push(element.innerText);
            hrefs.push(element.href);
         }
      }

   }

   /*trie hrefs de la plus petite string a la plus grande*/
   hrefs.sort(function (a, b) {
      return a.length - b.length;
   });


   /*
   if there are two links with the same href, we will keep only the first one
   if there are two links with the same href plus #something we will keep the shortest
   */
   let hrefsUnique = [];
   let hrefsUniqueShort = [];
   for (let i = 0; i < hrefs.length; i++) {
      let href = hrefs[i];
      let hrefShort = href.split('#')[0];

      console.log(hrefShort);
      if (!hrefsUniqueShort.includes(hrefShort)) {
         hrefsUniqueShort.push(hrefShort);
      }
   }

   site = window.location.hostname;
   console.log(site);
   fetch('http://localhost:5000/api/' + site, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
   }).then(response => {
      if (reponse.status == 404) {
         /*post to the same url*/
         fetch('http://localhost:5000/api/test', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               links: hrefsUniqueShort,
               nom: site
            })
         }).then(response => {
            console.log(response);
         }).catch(err => {
            console.log(err);
         });
      }
   }).catch(err => {
      console.log(err);
   });

}

findLinks();
