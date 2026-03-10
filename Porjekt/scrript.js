/*
JAVASCRIPT FÖR PULSEHOME HEMSIDAN

Denna fil innehåller all interaktivitet för Pulsehome företagshemsida.
JavaScript körs efter att DOM är laddad för att säkerställa att alla element finns tillgängliga.

IMPLEMENTERADE FUNKTIONER:
1. LIKE-SYSTEM: Interaktiva gillningsknappar på tjänstekort
2. FÄRGVÄXLARE: Tema-byte funktion för demonstration av JavaScript-styling
3. MOBILMENY: Toggle-logik för responsiv navigation

TEKNISKA DETALJER:
- Event listeners kopplas till DOM-element via querySelector/querySelectorAll
- Null-checks används för att förhindra fel om element saknas
- ClassList API används för att toggla CSS-klasser
- Style manipulation för dynamiska färgändringar
- parseInt() för säker nummerhantering i räknare
*/

document.addEventListener('DOMContentLoaded', () => {
    // DOMContentLoaded säkerställer att HTML är helt laddad innan JS körs
    // Detta förhindrar fel där JS försöker komma åt element som ännu inte finns

    // === 1. LIKE-SYSTEM FÖR TJÄNSTEKORT ===
    /*
    SYFTE: Tillåter användare att interagera med tjänstekort genom gillningsfunktion

    IMPLEMENTATION:
    - querySelectorAll('.like-btn') hittar alla gillningsknappar på sidan
    - forEach-loop binder click-event till varje knapp
    - Event handler togglar 'active'-klass och uppdaterar räknare

    TEKNISKA DETALJER:
    - Nullish coalescing (||) skapar count-span om den inte finns
    - parseInt() med || 0 hanterar fall där text inte är ett giltigt nummer
    - classList.add/remove för CSS-styling av aktivt tillstånd
    - innerText uppdaterar räknarens display-värde

    ANVÄNDNING: Kopplat till tjänstekort i cards-sektionen för användarengagemang
    */
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 'this' refererar till den specifika knapp som klickades
            // querySelector('.count') letar efter räknarelement inuti knappen
            const countSpan = this.querySelector('.count') || this.appendChild(Object.assign(document.createElement('span'), {className: 'count'}));

            // parseInt() konverterar text till nummer, || 0 hanterar NaN-fall
            let currentCount = parseInt(countSpan.innerText) || 0;

            // Toggle-logik: Om knappen är aktiv, ta bort gillning; annars lägg till
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                countSpan.innerText = currentCount - 1;
            } else {
                this.classList.add('active');
                countSpan.innerText = currentCount + 1;
            }
        });
    });

    // === 2. FÄRGVÄXLARE/TEMA-BYTARE ===
    /*
    SYFTE: Demonstrerar JavaScript's förmåga att dynamiskt ändra sidans styling

    IMPLEMENTATION:
    - getElementById() hittar tema-växlingsknappen via dess ID
    - Boolean flag (isOriginal) spårar aktuellt tema-tillstånd
    - Click-event togglar mellan två fördefinierade teman

    TEKNISKA DETALJER:
    - document.body.style.backgroundColor ändrar sidans bakgrundsfärg
    - colorBtn.style.background ändrar knappens färg
    - innerText uppdaterar knappens text för användarfeedback
    - !isOriginal inverterar boolean-värdet för nästa iteration

    TEMAN:
    - Original: Svart bakgrund (#000000), vit knapp
    - Alternativ: Midnattsblå bakgrund (#1a1a2e), mintgrön knapp (#4ecca3)

    ANVÄNDNING: Placerad i hero-sektionen för att visa JavaScript-styling förmågor
    */
    const colorBtn = document.getElementById('colorChangeBtn');
    if (!colorBtn) return; // Early return om knappen saknas (felhantering)
    let isOriginal = true; // Boolean flag för att spåra tema-tillstånd

    colorBtn.addEventListener('click', () => {
        if (isOriginal) {
            // Växlar till det alternativa temat
            document.body.style.backgroundColor = "#1a1a2e"; // Midnattsblå bakgrund
            colorBtn.style.background = "#4ecca3"; // Mintgrön knappfärg
            colorBtn.innerText = "Återställ tema";
        } else {
            // Återställer till originaltemat
            document.body.style.backgroundColor = "#000000"; // Svart bakgrund
            colorBtn.style.background = "white"; // Vit knappfärg
            colorBtn.innerText = "Byt färgtema (JS)";
        }
        isOriginal = !isOriginal; // Inverterar flag för nästa klick
    });

    // === 3. MOBILMENY TOGGLE-LOGIK ===
    /*
    SYFTE: Hanterar visning/döljning av mobil navigation på små skärmar

    IMPLEMENTATION:
    - querySelector() hittar hamburger-knappen och nav-panelen
    - Click-event på knappen togglar panelens synlighet
    - display: flex/none växlar mellan synlig och dold

    TEKNISKA DETALJER:
    - Null-checks förhindrar fel om element saknas
    - navPanel.style.display kontrollerar aktuellt display-tillstånd
    - Ternary operator (? :) för kompakt villkorslogik
    - display: 'flex' visar panelen, display: 'none' döljer den

    RESPONSIV DESIGN:
    - Hamburger-knappen är endast synlig på skärmar < 768px (CSS media query)
    - Mobilpanelen är fixerad och täcker hela skärmbredden när aktiv
    - Samma länkar som desktop-navigation men vertikalt arrangerade

    ANVÄNDNING: Aktiveras när användare klickar på hamburger-ikonen i headern
    */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navPanel = document.querySelector('.mobile-nav-panel');
    if (!menuBtn || !navPanel) return; // Early return om element saknas

    menuBtn.addEventListener('click', () => {
        // Kontrollerar om panelen redan är synlig genom att kolla display-värdet
        const isShown = navPanel.style.display === 'flex';
        // Toggle: Om synlig → dölj, om dold → visa
        navPanel.style.display = isShown ? 'none' : 'flex';
    });
});