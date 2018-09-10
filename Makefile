watch:
	sass --watch styles:public --style compressed
install:
	ruby -rjson -ryaml -e "puts 'trips = ' + YAML.load_file('trips.yml').to_json" > public/trips.js
sync: install
	scp public/trips.js aetna:/sites/cuantofaltaparairnos.com/public
upgrade:
	ssh aetna "cd /sites/cuantofaltaparairnos.com && git pull"
