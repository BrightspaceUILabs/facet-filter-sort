import 'd2l-localize-behavior/d2l-localize-behavior.js';
import '../lang/ar.js';
import '../lang/cy.js';
import '../lang/da.js';
import '../lang/de.js';
import '../lang/en.js';
import '../lang/es-es.js';
import '../lang/es.js';
import '../lang/fi.js';
import '../lang/fr-fr.js';
import '../lang/fr.js';
import '../lang/ja.js';
import '../lang/ko.js';
import '../lang/nb.js';
import '../lang/nl.js';
import '../lang/pt.js';
import '../lang/sv.js';
import '../lang/tr.js';
import '../lang/zh-tw.js';
import '../lang/zh.js';

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.LabsSearchFacets = window.D2L.PolymerBehaviors.LabsSearchFacets || {};

/*
* Behavior for elements that require localization, based on `d2l-localize-behavior`
* @polymerBehavior window.D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehavior
*/
window.D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehaviorImpl = {
	properties: {
		language: {
			type: String,
			computed: '_determineLanguage(locale, resources)'
		},
		locale: {
			type: String,
			value: function() {
				let langTag = document.documentElement.lang
					|| document.documentElement.getAttribute('data-lang-default')
					|| 'en-us';
				langTag = langTag.trim().toLowerCase();
				const subtags = langTag.split('-');
				if (subtags.length < 2) {
					return langTag;
				}
				const langSubtag = subtags[0];
				const regionSubtag = subtags[subtags.length - 1].toUpperCase();
				return `${langSubtag}-${regionSubtag}`;
			}
		},
		resources: {
			value: function() {
				return {
					'ar': this.ar,
					'cy': this.cy,
					'da': this.da,
					'de': this.de,
					'en': this.en,
					'es-es': this['es-es'],
					'es': this.es,
					'fi': this.fi,
					'fr-fr': this['fr-fr'],
					'fr': this.fr,
					'ja': this.ja,
					'ko': this.ko,
					'nb': this.nb,
					'nl': this.nl,
					'pt': this.pt,
					'sv': this.sv,
					'tr': this.tr,
					'zh-tw': this['zh-tw'],
					'zh': this.zh,
				};
			}
		}
	},
	_determineLanguage: function(locale, resources) {
		locale = locale.toLowerCase();
		if (resources[locale]) {
			return locale;
		}
		const langAndRegion = locale.split('-');
		if (resources[langAndRegion[0]]) {
			return langAndRegion[0];
		}
		return 'en';
	}
};

/* @polymerBehavior */
window.D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehaviorImpl,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangArBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangCyBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangDaBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangDeBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangEnBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangEsesBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangEsBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangFiBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangFrfrBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangFrBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangJaBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangKoBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangNbBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangNlBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangPtBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangSvBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangTrBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangZhtwBehavior,
	window.D2L.PolymerBehaviors.LabsSearchFacets.LangZhBehavior
];
