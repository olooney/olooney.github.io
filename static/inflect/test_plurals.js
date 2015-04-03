/* This file is part of OWL Pluralization.

OWL Pluralization is free software: you can redistribute it and/or 
modify it under the terms of the GNU Lesser General Public License
as published by the Free Software Foundation, either version 3 of
the License, or (at your option) any later version.

OWL Pluralization is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public 
License along with OWL Pluralization.  If not, see 
<http://www.gnu.org/licenses/>.
*/

function testPlurals(log) {
	// by default, show test failures as separate alerts and don't show success at all.
	if ( !log ) log = function(success, message) { 
		if ( !success ) alert(message);
	};

	function quote(word) {
		return '"' + word + '"';
	}

	// test helper functions.
	function testPluralization(singular, plural) {
		var autoPlural = owl.pluralize(singular);
		if ( autoPlural !== plural ) {
			log(false, quote(singular) + " should pluralize to " + quote(plural) + ", not " + quote(autoPlural) + ".");
		} else {
			log(true, quote(singular) + " => " + quote(autoPlural));
		}
	}
	function testInflection(singular, count, plural, explicitPlural) {
		var autoPlural = owl.pluralize(singular, count, explicitPlural);
		if ( autoPlural !== plural ) {
			log(false, quote(singular) + " should inflect to " + quote(plural) + ", not " + quote(autoPlural) + ", when the count is " + count + ".");
		} else {
			log(true, quote(singular) + " => " + quote(autoPlural) + " when count was " + quote(count));
		}
	}

	// test conditional inflection
	testInflection("person", 1, "person");
	testInflection("person", 0, "people");
	testInflection("person", 2, "people");
	testInflection("person", -1, "people");
	testInflection("person", 0.5, "people");

	testInflection("chateau", 1, "chateau", "chateaux");
	testInflection("chateau", 2, "chateaux", "chateaux");

	// test user-defined plurals
	owl.pluralize.define('emacs', 'emacsen');
	log(true, 'successfully registered a custom pluralization rule for "emacs".');
	testPluralization("emacs", "emacsen");
	testPluralization("Emacs", "Emacsen");

	// empty string is a special case.
	testPluralization("", "");

	// test single letters
	testPluralization("A", "A's");
	testPluralization("B", "B's");
	testPluralization("C", "C's");

	// test casing
	testPluralization("person", "people");
	testPluralization("Person", "People");
	testPluralization("thing", "things");
	testPluralization("Thing", "Things");
	testPluralization("IBM", "IBMs");

	// test lots of known plurals (taken from
	// Wikipedia and many other sources.)
	testPluralization("kiss", "kisses");
	testPluralization("phase", "phases");
	testPluralization("dish", "dishes");
	testPluralization("massage", "massages");
	testPluralization("witch", "witches");
	testPluralization("church", "churches");
	testPluralization("class", "classes");
	testPluralization("judge", "judges");
	testPluralization("lap", "laps");
	testPluralization("cat", "cats");
	testPluralization("clock", "clocks");
	testPluralization("cough", "coughs");
	testPluralization("death", "deaths");
	testPluralization("boy", "boys");
	testPluralization("girl", "girls");
	testPluralization("chair", "chairs");
	testPluralization("hero", "heroes");
	testPluralization("potato", "potatoes");
	testPluralization("volcano", "volcanoes");
	testPluralization("cherry", "cherries");
	testPluralization("lady", "ladies");
	testPluralization("day", "days");
	testPluralization("monkey", "monkeys");
	testPluralization("canto", "cantos");
	testPluralization("piano", "pianos");
	testPluralization("portico", "porticos");
	testPluralization("pro", "pros");
	testPluralization("quarto", "quartos");
	testPluralization("kimono", "kimonos");
	testPluralization("bath", "baths");
	testPluralization("mouth", "mouths");
	testPluralization("calf", "calves");
	testPluralization("knife", "knives");
	testPluralization("house", "houses");
	testPluralization("moth", "moths");
	testPluralization("proof", "proofs");
	testPluralization("dwarf", "dwarfs"); // !
	testPluralization("hoof", "hoofs");
	testPluralization("roof", "roofs");
	testPluralization("staff", "staffs");
	testPluralization("turf", "turfs");
	testPluralization("leaf", "leaves");
	testPluralization("deer", "deer");
	testPluralization("moose", "moose");
	testPluralization("sheep", "sheep");
	testPluralization("bison", "bison");
	testPluralization("salmon", "salmon");
	testPluralization("pike", "pike");
	testPluralization("trout", "trout");
	testPluralization("fish", "fish");
	testPluralization("blowfish", "blowfish");
	testPluralization("swine", "swine");
	testPluralization("aircraft", "aircraft");
	testPluralization("blues", "blues");
	testPluralization("ox", "oxen");
	testPluralization("child", "children");
	testPluralization("foot", "feet");
	testPluralization("goose", "geese");
	testPluralization("louse", "lice");
	testPluralization("man", "men");
	testPluralization("mouse", "mice");
	testPluralization("tooth", "teeth");
	testPluralization("woman", "women");
	testPluralization("formula", "formulas");
	testPluralization("encyclopedia", "encyclopedias");
	testPluralization("index", "indexes");
	testPluralization("matrix", "matrices");
	testPluralization("vertex", "vertices");
	testPluralization("axis", "axes");
	testPluralization("crisis", "crises");
	testPluralization("testis", "testes");
	testPluralization("series", "series");
	testPluralization("species", "species");
	testPluralization("automaton", "automatons");
	testPluralization("criterion", "criteria");
	testPluralization("phenomenon", "phenomena");
	testPluralization("polyhedron", "polyhedra");
	testPluralization("addendum", "addenda");
	testPluralization("datum", "data");
	testPluralization("forum", "forums");
	testPluralization("medium", "mediums"); // !
	testPluralization("millennium", "millennia");
	testPluralization("alumnus", "alumni");
	testPluralization("corpus", "corpuses");
	testPluralization("census", "censuses");
	testPluralization("genus", "genera");
	testPluralization("prospectus", "prospectuses");
	testPluralization("syllabus", "syllabi");
	testPluralization("viscus", "viscera");
	testPluralization("cactus", "cactuses");
	testPluralization("hippopotamus", "hippopotamuses");
	testPluralization("octopus", "octopuses");
	testPluralization("platypus", "platypuses");
	testPluralization("terminus", "terminuses");
	testPluralization("uterus", "uteruses");
	testPluralization("atlas", "atlases");
	testPluralization("stigma", "stigmata");
	testPluralization("schema", "schemas");
	testPluralization("dogma", "dogmas");
	testPluralization("lemma", "lemmas");
	testPluralization("criterion", "criteria");
	testPluralization("phenomenon", "phenomena");
	testPluralization("consortium", "consortiums");
	testPluralization("symposium", "symposia");
	testPluralization("diagnosis", "diagnoses");
	testPluralization("mongoose", "mongooses");
	testPluralization("mouse", "mice");
	testPluralization("person", "people");
	testPluralization("action", "actions");
	testPluralization("definition", "definitions");
	testPluralization("motion", "motions");
	testPluralization("addition", "additions");
	testPluralization("description", "descriptions");
	testPluralization("nation", "nations");
	testPluralization("admission", "admissions");
	testPluralization("occasion", "occasions");
	testPluralization("decision", "decisions");
	testPluralization("permission", "permissions");
	testPluralization("solution", "solutions");
	testPluralization("camp", "camps");
	testPluralization("common", "commons");
	testPluralization("fuse", "fuses");
	testPluralization("liturgist", "liturgists");
	testPluralization("box", "boxes");
	testPluralization("gas", "gases");
	testPluralization("bus", "buses");
	testPluralization("news", "news");
	testPluralization("baby", "babies");
	testPluralization("self", "selves");
	testPluralization("chief", "chiefs");
	testPluralization("fife", "fifes");
	testPluralization("mischief", "mischiefs");
	testPluralization("hoof", "hoofs");
	testPluralization("roof", "roofs");
	testPluralization("grief", "griefs");
	testPluralization("kerchief", "kerchiefs");
	testPluralization("safe", "safes");
}
