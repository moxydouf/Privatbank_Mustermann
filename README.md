# Börsenspiel  

## Übersicht  

Dieses Projekt ist ein kleines „Serious Game“, das für eine Bank entwickelt wurde, um Benutzer spielerisch über die Grundlagen und Risiken des Aktienhandels aufzuklären. Das Spiel simuliert eine Börsenumgebung, in der Benutzer den Aktienhandel erleben können, einschließlich der Möglichkeit eines Marktcrashs.  

## Funktionen  

### Benutzer-Authentifizierung  

- **Registrierung**: Benutzer können ein Konto erstellen, um am Spiel teilzunehmen.  
- **Login**: Benutzer können sich anmelden, um auf ihr Konto zuzugreifen und ihre Handelsaktivitäten fortzusetzen.  
- **Logout**: Benutzer können sich abmelden, wodurch ihre Sitzung gelöscht und ihre Details aus dem lokalen Speicher entfernt werden.  

### Handelsfunktionen  

- **Depot-Bestände**: Zeigt das aktuelle Spielgeld-Guthaben des Benutzers, den aktuellen Gewinn/Verlust, die aktuellen Depotbestände und die Anzahl der gehaltenen Aktien.  
- **Übersicht der Aktienkurse**: Zeigt die Preise der zehn handelbaren Aktien.  
- **Detaillierte Aktienansicht**: Bietet detaillierte Informationen zu einer Aktie, einschließlich der Preise der letzten zehn Tage.  
- **Orderbuch**: Zeigt alle vom Benutzer getätigten Käufe und Verkäufe an.  

### Börsencrash-Simulation  

- **Marktvolatilitäts-Warnung**: Wenn der Markt volatil wird und das Risiko eines Crashs besteht, wird eine Warnung auf dem Bildschirm angezeigt.  
- **Benutzerentscheidung**: Die Warnung bietet Schaltflächen für Benutzer, um entweder ihre Aktien zu verkaufen oder sie zu behalten, sodass sie während der Marktvolatilität strategische Entscheidungen treffen können.  

## Tech-Stack  

### Frontend  

- **React**: Eine JavaScript-Bibliothek zur Erstellung von Benutzeroberflächen.  
- **TypeScript**: Eine Obermenge von JavaScript, die statische Typen hinzufügt.  

### Backend  

- **PHP**: Eine serverseitige Skriptsprache.  
- **MySQL**: Ein relationales Datenbankverwaltungssystem.  
- **XAMPP**: Ein kostenloses und Open-Source-Cross-Plattform-Webserver-Lösungspaket, das hauptsächlich aus dem Apache HTTP Server, der MariaDB-Datenbank und Interpretern für Skripte in den Sprachen PHP und Perl besteht.  

### Befehle  

- **Entwicklungsserver starten**: `npm run dev` oder `yarn dev`  
- **Für Produktion bauen**: `npm run build` oder `yarn build`  
- **Produktionsserver starten**: `npm start` oder `yarn start`  

## Erste Schritte  

### Voraussetzungen  

- Node.js  
- npm oder yarn  
- XAMPP  

### Installation:  

1. Repository klonen:  
 ```sh
git clone https://github.com/moxydouf/Privatbank_Mustermann.git
   ```
2. Zum Frontend-Verzeichnis des Projekts wechseln:  
 ```sh
cd frontend
```
3. Abhängigkeiten installieren:  
 ```sh
npm install --legacy-peer-deps
```
4. XAMPP einrichten:  
- XAMPP von Apache Friends herunterladen und installieren.  
- Apache und MySQL über das XAMPP-Kontrollpanel starten.  
  - Gehe zu **C:\xampp\htdocs** auf deinem Laptop und füge den Ordner **"Backend"** hinzu.  
  - Gehe zu **http://localhost/** in deinem Browser.  
      - Gehe zu **"PhpMyAdmin"**.  
      - Erstelle eine neue Datenbank und nenne sie **„bank_game“**.  
      - Gehe dann zu **"Import"** und importiere die Datei **„bank_game.sql“**.  

### Anwendung ausführen:  

1. Entwicklungsserver starten:  
```sh
npm run dev
```
oder  
```sh
yarn dev
```
2. Öffne deinen Browser und navigiere zu **http://localhost:3000**.  

## Projektstruktur  

- **components**: Enthält wiederverwendbare UI-Komponenten wie Schaltflächen, Navigationsmenüs und aktienbezogene Komponenten.  
- **hooks**: Benutzerdefinierte Hooks zur Verwaltung von Authentifizierung und anderen zustandsbehafteten Logiken.  
- **utils**: Dienstprogramme für verschiedene Berechnungen und Formatierungen.  
- **types**: TypeScript-Typen zur Definition der Struktur der in der Anwendung verwendeten Daten.  

## Mitwirkende  

Wir begrüßen Beiträge aus der Community! Wenn du beitragen möchtest, folge bitte diesen Schritten:  

1. Forke das Repository.  
2. Erstelle einen neuen Branch (`git checkout -b feature/DeinFeature`).  
3. Committe deine Änderungen (`git commit -m 'Feature hinzufügen'`).  
4. Pushe den Branch (`git push origin feature/DeinFeature`).  
5. Erstelle eine Pull-Request.  

## Authentifizierung  

Die Anwendung verwendet eine einfache Authentifizierung ohne Sitzungen oder Tokens. Benutzerdaten werden im lokalen Speicher gespeichert, um den Anmeldestatus beizubehalten. Wenn sich ein Benutzer anmeldet, werden seine Details im lokalen Speicher gespeichert, und wenn er sich abmeldet, werden sie gelöscht.  

## Geschützte Routen  

Die Handelsroute ist geschützt, um sicherzustellen, dass nur authentifizierte Benutzer darauf zugreifen können. Wenn ein Benutzer nicht angemeldet ist, wird er zur Anmeldeseite weitergeleitet.  

## Börsensimulation  

Das Spiel simuliert den Aktienhandel mit folgenden Funktionen:  

- **Aktienkurs-Updates**: Aktienkurse werden in regelmäßigen Abständen aktualisiert, mit einer kleinen Wahrscheinlichkeit eines Marktcrashs.  
- **Marktcrash-Warnung**: Wenn ein Marktcrash bevorsteht, wird eine Warnung angezeigt, die es dem Benutzer ermöglicht, zu entscheiden, ob er seine Aktien verkaufen oder behalten möchte.  
- **Handelsaktionen**: Benutzer können Aktien kaufen und verkaufen, wobei ihre Aktionen in ihren Depotbeständen und im Orderbuch widergespiegelt werden.  

## Fazit  

Dieses Projekt bietet eine lehrreiche und interaktive Möglichkeit für Benutzer, den Aktienhandel und die damit verbundenen Risiken kennenzulernen. Durch die Simulation einer Börsenumgebung können Benutzer die Dynamik des Handels erleben und strategische Entscheidungen während der Marktvolatilität treffen.
