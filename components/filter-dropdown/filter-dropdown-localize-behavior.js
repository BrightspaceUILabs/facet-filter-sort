import 'd2l-localize-behavior/d2l-localize-behavior.js';
import ar from './lang/ar.js';
import cy from './lang/cy.js';
import da from './lang/da.js';
import de from './lang/de.js';
import en from './lang/en.js';
import es from './lang/es.js';
import eses from './lang/es-es.js';
import fi from './lang/fi.js';
import fr from './lang/fr.js';
import frfr from './lang/fr-fr.js';
import ja from './lang/ja.js';
import ko from './lang/ko.js';
import nb from './lang/nb.js';
import nl from './lang/nl.js';
import pt from './lang/pt.js';
import sv from './lang/sv.js';
import tr from './lang/tr.js';
import zh from './lang/zh.js';
import zhtw from './lang/zh-tw.js';

import { getLocalizeOverrideResources } from '@brightspace-ui/core/helpers/getLocalizeResources.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import '@polymer/polymer/polymer-legacy.js';

function resolveOverridesFunc() {
	return '@brightspace-ui-labs/facet-filter-sort\\filter-dropdown';
}
const fetchQueue = {};

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.LabsFilterDropdown = window.D2L.PolymerBehaviors.LabsFilterDropdown || {};

/**
 * Localizes the search facets component.
 * @polymerBehavior D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehavior
 */
D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehaviorImpl = {

	get importMeta() {
		return import.meta;
	},
	properties: {
		resources: {
			value: function() {
				return {
					'ar': ar,
					'cy': cy,
					'da': da,
					'de': de,
					'en': en,
					'es': es,
					'es-es': eses,
					'fi': fi,
					'fr': fr,
					'fr-fr': frfr,
					'ja': ja,
					'ko': ko,
					'nb': nb,
					'nl': nl,
					'pt': pt,
					'sv': sv,
					'tr': tr,
					'zh': zh,
					'zh-tw': zhtw
				};
			}
		}
	},
		listeners: {
		'd2l-localize-behavior-language-changed': '_onLanguageChange',
		'app-localize-resources-loaded': '_onResourcesLoaded'

	},
	_onLanguageChange: function() {
		if (this.language) {
			this.loadResources(this.resolveUrl(`./lang/${this.language}.js`), this.language, true);
		}
	},
	_onResourcesLoaded: async function(e) {
		this.async(async() => {
			if (!fetchQueue.hasOwnProperty(this.language)) {
				fetchQueue[this.language] = getLocalizeOverrideResources(this.language, e.detail.response, resolveOverridesFunc);
			}
			const resourcesOverride = await fetchQueue[this.language];
			const resources = {
				...this.resources,
				[resourcesOverride.language]: {
					...resourcesOverride.resources
				}
			};
			this.setProperties({ resources }, false);
		}, 100);
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehavior */
D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.LabsFilterDropdown.LocalizeBehaviorImpl
];

export const MyCoursesLocalizeMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {

		function resolveOverridesFunc() {
			return '@brightspace-ui-labs/facet-filter-sort\\filter-dropdown';
		}

		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = ar;
					break;
				case 'cy':
					translations = cy;
					break;
				case 'da':
					translations = da;
					break;
				case 'de':
					translations = de;
					break;
				case 'en':
					translations = en;
					break;
				case 'es':
					translations = es;
					break;
				case 'es-es':
					translations = eses;
					break;
				case 'fi':
					translations = fi;
					break;
				case 'fr':
					translations = fr;
					break;
				case 'fr-fr':
					translations = frfr;
					break;
				case 'ja':
					translations = ja;
					break;
				case 'ko':
					translations = ko;
					break;
				case 'nb':
					translations = nb;
					break;
				case 'nl':
					translations = nl;
					break;
				case 'pt':
					translations = pt;
					break;
				case 'sv':
					translations = sv;
					break;
				case 'tr':
					translations = tr;
					break;
				case 'zh':
					translations = zh;
					break;
				case 'zh-tw':
					translations = zhtw;
					break;
			}

			if (translations) {
				return await getLocalizeOverrideResources(
					lang,
					translations,
					resolveOverridesFunc
				);
			}
		}
		translations = en;
		return await getLocalizeOverrideResources(
			'en',
			translations,
			resolveOverridesFunc
		);
	}
};