#!/usr/bin/env bash

ruby -rjson -ryaml -e "puts 'trips = ' + YAML.load_file('trips.yml').to_json" > public/trips.js
