#!/usr/local/bin/fontforge
Print("Opening "+$1);
Open($1);
fontName=$1:r; 
Print("Saving "+fontName+".svg");
Generate(fontName+".svg");
Generate(fontName+".ttf");
Generate(fontName+".woff");
Quit(0);