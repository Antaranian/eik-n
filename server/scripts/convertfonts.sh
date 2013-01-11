#!/usr/local/bin/fontforge
Open($1);
fontName=$1:r;
Generate(fontName+".svg");
Generate(fontName+".ttf");
Generate(fontName+".woff");
Quit(0);