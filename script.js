document.addEventListener("DOMContentLoaded", function () {
    fetch('spells.json')
        .then(response => response.json())
        .then(spellsArray => {
            const kouzla = document.getElementById("kouzla");
            const kouzlaButton = document.getElementById("kouzlaTl");
            const searchInput = document.getElementById("searchInput");

            const levelFilter = document.getElementById("levelFilter");
            const classFilter = document.getElementById("classFilter");
            const typeFilter = document.getElementById("typeFilter");

            // Funkce pro vytvoření tlačítek pro kouzla
            function createSpellButtons(spells) {
                kouzlaButton.innerHTML = ""; // Vymaže předchozí tlačítka
                spells.forEach(spell => {
                    const spellButton = document.createElement("button");
                    spellButton.textContent = spell.name;

                    spellButton.addEventListener("click", () => {
                        kouzla.innerHTML = "";

                        const nameElement = document.createElement("p");
                        nameElement.textContent = "Název: " + spell.name;

                        const typeElement = document.createElement("p");
                        typeElement.textContent = "Typ: " + spell.type;

                        const levelElement = document.createElement("p");
                        levelElement.textContent = "Level: " + spell.level;

                        const castTimeElement = document.createElement("p");
                        castTimeElement.textContent = "Vyvolání: " + spell.castTime;

                        const rangeElement = document.createElement("p");
                        rangeElement.textContent = "Dosah: " + spell.range;

                        const componentsElement = document.createElement("p");
                        componentsElement.textContent = "Složky: " + spell.components;

                        const durationElement = document.createElement("p");
                        durationElement.textContent = "Trvání: " + spell.duration;

                        const classElement = document.createElement("p");
                        classElement.textContent = "Povolání: " + spell.class.join(", ");;

                        const descriptionElement = document.createElement("p");
                        descriptionElement.innerHTML = "Popis kouzla: " + spell.description.replace(/\n/g, "<br>");

                        kouzla.appendChild(nameElement);
                        kouzla.appendChild(typeElement);
                        kouzla.appendChild(levelElement);
                        kouzla.appendChild(castTimeElement);
                        kouzla.appendChild(rangeElement);
                        kouzla.appendChild(componentsElement);
                        kouzla.appendChild(durationElement);
                        kouzla.appendChild(classElement);
                        kouzla.appendChild(descriptionElement);
                    });

                    kouzlaButton.appendChild(spellButton);
                });
            }

            function filterSpells() {
                const searchText = searchInput.value.toLowerCase();
                const levelValue = levelFilter.value;
                const classValue = classFilter.value.toLowerCase(); // Konvertujeme na malá písmena pro case-insensitive porovnání
                const typeValue = typeFilter.value.toLowerCase();   // Konvertujeme na malá písmena pro case-insensitive porovnání
            
                const filteredSpells = spellsArray.filter(spell => {
                    const matchesSearch = spell.name.toLowerCase().includes(searchText);
                    const matchesLevel = levelValue === "" || spell.level == levelValue;
                    const matchesClass = classValue === "" || spell.class.some(c => c.toLowerCase().includes(classValue)); 
                    const matchesType = typeValue === "" || spell.type.toLowerCase().includes(typeValue); 
                    return matchesSearch && matchesLevel && matchesClass && matchesType;
                });
            
                createSpellButtons(filteredSpells); // Zobrazí filtrovaná kouzla
            }

            // Zobrazí všechna kouzla při načtení stránky
            createSpellButtons(spellsArray);

            // Filtry
            searchInput.addEventListener("input", filterSpells);
            levelFilter.addEventListener("change", filterSpells);
            classFilter.addEventListener("change", filterSpells);
            typeFilter.addEventListener("change", filterSpells);
        })
        .catch(error => console.error("Error fetching JSON spells:", error));
        
    });


