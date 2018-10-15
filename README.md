# OblivionCompletionList

## Možda je glupo, ali lijepo izgleda

Korišten vue.js i neki vue-resource i neki v-masonry, nemam pojma trebate li
išta za gledanje.

tl;dr kod je užasan, ali radi. Počistim to malo, CSS je na sve strane,
a komentara nigdje.

## Ali što je ovo uopće?

Jedna velika "to-do" lista zapravo. Krenuo sam igrat Oblivion prije koji dan,
igru iz svog milenog djetinjstva. Dosta je dobro i želim obaviti sve što se nudi
(ili barem što više) pa sam drpio nečiju čeklistu i napravio od nje web-app.

## I kako funkcionira?

Eh, prijeđete mišem preko stavke i pojavi se ona neka "Complete" tipka u uglu.
Klikom na to se stavka obilježava kao završena ili obratno. Također, u gornjem
desnom kutu cijele stranice imate dvije veoma nezanimljive tipke.

"Toggle Completed" sakriva s liste sve stavke koje su označene kao završene.
I obratno.

"Toggle Editing" je možda malko zanimljivija stvar. Uključuje, ne biste
vjerovali, mod za uređivanje cijelog tog spisa.

## Što mogu uređivati?

3 su razine spiska. 1. razina je ovo što piše "Main Cities", to je velika
grupacija ovih fensi kategorija. 2. razina su fensi kategorije, "Anvil",
"Bravil", "Bruma" itd. 3. razina su pojedinačne stavke u kategorijama. Sve je
modularno. Sve se može i dodavati i brisati.

## Jesu li podatci spašeni?

Ajmo reći. Sve ide na moj Firebase. Mogao bih napraviti i registraciju korisnika
tako da može više ljudi imati različite tablice, ali nije da imam koristi od
toga.

Slobodno možete šarati u svrhu isprobavanja, imam spremljen back-up.

I da, znam da stvari mogu imati custom border koji je možda elegantnije rješenje
za ovako kičasti dizajn, vjerojatno ću promijeniti na to u svrhu dosezanja višeg
stadija modularnosti.

I znam da sam trpao "id" svemu umjesto klase. Treba to sve urediti i pobacati u style.css.
