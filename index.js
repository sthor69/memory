var valoreCarta = [];
var turno = "NOK";
var i = 0;
var numselected = 0;
var selected = [];
var point = [0, 0, 0];

window.addEventListener('load', function() {
	
	// mescola le carte
	mescola();
	
	// permette di partire con il gioco cliccando su START
	document.querySelector('div.popupstart > button').addEventListener('click', function() {
		document.querySelector('div.popupstart').style.display = "none";
		document.querySelector('div.player1').style.visibility = "visible";
		document.querySelector('div.player2').style.visibility = "visible";
		document.querySelector('div.popupchoose').style.visibility = "visible";
		
		refresh();
		
		document.querySelector('div.popupchoose > button').addEventListener('click', function() {
			if (i % 2 == 0) {
				turno = 1;
			} else {
				turno = 2;
			}
			msg = 'é uscito il ' + i + '; inizia il giocatore ' + (turno == 1 ? 1 : 2);
			document.querySelector('div.player' + (turno == 1 ? 2 : 1)).style.visibility = "hidden";
			document.querySelector('p.value').innerHTML = msg;
			document.querySelector('div.popupchoose > button'). addEventListener('click', function() {
				document.querySelector('div.popupchoose').style.visibility = "hidden";
			});
		});
	});
	
	
	// mette un event listener su tutte le carte del gioco
	
	// prima ricava tutti gli elementi HTML che hanno la classe "carta"
	carte = document.querySelectorAll('td');
	
	// poi su ognuno di essi aggiunge l'event listener: quando si accorge del click
	// lancia la funzione 'cliccato'
	for (carta of carte) {
		carta.addEventListener('click', cliccato);
	}
});

// questa è la funzione lanciata quando viene fatto il click su una freccia
// il parametro passato è l'evento 'click', da cui si può ricavare qual è l'elemento
// su cui è stato fatto il click
cliccato = function cliccato(e) {
	if (numselected < 2) {
		
		// prima ricavo la classe del genitore dell'immagine (cioè la freccia) cliccata
		// il genitore dell'immagine è il td della tabella
		var className = e.currentTarget.className;
		
		e.currentTarget.innerHTML = '<img src="img/' + className + '.jpg"></img>';
		selected[numselected] = className;
		numselected++;
	}
	
	if (numselected == 2) {
		if (parseInt(selected[0]) == parseInt(selected[1]) + 7 || parseInt(selected[1]) == parseInt(selected[0]) + 7) {
			point[turno]++;
			document.querySelector('span.player' + turno).innerHTML = point[turno];
			numselected = 0;
			if (point[1] + point[2] == 7) {
				document.querySelector('div.player1').style.visibility = "visible";
				document.querySelector('div.player2').style.visibility = "visible";
				if (point[1] > point[2])
					winner = 1;
				else
					winner = 2;
				document.querySelector('div.popupwinner').style.visibility = "visible";
				document.querySelector('p.winner').innerHTML = "IL GIOCATORE " + winner;
				document.querySelector('p.winner').style.color = "red";
				document.querySelector('div.popupwinner > button').addEventListener('click', function() {
					location.reload();
				});
			}
		} else {
			document.querySelector('div.player' + turno).style.visibility = "hidden";
			turno = turno == 1 ? 2 : 1;
			document.querySelector('div.player' + turno).style.visibility = "visible";
			
			setTimeout(function() {
				document.querySelector('td[class="' + selected[0] + '"]').innerHTML = '<img src="img/dorso.jpg">';
				document.querySelector('td[class="' + selected[1] + '"]').innerHTML = '<img src="img/dorso.jpg">';
				numselected = 0;
			}, 1000);
		}
	}
}

function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
// questa funzione mescola le carte dei due giocatori
function mescola() {
	
	// definisco un array con tutte le carte ancora da mettere in gioco
	var indexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];	
	
	// estraggo dalla pagina web tutte le carte (td con classe = 'carta')
	carte = document.querySelectorAll('td');
	
	// ripeto per i che va da 15 a 0
	for (let i = 13; i >= 0; i--) {
		
		// assegno a idx un valore casuale da 0 a i
		let idx = Math.floor(Math.random() * i);
		
		// metto nella cella i-esima la carta con indice idx
		valoreCarta[i] = indexes[idx];
		carte[i].classList.add(indexes[idx]);
		
		// tolgo la carta idx dall'array di tutte le carte ancora da assegnare
		let remove = indexes.indexOf(indexes[idx]);
		indexes.splice(remove, 1);
	}
}

// cambia continuamente il valore per scegliere che inizia
function refresh() {
	
	if (turno == "NOK"){
		document.querySelector('p.value').innerHTML = i;
		i++;
		setTimeout(refresh, 100);
	}
}