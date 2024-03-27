const spell = document.querySelector('#search');
const listSearch = document.querySelector('#listSearch');
const information = document.querySelector('#information')

spell.value = "";


function searchSpells(speel) {
    const apiUrl = "https://www.dnd5eapi.co/api/spells/?name=" + speel;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro de conexão.');
            }
            return response.json();
        })
        .then(data => {
            const filteredSpells = data.results.filter(spell => {
                return startsWithCaseInsensitive(spell.name, speel);
            });
            return filteredSpells;
        })
        .catch(error => {
            console.error('Error:', error);
            return [];
        });
}

function startsWithCaseInsensitive(fullString, searchString) {
    return fullString.toLowerCase().startsWith(searchString.toLowerCase());
}

function updateList(spellList) {
    listSearch.innerHTML = ''; // Limpa a lista anterior

    spellList.forEach(spell => {
        let magia = document.createElement('li');
        let link = document.createElement('a');
        link.id = 'option';
        link.innerText = spell.name;
        link.href = `javascript:void(0);`;
        link.addEventListener('click', () => {
            informationSpell(spell);
        });
        magia.appendChild(link);
        listSearch.appendChild(magia);
    });
}

function informationSpell(spell) {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    listSearch.innerHTML = '';
    
    fetch("https://www.dnd5eapi.co/api/spells/" + spell.index, requestOptions)
    .then(response => response.json())
    .then(result => exibirMagia(result))
    .catch(error => console.log('error', error));
}

function exibirMagia(spell) {
    listSearch.innerHTML = '';

    let spellClasses = spell.classes.map(cls => cls.name).join(', ');

    information.setAttribute("style", "display: block;");
    let detalhes = `
    <div id="spellNamBox">
    <h3 id="spellName">${spell.name}</h3>
    </div>
    <div id="othersInformation">
    <p><strong>Escola:</strong> ${spell.school.name} | Classe: ${spellClasses}</p>
    <p><strong>Nível:</strong> ${spell.level}</p>
    <p><strong>Tempo de Conjuração:</strong> ${spell.casting_time}</p>
    <p><strong>Alcance:</strong> ${spell.range}</p>
    <p><strong>Componentes:</strong> ${spell.components.join(', ')}</p>
    <p><strong>Duração:</strong> ${spell.duration}</p>
    <p><strong>Descrição:</strong> ${spell.desc.join('<br>')}</p>
    </div>
    `;
    let spellDetails = document.createElement('div');
    spellDetails.innerHTML = detalhes;
    information.appendChild(spellDetails)
}

function clearList() {
    listSearch.innerHTML = '';
    information.innerHTML = '';
}

function notFound() {
    let divHTML = `
    <div>
        <p id="notFind"> Magia não localizada.
    </div>`
    let div = document.createElement('div');
    div.innerHTML = divHTML;
    listSearch.appendChild(div);
}

function campoVazio() {
    let divHTML = `
    <div>
        <p id="notFind"> Valor de busca vazia.
    </div>`
    let div = document.createElement('div');
    div.innerHTML = divHTML;
    listSearch.appendChild(div);
}


spell.addEventListener('input', () => {
    
    const spellValue = spell.value.toLowerCase().trim();

    if(spellValue === '') {
        clearList();
        campoVazio();
    } else {
        searchSpells(spellValue).then(spellList => {
            if(spellList.length === 0) {
                console.log("Magia não encontrada.");
                clearList();
                notFound();

            } else {
                console.log("Magias encontradas.");
                information.innerHTML = '';
                information.setAttribute("style", "display: none;");
                spellList.forEach(spell => {
                    updateList(spellList);    
                });
            }
        });     
    }
})

