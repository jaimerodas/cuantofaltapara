watch:
	sass --watch styles:public --style compressed
sync:
	scp public/trips.json jaime@cuantofaltaparairnos.com:/sites/cuantofaltaparairnos.com/public
