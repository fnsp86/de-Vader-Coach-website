#!/bin/bash
set -e
cd "$(dirname "$0")"

echo "=== Generating all HTML files ==="
node md-to-html.mjs aanwezig-vaderschap.md aanwezig-vaderschap.html '#667eea' 'Aanwezig Vaderschap' 'Aanwezigheid'
node md-to-html.mjs emotiecoaching-voor-vaders.md emotiecoaching-voor-vaders.html '#EF4444' 'Emotiecoaching voor Vaders' 'Emotiecoaching'
node md-to-html.mjs zelfregulatie-als-vader.md zelfregulatie-als-vader.html '#34D399' 'Zelfregulatie als Vader' 'Zelfregulatie'
node md-to-html.mjs grenzen-stellen-met-liefde.md grenzen-stellen-met-liefde.html '#FBBF24' 'Grenzen Stellen met Liefde' 'Grenzen'
node md-to-html.mjs autonomie-en-loslaten.md autonomie-en-loslaten.html '#A78BFA' 'Autonomie en Loslaten' 'Autonomie'
node md-to-html.mjs herstel-na-conflict.md herstel-na-conflict.html '#FB923C' 'Herstel na Conflict' 'Herstel'
node md-to-html.mjs verbinding-met-je-tiener.md verbinding-met-je-tiener.html '#60A5FA' 'Verbinding met je Tiener' 'Verbinding'
node md-to-html.mjs reflectief-vaderschap.md reflectief-vaderschap.html '#C084FC' 'Reflectief Vaderschap' 'Reflectie'
node md-to-html.mjs opvoeden-bij-gedragsproblemen.md opvoeden-bij-gedragsproblemen.html '#F97316' 'Opvoeden bij Gedragsproblemen' 'Gedrag'
node md-to-html.mjs vaderschap-na-scheiding.md vaderschap-na-scheiding.html '#3B82F6' 'Vaderschap na Scheiding' 'Scheiding'
node md-to-html.mjs snelgids-8-vadervaardigheden.md snelgids-8-vadervaardigheden.html '#F59E0B' 'De 8 Vadervaardigheden' 'Snelgids'

echo "=== Generating all PDF files ==="
node html-to-pdf.mjs aanwezig-vaderschap.html aanwezig-vaderschap.pdf '#667eea' 'Aanwezigheid' 'Aanwezig Vaderschap' eye
node html-to-pdf.mjs emotiecoaching-voor-vaders.html emotiecoaching-voor-vaders.pdf '#EF4444' 'Emotiecoaching' 'Emotiecoaching voor Vaders' heart
node html-to-pdf.mjs zelfregulatie-als-vader.html zelfregulatie-als-vader.pdf '#34D399' 'Zelfregulatie' 'Zelfregulatie als Vader' waves
node html-to-pdf.mjs grenzen-stellen-met-liefde.html grenzen-stellen-met-liefde.pdf '#FBBF24' 'Grenzen' 'Grenzen Stellen met Liefde' shield
node html-to-pdf.mjs autonomie-en-loslaten.html autonomie-en-loslaten.pdf '#A78BFA' 'Autonomie' 'Autonomie en Loslaten' sprout
node html-to-pdf.mjs herstel-na-conflict.html herstel-na-conflict.pdf '#FB923C' 'Herstel' 'Herstel na Conflict' refreshcw
node html-to-pdf.mjs verbinding-met-je-tiener.html verbinding-met-je-tiener.pdf '#60A5FA' 'Verbinding' 'Verbinding met je Tiener' handshake
node html-to-pdf.mjs reflectief-vaderschap.html reflectief-vaderschap.pdf '#C084FC' 'Reflectie' 'Reflectief Vaderschap' brain
node html-to-pdf.mjs opvoeden-bij-gedragsproblemen.html opvoeden-bij-gedragsproblemen.pdf '#F97316' 'Gedrag' 'Opvoeden bij Gedragsproblemen' shield
node html-to-pdf.mjs vaderschap-na-scheiding.html vaderschap-na-scheiding.pdf '#3B82F6' 'Scheiding' 'Vaderschap na Scheiding' heart
node html-to-pdf.mjs snelgids-8-vadervaardigheden.html snelgids-8-vadervaardigheden.pdf '#F59E0B' 'Snelgids' 'De 8 Vadervaardigheden' shield

echo "=== Done ==="
echo "Copying to Downloads..."
cp *.pdf ~/Downloads/
echo "All PDFs copied to Downloads"
