const spell = document.querySelector('#search');
const listSearch = document.querySelector('#listSearch');

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
            return data.results; 
        })
        .catch(error => {
            console.error('Error:', error);
            return [];
        });
}

function updateList(spellList) {
    listSearch.innerHTML = ''; // Limpa a lista anterior

    spellList.forEach(spell => {
        let magia = document.createElement('li');
        magia.innerText = spell.name;
        listSearch.appendChild(magia);
    });
}

function clearList() {
    listSearch.innerHTML = ''; // Limpa a lista anterior
}

spell.addEventListener('input', () => {
    
    const spellValue = spell.value.toLowerCase().trim();

    if(spellValue === '') {
        console.log("valor vazio");
        clearList();
    } else {
        searchSpells(spellValue).then(spellList => {
            if(spellList.length === 0) {
                console.log("Magia não encontrada.");
                clearList();
            } else {
                console.log("Magias encontradas:");
                spellList.forEach(spell => {
                    console.log(spell.name);
                    updateList(spellList);    
                });
            }
        });     
    }
})

