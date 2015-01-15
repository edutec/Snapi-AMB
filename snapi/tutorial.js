IDE_Morph.prototype.originalOpenIn = IDE_Morph.prototype.openIn;
IDE_Morph.prototype.openIn = function(world) {
	this.originalOpenIn(world);
	if (location.hash.substr(0, 9) === '#tutorial' && ! world.tutorialWasShown) {
		world.tutorialWasShown = true;
		this.startTutorial(world);
	}
}

IDE_Morph.prototype.startTutorial = function(world) {
	var morph,
		image,
		myself = this;

	if (!this.tutorial) { 
		this.tutorial = {};
		this.tutorial.slides = [];
		this.tutorial.currentIndex = 0;

		this.tutorial.addSlide = function(slide) {
			this.slides.push(slide);
		};

		this.tutorial.previous = function() {
			this.currentSlide.cancel();
			this.currentIndex--;
			this.currentSlide = this.slides[this.currentIndex];
			if (this.currentIndex == 0) {
				this.currentSlide.previousButton.disable();
			}
			this.currentSlide.popUp(world);
		};
		this.tutorial.next = function() {
			this.currentSlide.cancel();
			this.currentIndex++;
			this.currentSlide = this.slides[this.currentIndex];
			if (this.currentIndex == this.slides.length - 1) {
				this.currentSlide.nextButton.disable();
			}
			this.currentSlide.popUp(world);
		};
		
		this.tutorial.startIn = function(world) {
			this.currentSlide = this.slides[0]
			this.currentSlide.popUp(world);
		};
	} 

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Benvinguts a Snapi!', //title
			null, // pic
			  'Aquest tutorial us ensenyarà els conceptes bàsics\n' //msg
			+ 'per construïr les vostres pròpies aplicacions en\n'
			+ 'Snapi!.\n\n'
			+ 'Si voleu visitar-lo en un futur, podeu fer-ho\n'
			+ 'escollint "Tutorial" dins el menú d\'arxiu.',
			null, // popUpPosition
			null, // arrowOrientation ('left' / 'right')
			null, // previousWindow function
			function() { myself.tutorial.next() } // nextWindow function
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Què és Snapi?', 
			null, 
			  'Snapi és una extensió del llenguatge i entorn de\n'
			+ 'programació Snap!, desenvolupat per la Universitat\n'
			+ 'de Berkeley, California.\n\n'
			+ 'Aquesta extensió està concebuda perquè tothom pugui\n'
			+ 'treballar amb dades obertes provinents de serveis\n'
			+ 'públics d\'Internet.\n\n'
			+ 'En aquest cas, treballarem amb les dades obertes que\n'
			+ 'l\'Àrea Metropolitana de Barcelona (AMB) proporciona\n'
			+ 'de forma gratuïta i lliure per a l\'ús de la ciutadania.',
			null,
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Importem la llibreria d\'AMB', 
			null, 
			  'Cliqueu en aquest menú (Arxiu) i seleccioneu l\'opció\n'
			+ '"APIs...", al final de tot.\n\n'
			+ 'Seguidament, seleccioneu la llibreria "AMB Barcelona OpenData".',
			new Point(150, 18),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Categories de blocs', 
			null, 
			  'En Snap! (i, per tant, en Snapi!), programem encaixant\n'
			+ 'blocs que realitzen accions.\n\n'
			+ 'Aquesta caixa mostra les diferents categories de blocs\n'
			+ 'de què disposem.\n\n'
			+ 'Seleccioneu la categoria "Api".',
			new Point(100, 114),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'L\'API d\'OpenData de l\'AMB', 
			null, 
			  'Fixeu-vos que, important la llibreria d\'AMB, hem\n'
			+ 'obtingut uns quants blocs per interactuar amb\n'
			+ 'aquesta API.\n\n'
			+ 'Mitjançant aquests blocs, podem accedir a totes les\n'
			+ 'dades que aquest servei de l\'AMB proporciona.',
			new Point(195, 280),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Els blocs de l\'AMB', 
			morph,
			  'Arrossegueu aquest bloc cap a l\'àrea gris buida del\n'
			+ 'centre de la pantalla, etiquetada com a "Programes".',
			new Point(195, 345),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Demanar dades', 
			null, 
			  'Si cliqueu sobre el bloc que acabeu d\'arrossegar\n'
			+ 'veureu que aquest s\'il·lumina de color blau cel i,\n'
		    + 'passats uns instants, rebem la resposta que l\'API\n'
			+ 'de l\'AMB ens ha retornat dins una bafarada de text.',
			this.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Inspeccionar dades', 
			null, 
			  'Com us haureu imaginat, tractar amb tantes dades\n'
			+ 'mitjançant aquest mètode no és gens còmode.\n\n'
			+ 'És per això que utilitzem una eina anomenada\n'
			+ '"inspector".\n'
			+ 'Per inspeccionar les dades que retorna aquest bloc\n'
			+ 'de "tots els municipis", cliqueu-hi amb el botó\n'
			+ 'dret del ratolí i seleccioneu "inspecciona JSON".',
			this.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Conèixer l\'inspector', 
			null, 
			  'La columna esquerra de l\'inspector ens mostra les\n'
			+ 'propietats de l\'element actual. Si l\'element actual, com\n'
			+ 'és el cas, és una llista d\'elements, ens mostrarà els seus\n'
			+ 'índex numèrics.\n\n'
			+ 'Proveu de seleccionar alguns d\'aquests índex i fixeu-vos\n'
			+ 'com, a la columna dreta de l\'inspector, hi trobem els\n'
			+ 'continguts de cada element. En aquest cas, les dades dels\n'
			+ 'municipis que comprenen l\'AMB.',
			this.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Navegar per les dades', 
			null, 
			  'Si feu doble click sobre un índex, l\'inspector us\n'
			+ 'mostrarà l\'element seleccionat en una nova finestra.\n'
			+ 'Fixeu-vos com, ara, la columna de l\'esquerra mostra\n'
			+ 'els noms de les propietats que componen l\'objecte.\n\n'
			+ 'Per ara, només ens cal recordar que tots els municipis\n'
			+ 'de l\'àrea tenen la propietat "localitzacio", que conté\n'
			+ 'les seves coordenades geogràfiques expressades en\n'
			+ 'latitud i longitud.',
			this.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'El nostre primer programa', 
			null, 
			  'Ara que ja hem explorat una mica les dades dels\n'
			+ 'municipis, és el moment de realitzar un primer programa\n'
			+ 'senzill que ens els mostri sobre un mapa.\n\n'
			+ 'Aquest exercici pot servir de base per, més endavant,\n'
			+ 'realitzar programes més complexes.',
			null,
			null,
			function() { myself.tutorial.previous() },
			function() {
				// We close all inspectors at this point, as they most probably are cluttering the interface
				var inspectors = world.children.filter(function(each) { return each instanceof JsonInspectorMorph });
				inspectors.forEach(function(each) { each.cancel() });

				myself.tutorial.next()
			}
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Mapes', 
			null, 
			  'Començarem seleccionant la categoria de "Mapa", que és on\n'
			+ 'trobem tots els blocs relacionats amb la cartografia.',
			new Point(195, 115),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAUCAYAAADIiLCPAAADnElEQVRYR+2Ye0hTURzHv1ezmVHLZ5Y6nKtMoZpacxahZO+HUFppoUwlioLUkCAKrIiIoDSDXtDcgqCwB/QgrTAjqhU+KkXUuSH2EtNUaFrZvJ1zY7atDe9miIrnr7Nzz+/3+57P+Z677TAgTeMTmQ+WVYBhptHP/zQWKnlHVbrNZ3YGX3pLFQzjUuRIzIiey7JdhI9K3l6Vw2i8IwvAIGtQwQ6AG3PAzOGwOEOgRXTadZg1SR7gxjQwyoM4jiFHkx3UZeMTLAiMQ3PCEOPQxqE5QcCJkGF1muSBEro1GU7IHFkhtqG5uWJBbSneX78HsWIzdGeL4DbdF0FJa7l+9yklmNBghBTkYVr4bHQ36qHPPY7+t/WYnJGE4D1p8Jjhhx9fu9By5Ra6Tl5C9JfKgZV//9qJD9fuQpyZjIrAGHge2IXAlAS4+3ih53Mb9CfOobe45F9SPHTZytVz+xGimsrRrCpGUPIG9HV/Q2POEfx68YZ/bTM1dp0W3VaB6rR9MLa1I/J+Ed4qcmH80oH5N86jOiQWkhIVPqmL0XPrITwS4hGwcxualqdB2liG+gMn8L3kGWDotVg4BffKNwqy1td4t+cQeu+Ugen7NTCHZRhMkM4lNS6gWhJr016D6TIFWeeitWuy8mC4WQqPjSshIhvbsHSrQ7VNk+1DI0U0fgvBsCznEvM+XXhUy3NUzooDfvaBFbhhobYclaIlmLgujgBMgee8MBg+tKKlUDngGhM0Lp//IjDGfk7HpO0JEO9Nx2TRTLi4uoL8buTg2mrWWqx12ctFYWtmyLiaVO+ipqeoCFrsUG1e0EzCTYulQaa+pFSNT8rrf5y2ZS1mpm6CbrXCYucEy+QIP3cMb0LjuXEa+zp8OWR1jy2gRGifoDZzP/oqayGIlUGqPo1XAXJuQ6ybLS3muuzliv6o4dxNj6pH4ioE7kiGNj4VjtQeMjSXMAlCCvMgnBOCrrpG6LOPgm1ohufB3RClbYJAOBW9rW3Q5V9Gj/o2V0985yKE4aHk2RQLaMLcTIh3pXJzmi9ehZufF/xXLEWNdL3D0OzlcifvZD3Z5ODURBjef4Y26zCMFbVwpPag0GyejVE8aO7QoS6D/vfsJ+8QZqiJRnr8f4PGsiz/W46RTmW49NFbDlqLux4CyH0ahMNVe9TVYdFNNNN7xWxex9KZ6x7iYnVMR/Xfr9NRR8m+YF7QaLgj4MYyMMqCNzS+4MY6MMrhNzDv6fLPdAJHAAAAAElFTkSuQmCC';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Comencem a programar', 
			morph,
			  'Arrossegueu aquest bloc cap a l\'àrea gris buida del\n'
			+ 'centre de la pantalla, etiquetada com a "Programes".\n\n'
			+ 'Si voleu, podeu clicar-lo per veure com apareix un mapa\n'
			+ 'a la zona de l\'escenari, que és l\'espai en blanc de la\n'
			+ 'dreta de la pantalla.',
			new Point(95, 145),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Iterar sobre una col·lecció', 
			morph, 
			  'Com que voldrem representar tot el conjunt de municipis,\n'
			+ 'ens caldrà, d\'alguna manera, realitzar una mateixa acció\n'
			+ 'per a tots els elements que el bloc "llistat de municipis"\n'
			+ 'ens ha retornat anteriorment.\n\n'
			+ 'al final de la categoria de control (probablement haureu de\n'
			+ 'desplaçar-vos per la llista amb la rodeta del ratolí) hi\n'
			+ 'trobareu un bloc com el que us mostrem aquí, anomenat\n'
			+ '"per cada element de". Arrossegueu-lo cap a la zona de\n'
			+ 'programes.',
			new Point(190, 40),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAABACAYAAAAeT0WUAAALLklEQVR4Xu2de1QTVx7Hv0OAkMhDFBEQqIgVRav4KKIuasXVtrtyDqio7ar4qHWrR6X1aLv2rI/6qnvU6vZotUcFj7tVqbjraqtt1+K2KrYqWqhv8YWIIBDegZDM3pkYTUImmdAASbj3r5D53Xt/93s/85vf3LlDGJCS5TdgM1g2GQzTnvu7UWGRGlNycYbJYwJfnu0YlcwwLnusqWPXtiyrIPqkxjy5mGLXfraic0xWxwGfgMFCiz5YAZTTgaQvDost5MRaZFGvNmhAYOpfJhiRjAURAZRTg8TpQSJUTEm2bxtkxeKQGXKJYy1aUQMDBciljqGSNFaAwtQEKihMpkWjMFGYmqAAhclmotHIZAcwhX+9G7dfm2mzSW2thihM1sDkJkG/3BN4cOAowpIn4vbf98CtcyeETHid/1y+cTeYiK7o9slytI98EeU38pC3eC00l6+h3cwJ6DpvGuSB/qgrVeD+3gwoNuzE4OILzzxQlpYhf/9/EDZrMs4HD4HvB3MRPCUeHn4dUPOoCHnrt6E2/Xhjj0X4ZaqtmsPfYuCtTNxNTUfI5HFQlVfhRspKNJy5JL5vPW8oTNbARGwHF51H9rR3oS56ggHH9uBy8mKoi0vQ98vtyO42AuHHU1GQlo6ajG8gj49Dl7ffwK3R0xB14ySufbAeyuM/ANW1Br1yQJ3rNBDRhT/hl3kfovbISTCqhmc2LMPANaon6eMzZIePMOmxJb90lYzb4vrOWbgc1YdOQJ4wBqEE+Ouxk6zqW2dMYbIWJiJ+lv8gMCzLRxX9zxwQA++fxoXuI4F6FVipGwbdzMSF0GFw/8NIAtYU+L7UC9X5hbi/dfezKKODiW8v4GUwag3vlezNeIQtmIF2oUFwkUhA1r146EwVY1+M/RJqi4MwKzCa75Pz9+Vbp3A+ZKhVfVOYzCcWgndzuonnqpv6HH4iDQW7D2gjU9LrCJqaiNuvJhuc6dJRMYjcthqXIuL477l2foocjegr3xnA0v/m98idtQSqC7mQjohGVNomnOsSw4NqXCz5JdTW4IdZfDTkLnny8WMR/NZk3IybCmv6pjA1E0wuvcLRbety+PToBsWVG8hbtArs9bvwXfYOQqclQurjjdrCItzevAs1aYd5L8KO7IBPZAQ55mUAk8/iWQibO5W3ubvjH3Dz74CA38ciJ+qPVsMk1JYHyfnyCPxdp45H9YNHuLlwBdTnc2FN3xSmJsJkvprjHdWPaL/Ve5ozCeVMHftrSI7i9I8HbAYTy7Lk2ZzLbwXSGeuL3zXgjKNvypjorgFB1fiIxG9DAch+Jvg0Rd82UYdFORknt6+Lbj8RmHAepoL93TazYJMZmN4cV5/P/Fi43ud31kDjM7bmtM+4+mHW1KG2jqcA4UZBuEkNmpyXwhCQuKhkcXOcNUBRkBwPCht4vIV5uD+sTCgiGXcgBigKkg2mxQGb4CMUiUx0c5wDTp49utyKMHEMcymbjmWnX50QMf/6Wuj0EVHNTkxaASYKj/i5dyytWhim5+IwDRq4lbJwVWjgQjYXMGrxEjurJUuecWtkQEN7F6g6MGBdubXR5gWK3IVZJSdJi4TXmVouZ3ouiqRSA497arjUWzWONmWscQeUL0ig9mpeoDiYyKK+aG0fHQi3F5gYcCDJb9IwJHb2al7UB8r2eaUDwqRNJrlLm/wajUhiQeLsuAhV01Oid8mzLVAGMG0UaHvYaiBmGe+2nUQmwL1IDWm+dkOcLYpG4g7vtbdQtTTUFs3B8+P7NmvLJg49baQu2AX1/iShslBYxh1BSVfNTrhxE6JgGrIcGLrCXmDSRib5DRUkVZYkEX/caWCaQ/Z77UwQHLjak0SnHm7kuPnlAruEqVNCDopy98Gv53g01FXiydn34Vb5M1SyCPgM/Aie/pGoKr6Kip+XQKLMh1/8GTy5moGAvlPx+FCkCVG0InheVjW6a6vr2B3uCeshD+0DZWEeag8thcfjHChHLoZXTBLcvTtCWVqIyuMbIc/NgLLLIMgnboDUNxBlZw/C75UZfDQRsjd2RunXC9KENZCHRKI2/yrq09+Fe9kd3kwXmYRsNIwrZMvOo/zcIfgO/xNKv90OxssfvtEJKP1uO2Q/bIWpuq6KB3w9xTefov3YBWDV9Sg/9jFkl9P5PnVFKMJyd3lV/UzDpPIeiI7R6yD1CiRzkI6AftP5yGRqrlyV2nHql2bPmQIn3Ub+qaVgCo9A03kcOvSZjYr/voZ2Iw9DcXkrXMt+RIPvcHhGvIm6rJkImHgD+ZnvQVJ8nCDTeKutznlTMLFv/wvKM/sgvXIEdeGjIB89H+w2/R2WDGo7vwTfuV9AubI3mPknUJW5E7KrR6HsOwH+k9cZXZoM7Y3FY945iuoTm+Fx539QkhcjpEOnQ7JXu8tTB5NZm/X3ULRrNrmRKEKHBYdRvHsOibbF8OH8WxEJobqeXL0vV8Lj0j9RFzYc7d/YhLqVfQz6FQpNz2FqbOE16hhKcz+HpOgrsIGJCB6+hodJaK5a/DIXmHQLBQcjCBhqaOCOgPHZKDrUG/6JuZC4kYWQp0WlJFHr31Hg4Cs40IO3N12EL3Oyj66jekVfuKjrDKrW9EuCd9w8SP1CwLhoXzLgzlz56puoWt6b2NdD4yqD95rr/PdC9sb+yFZdg0Qqf/Z1Q00lD6k+TJZtXiDm7FP49D+HQqguB2rl0rBnGunnZ5ZyNXOXuc7jr6AwI4q8+EH0YDzQJelXHiahuWp5mAgc979/D65Fx6DuHA+fXtNRnRmvpT17E1zLzxiAw8FkLsvXDcBUAs6fySQyeeRkaCPTmEVgP30VHn/NgSLtz3B7eJGcybHwn/05Kv7SHa7zjqHy5GeQkUimjJoE/0lreZiE7Dno9AvXX81XG8g612kyAYbw60cmSzb68BlHNVN1jYExhkmxagBcq5+YPBfNJeDecV+jJGeHdq6CJiAkdvXzyGRirpoE07CPyN3ch3xVq+/mAiZex+Nf9qFT70lQVjxESRbJmaqyoZL3epoz9YKqRoGSK3vhcm8HH5nMwyS8NFDXKRLSxHWQBfdEbcEtKDOWkJzpV9TELoTvqLf4ASgyd4Hx9INX7zhU7E+BV9LfIPHwRPmZA/AbMxeV73dDbex8k/aqDeQtF73C9eeeuBbtSM6kqlKg4lQqZGe3GUQmMTZCMAnVNQcTO+sgPIIjn1329P21tDSg8hmCTkPWQuLuyedMQf3n8FeVBnkPk3NlFiaB64r+11bDZBkOEb02MtECRRctrdPO4Rctmw8mTkgtUPRxinmoWvJxijV428mzOc5l+qDX3MS1xoNea0CyZNvCuwYMgbLkHD3evDsGbK1vK8CkG4L+5jjbPm+ytUgt257j6tKKMLXsFNHeml8BClPza9xWethCYWorU9184+RfTiXP+BaJgSlFJtWk+ibcVZjy59EXXZNZa3+JgGXTgqbcSW6+8dGWW0MBSzClEOK4lzTNFquAoiBZktNhj5uFiUQkX6GIZDxiUUBRkBwWFDGOm4WJRCV6zy5GRWrDK0BhoiDYTAEKk82kpA1RmCgDNlPAZgm4zTyiDTmsAjZZGnDY0VPHbaqAJZhIZ5pFMinSxC4R2NQ72phDKSACJocaD3W2hRUw/jeE4v9rQQs7SrtzKAXog16Hmi67dpY1v2hp175T5+xOAZoz2d2UOK5DFCbHnTu785zAFEb+x43z/3aK3SnvdA6xrOh/Ku90Y6cDsrUCW3Q/d6H97RTQ306xtcJtoL3n23bFDFbUxjfjhuhGODHSOpWN6M1vVgFFQXIqSMQORjRMXIOigKIgidXe6ez+D3ReI0y9Ze7OAAAAAElFTkSuQmCC';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Encaixar blocs', 
			morph, 
			  'Encaixeu els dos blocs que tenim a l\'àrea de programes, de\n'
			+ 'manera que quedin tal com mostrem.',
			this.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Per cada municipi, realitzem una acció', 
			morph, 
			  'Recupereu el bloc de "llistat de municipis", i encaixeu-lo\n'
			+ 'dins la icona en forma de llista (quadrat amb dos rectangles\n'
			+ 'de color taronja dins).\n\n'
			+ 'Ara mateix, el vostre programa hauria de ser igual que aquest\n'
		    + 'que mostrem.',
			this.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Col·locar els municipis', 
			null, 
			  'Ens calen alguns blocs més d\'aquesta categoria, així que\n'
			+ 'tornem a seleccionar la categoria de "Mapa".',
			new Point(195, 115),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Marcadors', 
			morph, 
			  'Arrossegueu aquest bloc fins a l\'àrea de programació.\n\n'
			+ 'Mitjançant aquest bloc, podem col·locar marcadors al mapa\n'
			+ 'per tal de representar-hi informació geolocalitzada.\n\n'
			+ 'En el nostre cas, hi voldrem representar els municipis\n'
			+ 'que formen l\'àrea metropolitana de Barcelona.',
			new Point(195, 410),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Per cada municipi, afegim un marcador', 
			morph, 
			  'Amb compte, i fixant-vos bé que quedi exactament igual\n'
			+ 'que el que us mostrem aquí, encaixeu aquest bloc dins\n'
			+ 'l\'espai buit del bloc "per cada element de".\n\n'
			+ 'Fixeu-vos que, en Snap!, sempre podem llegir el codi\n'
			+ 'en veu alta per entendre què farà:\n\n'
			+ 'Per cada element de la llista de municipis, afegeix un\n'
			+ 'marcador.\n\n'
			+ 'Ara ens mancarà determinar on hem de col·locar el\n'
			+ 'marcador.',
			myself.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Més blocs per a APIs', 
			null, 
			  'Com que necessitem obtenir dades dels municipis (la\n'
			+ 'seva localització), tornem a la categoria de "Api".',
			new Point(100, 114),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAASCAYAAACKN/pgAAAFj0lEQVRoQ+1ZfVBUVRT/3SVBigElDCYIUTOzFBcTFBRYxEZjlK9wdKwYBBGJxqkZS4yVTykZx74mEEUBCTNHBjF1QExZpvgcjB0oY5hKBEvCIHCIAYq93fdkNxbessM+VnGG/Yfl7Tn3/n7n9865595LIPCJPSKVARJvUCqjFFJCyCwhu+lnDzYClNJuQqAEIQpAVX4wWsn+an/IyH/f/lg6y8xMksMeBj5YqNOzGRIBChQNDKi2f/KOslvtrxH03XSp1ISQcwBxMmTwaZ+HFQHaMkRp0KEYpZJDwAvKZeZMM1L/sMX8MPq63qjsO/KSXptH1cBw/rSlf4C6cJnKC7o3Y/m5qVBmDSf0qEqojVsMf678pr35fRDhGyAqKZsKIRFDaCrgF4tBNH+i8iGx6csTWeFNmAwwYsuhaEKMhITMQOquanBYkiOrEJ/lrpMaN19c5iqo6D9jbLjfxPKZaExF86dIIrEZLgq2dnpPdPLR9pMRANGERgka+/plHMxfb5CgYuMRuTEbWRfDJzSMeP60nOxNd/lr9D4zwu8YOnvuoKgiAeams7E/vBTZ5/fAfs5irFziD0sLa3Td60BJZQZutJbwoNWCPmnhhGCfBNg/tRDtd39FYfkHuHvvZ+wLLUFtwwV4rdiqM2sMJWRv7YxX18bD2soWlcoi+Lht47Nrd0gBPisIgRCmjp4mHnNJRRY8lgWjf+BvFFxNQlsn3yxq+HDfbSyfRaDnPjjYLcJvfzTjrCIR3b2tsLaYi0BvORztFqP9z5soVKRCPa5aycOntgj6CiltKH/1WPw+lTVEXGdkNXICZ6eNCJDtwYGTvlg2LwAbPKKQlu8HiqFhMwJbq+exMzgTKTn3k1staOSmXFQ3nMWNtlIscvCFl3QbMr8ORWpULfKL5Whqu8bOK/4VfHMNJRQTdBqK63louv0NljLsW9bLtcqlLkzcfGcup6Cx5RKec/CB74oIfF64ZYygu/zzUFpzFDc7ajDf1h3uSzcj/8puRG7KYVwL8GNrKRbYrYavazjPdWQ8dPkaRVCgR7DkzjAxR1zYFeRe3ANvlzC0tjeiTJkO53n+WOu6HTazn2ZrlQk7sCCawKkFTdpRgaQTMn5dMpHMQHy4AgnHVw8L7sp4qMYtgfpqlNC6xq2Vice9+Dkfk5ghJapSS9DxMMkz3TFEB3msCeHliD/uMUbQxIjvYGZqroHW19/Lv8jcuMnZMgypdK/BunyNISjASq6upijAIxGPz7TEkoVrcOiLYHT33YY8rAx5l97D710/wMnWDREBH2maCrWgOzedRGXDGf6tXerkx0p0MLIuhGmVMF2iGZqhbwWfQVldLqsKV1hF8WcZGqcl6HiYTpck8xn6guN6eEq3IvP8G4IZWlKVjlt360ZUKYDLviqWoY23ivkMfXllJDKKXtP4p5xYh9ANn0LI1yiC8k2Rjm2L45wViA45iuaWOuQUR/Hzr3kxAj6u9wkr6k7BwtyaCe6JQ19u1AhmY7kAIbIE2M2Zz683hYpkdPa2GFVQDuvmtfthNvMJVLM1dJ17GN7PdNNUAyFMXb1trBuuwdXafHi6hKCrpx0F1xL5l3VkyeS+c2tokHccnrFdhN6+bnxb/xWqfsobfi6Hg+1C3On4hXE9gI57zbx/+CtHYc/sjxTuEPQ1iqDctoUbmDVGRax8Bugrd8b+3dAMNQauyejaJ4pLDH/WEJ1Pi6kP/P/oz5Rwp/hzJwpiMu3FEJpMHOamVqyHuAz5sVWTOazesQzmT+mt/kEq1Rz9cTPxh/MgRQ9bVL2spw20I8DEHAIN1DqcV1vw12emJHcqlN9p3fRHgCuzA4M0TPD6bKQ73yipJDIQdsENIh29T9U/1bSFMSLADuB7CKgSlF1wS1QKoQvu/wAFFcIGKIPYbgAAAABJRU5ErkJggg==';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Valors de propietats', 
			morph, 
			  'Recordeu que tots els municipis contenien diverses\n'
			+ 'propietats, entre les quals ens ha interessat la seva\n'
			+ 'localització geogràfica.\n\n'
			+ 'Per tal de realitzar programes que accedeixin als valors\n'
		    + 'd\'aquesta propietat, utilitzarem el bloc "valor d\'objecte".\n\n'
			+ 'Arrosegueu-lo dins l\'àrea de programes.',
			new Point(128, 215),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAAASCAYAAADR06UUAAAHYklEQVRoQ+1aC1BUVRj+7oKslINC2DJpiBqppbgYqPjioY3kqMCKg2PFIA9BaJyasdREwQclw1SagYuID8IHI+Kar1VTlilFHQ0Gyxy0RDQ1FARFB0y4nXNwt931XtxlQbDZM7PDcuf8j/P93/3//5w9HATGovVyP0DiC57343nIOY7rJTTP+syKQFsQ4Hm+luNQCo7TAM1Fq+eVkr+Gg9P/9+Nv5L2kUslm8jC4LQatMlYE2oIAD6gaG5vnrPmktFYrryPmp+lyuQ3H7QE4t7Yot8pYEbAMAb6iiedD0hJKS6keRkyaKbtLuZLOJuWX885ZtrYXSHrx+ndeIG/Nc9WUOAqvn69oaOQ9aeZkxFyYMWJPVyjfpizIPIi67mwrMYVfTFrWU+N/CeHYRoeXFHaFEFqJ2RWiYLkPpsSx1ReTa/bnFqWPSCYFPclSd6gzlmYB7YLIKQA5ECDvTjsOfZ0doV/XtJvo+7OwknDdkBJ3imG6IqYYy7J8RNGguC1RjkYz/89Tc9ojLuaGwWJi8ljOLcrw1JDe0tdc48bz2wOA50VMfd89PDxQVlZm6fLNljeHmIs+OIzVuZPbREyzHTMSiJm6CVn7I81SYzExwRdxC9M97xqfU0ZN2YDquptQnUiCvZ0jlkYewaa9C9Cn9xCMGjodDj2cUHOvCuqTGbhQqWZOa4n5Sg83KPyT0OdVd9y6/ScKir7A7XuXsThcjTNl+zDBa5bo2y9ETJVKhbi4OJZBMzIyMGPGDGbv4MGDiI2Nxd27dxEVFYW1a9ey53Tu9u3byREZh3Xr1iE8PJw9F8qY0dHRyM7Oho2NDR4/fgwvLy+cO9eyAdNmbDF9Yvb17Yj5TvULEbOPkwdmBCyDU08ZTpaq4D9yNps3PzQf3+aHQgjbqrqLDHv1iSyMGa5AQ+MD5B9bjmvVbHOriwv97uzwBoLHL0Zfl0H46+9y7NIko7a+Ek49+iHYNxGuLkNw684VFGhSoNWrZeRX28IEZYUYaykx2Tkn2fjQHVBPgyziNhVBfguwautEDO8fhMAxsUjNnQIeTU+mcZD1HIy5CiVWbm5JtlpixkzbglNlu3Dh2hEM6jsRE+SzofwhHCmxZ5B7KBEXrx0nQX8s+AYKEdPd3R1ZWVmMWJRIly5dYrL0eWZmJgICAgR1Xb58mRGttrblaEyslBuX9YKCAuTl5bGP/jDWJ2ZfX5+Y72LETAjZAc25HFy8/iOGkRiETU40ILAYthS3vMMrcb7iAN7s64+JXlH4riDsKWLGTc/BkdOZuFJ1GgNkPvAZNhO5R+cjZtpmErN8/FZ5BANdxmKidySLmX5cxWQ7hJhAnWAp72ZjjyURR7Fl/wL4ekag8tZ5FJamw6P/dAR4z4Gz42uQcDYs2No3X0vM5dEnsDzbj/U7NpJuWBapQdLGsU+I603W0SxIJC0IxiSSSqW4f/8+k3FwcEBDQwP7Tp8/ePAAtra2Bvp27tyJhIQElklp1tNmPlOIeefOHfj7+6OwsBDOzs5Mr5g+Mfv6dsR8FyMm7SWTN05g2NlKpFgZe9KAmK1hm6j0QRP/iGGeFFmEZRvHPEXM5KifIbWz1+H1sKGeJRaqd8UmPzQ1i/eoYrIdQUxSr4pENz9BY5LxUncHDHUfh7TvFah9eB2JEYXIOfAZbtT8CjfZSEQFfa1rurXEnDttK06W5bG3b5jbFFL6FcjaF2FQUsSY2VrGpASjpbu8vJyJDx48GGvWrEFgYKCBOldXV+zevZuVZ0oyOl8mk7WaMWtqauDo6IiwsDD2USgUOp1i+sTsC2VMY9/FiPmRIg+FZ7eQanOUVKrpJGMuMSBma9juUK9gGfMt18kYL58F5d4PBTOmujgdV2+f1at+pP0hmbSYZMzzVw+xjPnuqBhkqN7Xya/MnoTwwLUQku0QYrLNj8hxkWtvL8wLzUR5xVlsPhTL7I97Owr+3i0L1pzdhh72ToS445G2faqOeM4OAxHqlwSX3gNYH1OgWYHq+oo2E5P2aZSQEokESqUSQUFBzL5arWbPq6urWR9J+086cnJyEB8fj9TUVNy4cYORl2ZWsYyZlpaGlJQUVvLpHO0oKSmBXC4X1Sdm37jHFPJdjJgU85kBSyHt/jJOkR5zkk8EPleOJNNbqowQtjX118ju/TSOncnFeM9Q1NTdQv7xZJY86NDflNIeM8R3CV6XDUL9w1r8VLITxb/nsN4zhPSYfWXuuFn1B4nZKlTda0kAke9log+Zv74gWlC2Q4hJj4uoYrIBUhFAWyLeicOUprkT3WtX08/albeXsfY4LTHXF1PiKLZ+Ul32piaUBP/3k6QdR2979DPXifacb8qC2tNeZ+p6HsS0t+tJ9gqHkbhh9HNdqilxFFw/z19teMTLdT9JUq/ZJQ5wqs4m53NF0Gqs6yBASNkEPtjgEofWO3btzY7b0hXKetdBzOpJRyNAy3fjIz5C8NqbvnG2IWqW+IEjF4XByY3POTvaUav+/zcC5MfmOvKjcyl4clFY0qwRuij8L3rJEiTVVmSMAAAAAElFTkSuQmCC';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Obtenir la localització d\'un municipi', 
			morph, 
			  'Com hem vist mitjançant l\'inspector, la propietat que\n'
			+ 'conté la localització geogràfica dels municipis es diu\n'
			+ '"localitzacio", que no porta accent perquè, per als noms\n'
			+ 'de les propietats, s\'utilitza l\'alfabet anglosaxó.\n\n'
			+ 'Cliqueu dins la caixa de text del costat de "valor", i\n'
			+ 'escriviu-hi el nom d\'aquesta propietat que volem obtenir,\n'
			+ 'tal com us mostrem.',
			myself.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Obtenir la localització d\'un municipi', 
			morph, 
			  'Ara cal especificar de qui és aquesta propietat que volem\n'
			+ 'obtenir. En el nostre cas, serà de cada un dels elements de\n'
			+ 'la llista de municipis.\n\n'
			+ 'Encaixeu el bloc "cada element", que podeu arrossegar des de\n'
			+ 'dins del bloc "per cada element de llistat de municipis", dins\n'
			+ 'l\'espai que queda en blanc del bloc "valor localitzacio d\'objecte".\n\n'
			+ 'Fixeu-vos bé en la figura que us mostrem.',
			myself.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaAAAABPCAYAAACtUxG6AAAgAElEQVR4Xu2dCVhTR/v27xAgEDZBBFREwQVXxIq4VNxbfX0VX3G31VLRStXPWutX22oV961atXWvitS1KrWtWlyqtCqi4op1wR03RISwh/X855wYTMI5IREIAWauKxcheWb7zZy588zMmSMCCdGO73wPhgmESFSD/b9YYBDa4dWlj3m/E/jwbE3vQJHIZKs+cYzalmFkhE9oh6RLnxt1OWnhKAFKgBKoJARE0TXfWQkRPiuxvHqIUJUTH1U4DFYRMZ5SIi9qQAlQApQAJaCVABGgNimCno9mVB1EqEqLD8uDeEIdXl22p/2KEqAEKAFKoHQERGT6jSldEtUvNpmGE1W/WtMaUwKUACVQtgSoAL0FTypAbwGNRqEEKAFKQIMAFaC36BJUgN4CGo1CCVAClAAVoNL3ASpApWdIU6AEKAFKwKAeUMM/t+Def8ZUeupUgCp9E9IKUAKUgBEQ4BcgMzFaXz+Cx3sOwj1wCO79sBVmzrVQb3Bf7n3q8i0QeTaAx8rZqNG8MVLj7uP+tIUovHoLVmMGo8HE0ZDWdkJOsgzxYeGQLd2I9i8vFlVXnpyCJ7v/gHvQcMS4doT918FwHeEPC0cHZD1PxP3Fa5G9N6I4Hh3KxZdW1q/H0PZuJB6G7kW94f2Rl5qBuM/nID/qiu55q5SGCpAR9FxaBEqAEqj0BAQ9oPaJMbg8eioKEpPwzqGtuBo4DQUvX8Fr3zpc9uiKhhGheLZtL7LCj0Lq3xN1x4/E3V6j4R13Are+Xgx5xCkgM1sNECtC52q1hW/CeVybOBPZv5+AKC+/yIYRiWDq3ZTksR6XG3blhVtSuZSRNNNi8479bDYy9x+BdOD7cCMiedtvmF55K42pAFX6fk8rQAlQAkZAQFiAyIAd7eQDEcNw3ovqe1ZE2safwcVG3YDcPDASM/jcicRFt3dh/t9uRIxGwL5VM2Q+SUD86i1F3oxSgLj0XNpBVFDIIbD8wB/ukz+GlVsdmIjFIPclcULFFzTLolkuobRY4Yqu7cvlyZa33d2/EVOvk155UwEygh5Li0AJUAJVhoBWAVKKgFI42For3zc8sg3PtuxReEBD+6LOqADc6xOo5lFIenRA87XzccWzJ/c5G/d8817wvXFcTWDa3DmJ60FfIu/idUi6+sJ72wqcq9uBEzfNwFcW1XIJpdX+aTTndbHTcdJBveE6bjju9BwFffKmAlRl+j2tCCVACRgBgbcWIJNmDeGxejbsmnhAdiMO96fMBXP7IexnTIDb6ABI7GyRnZCIe99vRta2X7mquv++AXbNPcl3NmoCZDctCO7Bozibhxt2wMzJAS7v+SHWu5/eAiSUlgVZw7pPBLPBqEHIfPwcdz4LQUHMdeiTNxUgI+ixtAiUACVQZQgYdBdcRVJT9ZxKWw66BlRagjQ+JUAJUAJktYWcBVdI1lyq/NEyZSZADMOQs+BMaOehBCgBSoASKB0B3U/DLl0+VSc2PQ276rQlrQklQAlUKAHO8+EeyQCQ5wHBrkJLY8yZM0glxWOfi0QfxWDM7UTLRglQApWGACdAz3Z7fM+ACRSB/4F0uU9EpxMW23XWp1Z2vbPO2PXPfVefONSWEqAEyo8AucZl5BoPrTP8Pn2oYvlhpinrQUBExIf1fkp8IJ0+IkTFR48WoKaUgOEJrCIiRD15w3OnOWoQED3d7Z4i5Plo0tJFhKj40D5GCRg3AdYTqjv8AX2oonE3U7UoHesB0QfSVYumppWkBN4QIB5Qld/5Stvb+AlUoACxusdeA0r9o9eDOgslH8N3oif5YjzNMyMvMV4WiJHD0F3nhm8F7TlKRIWoJS5AXTP2lQdX0wK9ikgFSC9c1LicCFSAAFHB0b0tDctKTo7mO54lxf1cc92LSC2NgoCHeS56SbNgoeNvBSpARtFs1b4QBhagNwOqKL8QZskMTGWFMCGHZov0+wFXJRuOIeewFloC+TVMkOcgAmPKjiaGEaHEfBMczrBCWiEpBA2VkoCtSQH6WmfCyVRxyK+2QAWoJEL0e0MQMKAAvRlIxemFsHhUAJNcQ1SxcuZRSJwQeX0xCmzKX4RYz2d3mk2VEZ+k5/LK2eh6ltqxtkWxGKwIDbdNL9ETogKkJ2xqXi4EDCxAIrDiI71D3R1dWzOrsaoIlc862cGMqjXtVp0FiO1X7HRcP+ss6gHpepFRuwojYCABUiyos9Nu0lvU89GntVlPKKupWGU6rmxFiN1wEE68H82w6NOL+Hqd4plMQu/1qcfb2JqIzLAgOLqoHLqmUd0FiOUUQLwgbRsTqAeka2+iduVJwEACpKiCeWIBJE9Knp/WtcKFYnPYLryLjOluukbRame9JL7M0iqTAr1OJMfVBLlOJa/NMCJz1Bl6E8/3NNQ5+3PZFmBfugqQLgmP67cFmw6O0Wqqi40xCtCmuf9i3KwWWutWVjYlseabglPGaW8pB/sSClSASqJLvzcEAQMJkMIDksblQZxRdtWqMgL0CXle0saBgmAKrIkX1MSMfK99a/bbCND+dCtuy7WuAqT0hto0HIzu7UbDwdYJ6ZkynL0Wjn9iN3LekjJEnNmE9i39YWvtgOS0RERErcWN+Ag1G6WXpYxT18ELg3rMgoOdM6KuHEB335GcB+Ro2wj/8/sari6eePoiDnsjQyDLiOdlRj0gcFuzB9lkUgEqu+GGplQOBHgFqNbAWCRe3w7HpoOQn5OOpLNfwSz9AvIsPWHXdh6snZoj4+VNpF34EmL5Ezj6RyHpZjhcvEbhxf7mPMVUDJzWV/OK7XbLqdkI5gMXQ+rWEvKE+8jePx0WL2Ih7zYNNh2Gwty2JuTJCUiPWA7p9XDI6/pAOmQpJPa1kXL2Fzh2/5jzWoTsNQsjd2wGycAFkNZrjuwnN5G7dyrMUx5wZkoPSMimUGQKyxkxSD23H/ZdPkTysXUQ2TjB3ncgko+vg+Wp1eCLayp7zMWTHf0RNXpPBlOQi9RDS2B5dS+XpzIIeXLs7riM1vwClGfbFjV9F0FiU5u0wV64tP6I84D42spUrqinatiQYst7n09JU3AzAk8g/MRi3Hl6CvkFZBujSlCNq/hYBGe7pvgkYD3mbe3KfVLcRmE5ceAuRF4Mw60nx9GqQT8M6z2TE6Bg/zAcPbcBDxLPwcO5Izq2GoLtxybzXhIKARJh1TfROB71Mzp5+2PHwQXwbNAOXdoNxi9/foczV/ZxcVW9lTfvRfj+qzM4Eb0TvTsHYufBRUQM9xezb96wMz4aEAIrqR3+Ob8fvxxdrGEjwtpvL+L42R3w8xmEH36egPtPr6jZdGk7AsP/+yUu3/gLm/ZNK6pP3FUZ/vn9GW/9GnvZoeuAutDmAbH3CY23T+ONz35IPSBBNPQLAxLgFaDaw+7hyd/TIUr4HYXO/eHQcizS/voPrLr9CtnV1TBNOY18+y6w9vwAOdFj4DIkDk8iv4D4ZQS57Is/RltZHz4BYsYfgDxqOyQ3fkdOwx6Q9poEZq3qk1BFyHZuBfvgXZDPaQHRpCPIiNwIy5sHIfcaDKfhizSmzdTtNVmKJhxE5pHvYfHgH8g9ukLS6SOIwxRPY1UKkFabxY+QuHks2UyRCIfJv+Lllk+IV/cSdmz5QppDKK41G2/fHFhc2Ykc9y6oMXIFcua0VMtXqN3fCFBxC5seh5B8fRPEiYfB1A6Aa5cFnAAJtZVmCutT7JDLFF9XKkmAGtfuBj/vEahXuxmSUxPw14UtnHejKi5e7v7o0e5jONrXgYlIzD12im9dSbVMc8edRchPXVDI5MHURIJ546O4OCFBpyExJ3vUX4cseUaRmGnWSekBbZwTi5VhnyJJ9hSzPv0F63ZPxcuUJwiZsB8T5r2jRYCADSHXsPrniXgpe4LpQWH4YqlfMfv5kw8h7LcQxD26oFYETVFb8tNoFBYSQRi6DNNX9FJLZ/mXp7B440iSz+NijcsnQkrxYY21CZC5iEGwPXuAO3+gAmTAUZZmJUiAX4CG3sWzXzyJmBSgEOZwGXQZiftbwCngOsRmbwaBPDnxjn7zBitYz/Y04ez5g/AUnOW828gM8YJJQY5a1KzWQ2HbcyIkjvUgMiEuABm8WA9BOv8OMma3IPa5KDS1hO2C29znQvaa5bGcewtiibTo4/ysdE7Y2KAUoJJt6hNr5rW96ns3CMVl006f7l7ESHW9qaS1J21TcM6DbiAh3BsihvAQWaDu0H85ARJqK00ebzsF9yYdEdydO2Bkn/lYsK1nkQDN29wLU0eGI+zQl3iWfB0NnH0RNGAFZqzvwIkLK3CsTVZuilqRJgXswcmYUNx4fAytiYAN6z2jyAOKOLsGj17GEPLad1EqBUghBKzIM689HdX3ijZX9Xo2zb1etL5TPK6mPbBu9hVMmPsOGEZ9XVNTgMbP9uLyWjvrIoLneKvl28FrAPp1D0bEqc04fUnhlakGVRFSFR/WRpsA0Sk4OupXBgKCHlD8yS9gmngIBc7+sGv2ETIj/RW/qi+vgGlqlJrYsAKky8I33yYEzmMgHpBFbLjCA3p/Cpgf+8BiVixk2z6F2dNLxGPwg9PYTUj7phFMJx5C+on1sCQek9x7GJyGLeQESMieFSrVwOaXdXgpuQ/pDBm01QcyVQ+oJBtVwVJ9L5S+pshoCpCMDGSmmUm8fUbbJgTbnn/iVewGRVvVGYx6fvPfeEA8baWZgb6bEJSeUbfWE8jUVgCsLGwhI97gsejNuHKfrGWRMOY/G1DX2RMnL/xM1okU3mVkzA5YWzqgZWM/LNvZr8hmXmg3tSK51fLBkB7fQmJhhWiyBtSrYyC+We9L1oA8MLDrDNQj6WZkyXDq8m6cvRnGy0tdgIoLh6pAsCIya7U/nBzqY/KoNRhPfgypC5PQNB0wZ9JB7Dq8ELfuR6mVQ1OAFm38kGggg7Fk6vible8XS9/WqiYWfh6BSfPb8daHFaHnDzO5aTfVQDchVIYhlpZRGwFeAXIZchsvrm1HrRbDIE97ilfRZA0o4zLypM1erwE1Qx4ZBF7dCIPJow2cB6RdgIS3YefUag5JwCJYujZF9rO7kId/SdaA/kWW32ew7zGOK7sscjNE1o6wadETabs/hw2ZyhBbWCM1ag8c3w9G+lceyPabxGuft7SDWv3Z/MwDFsKKrAHlZciQ9ncoLM+u5WyUoqCLjZAACcXVJkBM0C+wcG1eNCWnWuCStmHn2XVErY4LITa35taA6rT5hPNe86VNeNtKszMIbcOuzJeNPgL0Xscx8O8RjCOntxGx+xBTFnfUWYCaenTCR/4hsLG2x+mLv2H3n/N540acCkXntgOxKiwYD59dU7MZM3AJfFq9j9+O/4gjUZv1wq5NgOg2bL1QUuMKIiDoAeni0ehXZoUI0RtR9aNmiBtR/0iX4kFe1Tn/zZh2wemyJVu/HvHGWkiA3M1y0d+G3oj6tlxpPMMRMLAAsRVTiBA9ikd7Ixv6KJ5d5GbU9CpyDlx1FiAbchTPCHoUj+FGUJpTqQgY6D4gZRnpYaTaWquiDyM9RA4jrSoiVKqropJGZsXnv/Qw0kraetWz2AYWIBayYU53rhrNaVhW7KGkxzKr1nRc1egHJdeCnXZ7z4o+jqFkUtTCmAhUgACpekPKB9KV7flmxgRY/7KoPqivYrgoH0jH/n2Zb8p7n5D+9aIxypIAe59PLdN87rw3+kC6siRL0zIkgQoUIENWk+ZFCVACqgTojai0PxgDASpAxtAKtAyUgGEJrCICNMWwWdLcKIHiBKgA0V5BCVQfAuzZPKFUfKpPgxt7TUsUoBerrP6Wx5l6k3O87PgqY1Yn/3TtbzI661PR1MPmZ1IPS9/VJw61pQQoAUqAEqgCBBhGRo5WC+2QdOlzrQJExOefnDtmXUqqsj4iRMWnJJr0e0qAEqAEqgEBBqu0CtCjiXapQp6PJh5dRIiKTzXoVLSKlAAlQAnoQoB4QloFKH5SDV2SoTaUACVACVAClIDeBKgA6Y2sekVIcmeQ1EBEXgxSXUAedFcx9yZVL+q0ttWVgFk2A7sE8qiNhyLyYuD4oGpfb1SAqmtPL6HeuRIGlwOA582q9gVAm58SMGYCtW8yaBMOmOdUzeuQCpAx974KKpvMhcH5EUCWfdXs9BWEtVpna1FQgFYZOfDMzoFTTgEsyfORqnvIJg/ZTJSIcdtSglhrCeRi8uBNniBNYeC7C6iRUPWuRypARn4VnDN30KuE7XOT9bLXNGY9n8gJFS8+7IPvqktQPqa8qta3fnYu+r1KR4189SfHVtX6vk29ZKYmOFjTBo8s+R+LwopQN/LYMmPyhNq/LPkaPVerrVYcVIDeprcYMI6hBejcCMYopt2oABmwk5VjVqz4fPiCvf+VBl0IbHe2ExQhdjqu/S7j8YKoAOnSopXcxpACxG44OP2xcXRwKkCVvOOS4rPTbkHPZdTz0aMpWU9oc+0agtNxnbcaz8YEoxOgOpsXoc77XRFTr5MeyLWbspUsyY0rs8zKMiFzM7R/Gl3qshtSgG51B9hXaQMrHqWdVlIKELkPDUwZrxeoplke6Sv56Zp2SaxMRGZYEBzNMZ077ixmbVI8NpwvsNxmrO+AQiav2Ndl0S769A3ftCy8l5ypTxSttoVic9guvIuM6W5lkqb1kvgyS6tMCvQ6kWMOVjhvK+VNsulJgH2VNpTFuGp0AuT74gIuNOkOJjWjtHwqf/xKKECnxyi2XJc2lMVAZygBUq2rl5cXrl27Vtrq6x1fHwH66sMjWLy991sJkN4F04gwrt8WbDo4RudkRj1PgVtOvs72JRlWGQH65Fdg40DB6sZLTPFzbXve79mt2Z23lP4arbQCZP91MFxH+MPC0QFZzxNxf/FaZO+NgKoaXug6DO7ffY0aLTwhuxGHB5NCUHgvHqYdWqPR8m9JXHvE7zyARp+Owrm6HSD29OC1Z1uAA+XcDq7blkFkYoL4D6eiXuhSiExN8XjUF0ChxsKmmRitrx/B4z0H4R44BPd+2Aoz51qoN7gv9z51+Rbw1SHrwHF4X4/Ak91/wD1oOGJcO8KkcX3U/34mHFo1Q9rdB7g3dQEKr97ijc8yMG3vhUbfz4K0jjMesfUbN5LzgESeDeCxcjZqNG+M1Lj7uD9tIQpu3C2WH1+PKwsPSKjNNPM79DVT7D6foL4b8Sr1OQ6cmQ1Lc3t8O+Yotvw2DXVrNUP7lv6wtXZAcloiIqLW4kZ8BJekUoBqWjdAQPfZqOvUGAkv7yP874V4mXYXX4+OwPlrf6CLz3DBX/N8AnTgwAEEBwdzHtHatWsxaNAgLr/Dhw9j/PjxSElJQVBQEFatWsV9ztru3LmTHDslwg8//IDRo0dzn/N5QGPHjsXmzZshJjuR8vPz4ePjg4sXFYusSg9MKD2h/FXzESo7mz6fANV18MKgHrPgYOeMqCsH0N13JGc3efA+rN43GHxsE1NvcewjzmxCp9YBkOdkYt9fc/D41RW1dmH/cbRthP/5fQ1XF088fRGHvZEhkGXEw8G6Pv7XdSbcXJohIekBwiMXQJmusr8s3zGMN65mf5r6KKnYbrecmo1gPnAxpG4tIU+4j+z902HxIhbybtNg02EozG1rQp6cgPSI5ZBeD4e8rg+kQ5ZCYl8bKWd/gWP3jzmvRcheswxyx2aQDFwAab3myH5yE7l7p8I85QFnpvSAhGwKRaawnBGD1HP7Yd/lQyQfWweRjRPsfQci+fg6WJ5aDb64prLHXDzZ0R9Ro/dkMAW5SD20BJZX93J5KoOQJ8fujltR35FvOAB7n9B/F6kLkPsfG5H9+DkSJswmDWsP33+P4krgNFh5N+Mdq9mElQJUmrGpQj0ghkAy9W4Kr33rcblhVw6WslKNjoXh0dINyI08B0mPjnAZMwTxwybD85/diF/7M7J+PQqrEf3RatkMboAWsldNk4x+aHhgEwpz5DC3r4FbfQIhyszmbaT2iTG4PHoqChKT8M6hrbhKGqPg5StS1nW47KEoKzewaNTBN+E8rk2ciezfT0CUl4+Gf27Fs7B95CI5CvP33oXblDG4+55iEOOL3+TvXXi8JgxZvx2H1fB+aPXdTK5+DSNC8WzbXmSFH4XUvyfqjh+Ju71GQzM/vsqUhQAJlVczv4PfAPkW6p96NeiHAWRwmL+tJ1q7D0CfTuOxZHtf8lzbgteGIjjbNcUnAesxb6uCrVKAxvUPRfS1vbjx+Cg8XXuii/dIrP99NBaMP4/tf87ErccnyODO/wuZT4AaN26MTZs2cQLCCsadO3e4/NjPN2zYgB49evD2h7t373KCIpPJuO+FpuA0p8zCw8OxZ88e7qUaNNMTyl81PaGys+nyCdDEgbsQeTEMt54cRyvSBsN6z1SzE2LLcttzZB5iHx5CE9fu6OkThB/Dh6m1C/tPsH8Yjp7bgAeJ5+Dh3BEdWw3B9mOTMa7/VtJm+/Bv/FE0dHkXPduN4dpMtV2F4mrC/yI+CRaF6tutmfEHII/aDsmN35HTsAekvSaBWdtPJaoI2c6tYB+8C/I5LSCadAQZkRthefMg5F6D4TR8kca0mbq9ZhlEEw4i88j3sHjwD+Tk2pd0+gjisFGcmVKAtNosfoTEzWMhTk+Ew+Rf8XLLJxBnvIQdW76Q5hCKa83G2zcHFld2Ise9C2qMXIGcOS3V8uXtrORDuYkIy934BchUDvRbqB5TOrIfmsydhivNekL6wQA0+v/jcbV1X4jyFdeotrG6NGNThQiQ5Qf+cJ/8Mazc6sCE3bdOBgPlGo1SgNo+Og1TqWURpdy0DE6kfJ6cRYwHOds0l8xPSyVo/yiKiytkzyag6iqyoFutmoNbi9YgdcUWofbj4kQ7+UBEfilrvmfzE6oDZ+vSDqIChVfVNv4MYhp3gyhHfT5dKL5g/Ug6Fxt14+rNSMzgcycSF93eVZRNJT++CpWFAGlrM9U8+abgzMSWmBF4DKEHp6Frm0DEJ8Ti5JU18HL3R492H5MfXKQfiMTcoK4cSJUCNGfsGczZ3I1bjxCbmGHWmEjM/und1wLVjmQtvC2XT4AkEgnS09O5Itva2kIuJ1cjCeznmZmZMCVesWrYvXs3Jk6cyHlGrBej9GR0EaCkpCR0794dJ0+ehKOjYjAQSk8of9V8hMrOpssnQOxaT8hPXTh2piYSzBsfpWanje3M9R1RwORyzGeP+RuzflKsyapOjYYEnYbE/M01miXP4H5AsOnO3dINBYXCa0hCcTX7L98UnOW828gM8YJJQY6aeVbrobDtORESx3pkpkMxrrAegnT+HWTMbkHsc1FoagnbBbe5z4XsNctgOfcWxJI36yn5WemcsLFBKUAl29Qn1sxre9X3bhCKy6adPt0dotc/1FTXm0pae9J3Co6xsoTPjWO49jGZmfh/gUi9FIuUeWsExzm27kVjdSnGpgoRoDZ3TuJ60JfIu3gdkq6+8N62gptGYwdXNQ9o4RrknoopUmG20p6n9iB+9Vaw011WI4kH9NpD4DwgHntVUCJ3V3gf/Rn3Vm1Bk+mf4nKf0Sj49y7fmK0mWqoCpnwvVAfNTQNsuZ6yHtCePzkPqMG0cYjr/gGE4nv+tR3xP4QSD+8YrIhQKz28hke24dmWPQoPaGhf1BkVgHvEg9NlHrYsBEhbm6kCFNqEMKBTCKQWtmjZuDOW/RwAWdYTzAw8ibBDX+JZ8nU0cPZF0IAVRYvfyoHuk/7bEHVtD/drulWDvmTKLgCb/ghUGwh5G/D1YMl+x+dFsELCTrnFxcVx0Zs2bYqVK1eiT58+asm5ublh//793LQaKyasvbOzs1YPKDk5Gfb29hg2bBj3Cgggx0G8DkLpCeWvS9mFBGhSwB6cjAkl3uMx4nn6Ew9ohpoAaWO7K2Iu5wE1d+sNP+/hWP+b4he/qgCxXkzE2TV49DJGxZtVeEZniQcU++hPzgN6r/04rD3wQVH8eZt7YXSfVbxxNduSbxMC5zEQD8giNlzhAb0/BcyPfWAxKxaybZ/C7Okl4jH4wWnsJqR90wimEw8h/cR6WBKPSe49DE7DFnICJGTPCpVqYPPLOrwUFo/OkB+kSq9dYaHqAZVko2qvS1xNkdEUINncd2CamcTb/d9mE4LLmhCY2dmidq/OuNAxAMyDJ4LjlOpYXZqxqUIEyG5aENyDFR364YYdMHNygMt7foj17lc0oIpbNEKD72bAvqUnclJkePTTbqStDoPpu23QhKyFmNlaI37X72gy8SPOAxKyLxKgeh3RhAziSX+dQfLcH1FzwVTU6tYJt3qNBMh9BpqBT3SK0iL5CdVBWre22q41rlzLZ75eu7mHB5/PR0FsnGD8W2Stq/HKb2FmY4XHOw6g8aRARNf2hbiJOzxWz4ZdEw9uTez+lLlgbj80mABpazNVdkLbsN1q+eDTwRsQ9zAGW/8cz0Xp3CII3dsp+kFkzA5YWzoQgfLDsp39igY6R9uGGNxtNlxqeXDrDOGRc/Eq4+FbCxC7jsIKjwlZC1y/fj0GDBjA5R8REcF9/urVK26dh10fYkNYWBgmTJiAJUuW4NmzZ5xIsZ6SkAe0bNkyLFiwgJuqY22U4fLly/D29hZMTyh/zTUgvrKzefB5QCzzIT2+hcTCCtFkDahXx0B8s96XWCu8Rj62yRmPyW65c/jr/Hb4tRmM5NQE7DsRwv1IYIOqALFrQAO7zkA9Z09kZMlw6vJunL0Zxq0NDSRrQK7OjfE88R5ps/lITFMI/Zj/bEBdYr8ufCxvXM3rkN2GPfaZDHavZxTY73NqNYckYBEsXZsi+9ldyMO/JGtA/yLL7zPY9xjHJSGL3AyRtSNsWvRE2u7PYTN0GcQW1kiN2gPH94OR/pUHsv0m8drnLSU/hlUCm595wEJYkTWgvAwZ0v4OheVZRf9QioIuNqr2usTVJkBM0C+wcG1eNCWnWt5UsQl+qqP/Nmyzzj5459cNSIyKwYMBimtUl7HapFnDtx6bKgzrlbUAAALZSURBVESANDvZ2/4vsrOGz62/cKF2+7dNolrEKwsPSB9Q0eRG1AQjOP+N3gekT6vpZlsWuxN1y+mNFb0RVT9i2m5EdSE3onagN6LqB1TVmnX3nm7cgeyDJ1Fj0ig49e2OOz0Vv6Jp4CdgaAGiR/EYvieWtA27LEpkaW5H1vKOYOZGdQ+hLNIuKQ1WhPonpat5QiXFqW7fs57PH470KB61dqfPA6pul4GivvQw0urZ7uVZa3Y6ziuTHEZKXk55BcV2x5Vn3saaNrvbLZHcNnLbSoJr5EUPI9VoKSpAxtp1y79crCd0iay/G8N0XPnXluZACRgnAXba7R36OAbjbBxaqvInUPRAOnJOnMxFVOw+ofIvAc2BEqg+BNj7fGokKM57ow+km2jHqG0Hqj79gNaUEqAEKAFKoDwJkPsptD6O4cUqq39y7piRO0dpoAQoAUqAEqAEypAAg1VaBYjN6sVKq7/ld8zakNsibMswa5oUJUAJUAKUQHUkwIB9QFRoh1eXppQoQCXxyYg2Q/J2q5LM1L63ap+DmqP4z3HTKyFqTAlQAjoTIIcRyUQQhdYZfv9znSNRQ0qgHAmUWoDYsukjQlR8yrE1adKUgG4EVhERmqKbKbWiBMqPQJkIkK4iRMWn/BqSpkwJ6E6AQZ3hZJsVDZRABRMoMwGq4HrQ7CkBSkAPAsQDogKkBy9qWj4EqACVD1eaKiVg1ASoABl181SbwlEBqjZNTStKCbwhQAWI9gZjIEAEyJ2c765y9rwxlIqWgRKgBMqRAMOQNSCTcsyAJk0J6ESA9YBWEsvPdLKmRpQAJVAVCNBdcFWhFatAHbiFyNciFEje2lWBOtEqUAKUAD8B7gZAugWbdg9jIaDTTpjnuxoEMiKTrXoVmmG21RnxgBU1GigBSoASoAQogWIEdBIgNpZeIkTFh3Y1SoASoAQogRII6CxAOosQFR/a6SgBSoASoAR0IPB/AlFalB3tI3oAAAAASUVORK5CYII=';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Col·locar el marcador allà on toca', 
			morph, 
			  'Ja tenim la manera d\'obtenir la localització de cada municipi.\n\n'
			+ 'Amb cura, arrossegueu ara el bloc "valor localitzacio d\'objecte cada\n'
			+ 'element" dins la icona en forma de llista del bloc de marcadors (el quadrat\n'
			+ 'amb dos rectangles de color taronja).\n\n'
			+ 'Us ha de quedar un programa tal com el que us mostrem aquí.',
			myself.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAAlCAYAAACXvR1IAAAG80lEQVR4Xu2bbUxTVxjH/+e2vIOAQFsqzvoyEHXKnIvLIhMzXfTDfGOAzhmZWzLn3JxhmX5xMfHbtrjp4nz5MOfiNiE6xMTMZGwW49BsUbrpxjQK1SGUUkYFrEDbe3fuLYUCveXWtpRCT9Lktvec5+33POece3svQYCbsUyTYwcSWRZJDGFyeHUsBw0Bp3GoJnmeTODAmQmg6+9DzIQ4v7N6EOhhx9309Xp9gF0JKfE0Zv5tTd9rNGCwmOWYPAqPQiO9AP2rx500ZxIQQrQ0fQTo6YX6qsBrHn0afAbbVq5JsnRjMQGTRwNLYRKhKkdX4yhoouPAamOjUJW8Rm8eXfb535rHBksrM48jzHZq0mr/mxVYiTQBdTQBtTzoSev0FYHVFhzpXoNtKtVs4jhSPNzaGBx3HlvrGTp1awmHirGyVksCy0+3XT1YRYHuGck187Ex+TDQWc1yhj2uKNS7bNp8EBqEoR7BOoAy21mOe59OXUlBsC+oKvnNGE3kMwxhtdGRqAiltVkUbGOpZjWt0GPjEah4NnFaYcdNQY/23fYQsHyVPupmjoXipmgky3vApdUoBD0AbLhKfUsNfn3mL6sIWB1hoAtmVQtgw1XqG1DPozk9PU8/FDiBmZ/GZcCDQG/MSLhKAwl1eNmOXTgFTpvjjpmjcRxr5qveVYI3CUEaT07jhlcf7hEKEXCs++Rr9bq6HWGwoUDMexv3h8F6H7SQGBEGGxKYvDcy5MGqNXV9Xs8zRwrHCy3ReKonCvlI8D4iY2TEmAI7mImyi8HRJiWeJTFjBJd0N8Y0WGcY9uvTUDDOqndcgI2zEmxoScBkmxwaNqIv7V9EnPQSCLGeomA5EgkmcydSZuYLLpn+KQN382P6tIktoC6mF91BU+l0yTpc11jJg3o7NuqneTtkVPSXEiPxip2+AyQiAbbbXwjOyDN3gLUYQPRfBtQ5KUa7GjAewUoBIAo2afkFmH7ZCHlPgyDHHjUZyblfob1yGQYHv+87TYbkzFcQGZeC7g4DTDWfQWY8h9SVl9FScwiK+e+AtVnRcvVTyAyn3NrnSZbcOPQpFn+CtcZkIfGZvYhXzEJnSy3af/8Q8q562Ce9hpQ5byIqQQXroza01p4Eqds/xP60NddhvHECqXSWs3V3wHR5F+QdOup/NUy1P0A1dyOaT8+CmB4OciFWrTfLoZj9Kpp1R8BEpyE1aw2MusMg9QcFnVKSXxSsIv8vakQOnXqtgjB+alaurYHx9GxxsH2u0lFxtN/SEzBV5CC98DYaqveCuV8K+8RFUC36hP7+tGewIrIGD+LBLm+ORQZdP2uje/BrSpeUhBb6DJ6K4/LKYf7jAORtl2BLfgHxWRvQfWUzUlddhaF6DxhTJRjukah8PuANVTtBDGfBKl/GRJoM7T+vgKrgFhq0JZC1nBfiKaZHgEZjda/yLZAeIzJWnMK/lVtBrEao+Fiemec72AlLf8J/F1/vr9joJ5C65Fu0/Zg7ACwHGdRFt4R10aYqQMrcLYhJzKA3tOkta/p3Bv8773BjaSZ1ij5hPEzGObNRTJY7sMfrlVhGHBuhzTEGnFdaJMEdDFax9gZkEf2XRtYuWnU0MW0pLyEhqxjxyjnoar+PtuuH4W724KE0lmUJfrKIhCq/vxBc/RfT0x+bGXwp9cbZ9dix9/CpYu2TNwvTAFt/lBpKIHvyPUfl1u6hGVwDw8USMDSzuYz1yHh+N5rKZtDfr8GgfRdM+zXYkxfhiWWHqaPZUBfWDtgQeTLMeU5MFuF6BkDjK9YVLH/yowgTvlN0wBLh+f8NtxVbsw/yB9V9STgwQ+jWMTkXytx9aD27YEjy8Lbfu1BCoZ+DXbkSidmb8FC7cggIoWJF9LjGRsqxWAZ7vNxhp2xB8sxCxCZNQdvdS7D8thUM+xC29EIoF3wAwshhuHoAyvnbYDq7ENzUt6GY+4agq+X6MZoYqUiasgTRE9Reg2WnbnMri58xXJs7sPz5OzQByuWdqIy34Ha81S3kwWCtsdm9a2w2rBYzWv/+BszdI8CMEqTMWoeIqER0dzbDpDsIWdPJITFVFdxE858nkDa7SKjs1iu7ENFZMwSsqJ5B1RgwsE7Lk5ZXwaSl03JX/+07SXPdCHQSA+tONQ+7rnfPwJ93Tt/+MlPKFOkvXcPJkXSDwqYugvq53TBcOwhGf2g4mSN63huwgTYs5MAGOiC+yB9NYH3xw99jJVWsv5X6U14YrPtoUrBTWeG6JNzGUAToE+H0mafPqUf8y1XhNnYisF+o1F64xfQwcez4Ni49eUC95h9mo6/kSGj0lcli+sok/3aA9MZxx9Xr6/lkCbcgREASWN4ur+CGoQYB5UCVksFKhhuGGnSovAH/A31HSx/RGhB+AAAAAElFTkSuQmCC';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Enllestir el programa', 
			morph, 
			  'Per acabar, torneu a la categoria de control i busqueu el\n'
			+ 'bloc de la bandera verda (a dalt de tot).\n\n'
			+ 'Aquest bloc indicarà a Snap! quin és el punt d\'inici del\n'
			+ 'nostre programa. Arrossegueu-lo cap a l\'àrea de programes.',
			new Point(195, 45),
			'left',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Enllestir el programa', 
			morph, 
			  'L\'únic que li falta al nostre programa és encaixar-hi el bloc de la bandera\n'
			+ 'verda. Fixeu-vos bé que totes les peces estiguin col·locades tal com mostrem.\n\n'
			+ 'Si detecteu alguna diferència, sempre podeu desmuntar els blocs erronis i\n'
			+ 'tornar a encaixar-los on toqui. Per desmuntar blocs, només cal que els\n'
			+ 'arrossegueu cap a qualsevol espai buit de l\'àrea de programes.',
			myself.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Engegar el programa', 
			null, 
			  'Per activar el programa, cliqueu sobre la bandera verda.\n\n'
			+ 'Si tot ha anat bé, apareixeran tot de marcadors de color\n'
			+ 'granat al voltant de Barcelona.',
			myself.controlBar.startButton.leftCenter(),
			'right',
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Navegar pel mapa', 
			null, 
			  'Podeu ampliar o reduir el mapa utilitzant la rodeta del\n'
			+ 'ratolí, i moure-us-hi arrossegant el ratolí mentre teniu\n'
			+ 'el botó esquerre clicat.\n',
			null,
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	morph = new FrameMorph();
	image = new Image();
	image.src = 'data:image/png;base64,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';
	morph.setExtent(new Point(image.width, image.height));
	morph.image = image;

	this.tutorial.addSlide((new DialogBoxMorph).tutorialWindow(
			'Ara us toca a vosaltres!', 
			morph, 
			  'Intenteu ampliar aquest programa!\n\n'
			+ 'Podeu utilitzar els blocs que us proposem, però la millor manera d\'aprendre\n'
			+ 'a programar és explorar pel vostre compte i anar descobrint com construir\n'
			+ 'programes cada cop més complicats.\n\n'
			+ 'Esperem que aquest tutorial us hagi estat útil, i recordeu que podeu tornar-hi\n'
			+ 'a accedir en qualsevol moment mitjançant la opció "Tutorial" del menú d\'arxiu.\n\n'
			+ 'Moltes gràcies per la vostra atenció!',
			myself.stage.position(),
			null,
			function() { myself.tutorial.previous() },
			function() { myself.tutorial.next() }
	));

	this.tutorial.startIn(world);
}
