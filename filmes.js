function getFilmes() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://localhost/ajax/filmes.xml');

    // mudança dos estados 
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let XMLFilmes = xmlHttp.responseText; //retorno da requisição feita

            // Árvore de elementos
            let parse = new DOMParser();
            domFilmes = parse.parseFromString(XMLFilmes, 'text/xml');

            // Obj Json
            JsonFilmes = xmlToJson(domFilmes);

            for (let i in JsonFilmes['filmes']['filme']) {
                let item = JsonFilmes['filmes']['filme'][i];
                //console.log(JsonFilmes['filmes']['filme'][i]);


                let divRow = document.createElement('div');
                divRow.className = 'row';

                let divCol = document.createElement('div');
                divCol.className = 'col';

                // ----> Parágrafos
                let p1 = document.createElement('p');
                p1.innerHTML = '<strong>Título: </strong>' + item['titulo']['#text'];

                let p2 = document.createElement('p');
                p2.innerHTML = '<strong>Resumo: </strong>' + item['resumo']['#text'];

                let genero = '';
                for(let g in item.genero) {
                    if(genero) genero+= ', ';
                    genero += item.genero[g]['#text'];
                };
                let p3 = document.createElement('p');
                p3.innerHTML = '<strong>Gênero: </strong>' + genero;

                let elenco = '';
                for(let e in item.elenco.ator) {
                    if(elenco) elenco+= ', ';
                    elenco += item.elenco.ator[e]['#text'];
                };
                let p4 = document.createElement('p');
                p4.innerHTML = '<strong>Elenco: </strong>' + elenco;

                let p5 = document.createElement('p');
                p5.innerHTML = `<strong>Data de lançamento: </strong> ${item.dataLancamento['#text']} (${item.dataLancamento['@attributes']['pais']})`;

                let hr = document.createElement('hr');

                divRow.appendChild(divCol);
                divCol.appendChild(p1);
                divCol.appendChild(p2);
                divCol.appendChild(p3);
                divCol.appendChild(p4);
                divCol.appendChild(p5);
                divCol.appendChild(hr);

                document.getElementById('lista').appendChild(divRow);

            };

        };

        if (xmlHttp.onreadystatechange == 4 && xmlHttp.status == 404);
    };

    xmlHttp.send();
};


// http://localhost/ajax/filmes/filmes.html