watch:
	sass --watch styles:public --style compressed
sync:
	scp public/trips.json aetna:/sites/cuantofaltaparairnos.com/public
