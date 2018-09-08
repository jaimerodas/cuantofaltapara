watch:
	sass --watch styles:public --style compressed
install:
	bin/process_trips.sh
sync:
	scp public/trips.js aetna:/sites/cuantofaltaparairnos.com/public
upgrade:
	ssh aetna "cd /sites/cuantofaltaparairnos.com && git pull"
