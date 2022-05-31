function getFilmes() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://localhost/ajax/filmes.json');

    // mudança dos estados 
    xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let JSONFilmes = xmlHttp.responseText; //retorno da requisição feita

            let objJsonFilmes = JSON.parse(JSONFilmes);
            console.log(objJsonFilmes);

            for (let i in objJsonFilmes.filmes) {
                let item = objJsonFilmes.filmes[i];

                console.log(item);

                let divRow = document.createElement('div');
                divRow.className = 'row';

                let divCol = document.createElement('div');
                divCol.className = 'col';

                // ----> Parágrafos
                let p1 = document.createElement('p');
                p1.innerHTML = '<strong>Título: </strong>' + item.titulo;

                let p2 = document.createElement('p');
                p2.innerHTML = '<strong>Resumo: </strong>' + item.resumo;

                let genero = '';
                for(let g in item.generos) {
                    if(genero) genero+= ', ';
                    genero += item.generos[g].genero;
                };
                let p3 = document.createElement('p');
                p3.innerHTML = '<strong>Gênero: </strong>' + genero;

                let elenco = '';
                for(let e in item.elenco) {
                    if(elenco) elenco+= ', ';
                    elenco += item.elenco[e].ator;
                };
                let p4 = document.createElement('p');
                p4.innerHTML = '<strong>Elenco: </strong>' + elenco;

                let p5 = document.createElement('p');
                p5.innerHTML = `<strong>Data de lançamento: </strong> ${item.dataLancamento.data} (${item.dataLancamento.pais})`;

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
