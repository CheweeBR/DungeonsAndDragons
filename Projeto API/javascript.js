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

function updateList(s) {

}

spell.addEventListener('input', () => {
    
    const spellValue = spell.value.toLowerCase().trim();

    if(spellValue === '') {
        console.log("valor vazio");
    } else {
        searchSpells(spellValue).then(spellList => {
            if(spellList.length === 0) {
                console.log("Magia não encontrada.");
            } else {
                console.log("Magias encontradas:");
                spellList.forEach(spell => {
                    console.log(spell.name);
                    updateList();    
                });
            }
        });     
    }
})

