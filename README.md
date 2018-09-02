# Cuanto Falta Para

Hace algunos años, para irme de viaje con un cuate, hice una página de internet donde mostraba
un contador que se actualizaba cada segundo. Estaba contando cuánto tiempo faltaba para que 
nuestro vuelo saliera. Originalmente surgió para estresar a mi cuate y darle un poco de drama
al tiempo faltante. Sí funcionó muy bien para eso, pero también me di cuenta que de repente es
útil saber cuánto tiempo falta para un vuelo o cosas así. Por eso, ahora rehice este sistema
para poder llevar registro de cuánto falta para varios eventos a la vez.

## Instalación
Una vez que tienes el repo instalado en tu máquina, lo único que necesitas para hacer
modificaciones es sass (todo lo demás está en html y js planito). Yo uso el sass en ruby, pero
también hay uno en node. Si tienes eso instalado, basta con correr en tu terminal el comando

```bash
make watch
```

y eso va a correr un proceso indefinidamente que actualiza el css cada que se detecta un cambio.

Nota: las tipografías que uso son de paga de mi foundry favorita: [Hoefler & Co.][1]. Se las
recomiendo montones.

## Actualizar viajes
Yo tengo un serversito corriendo nginx que sirve [esta página][2], al cual me conecto por ssh. 
Lo tengo configurado de manera que con correr:

```bash
make sync
```

actualiza el archivo de `trips.json` que es donde guardo los datos de los viajes.


[1]: https://typography.com
[2]: https://cuantofaltaparairnos.com

