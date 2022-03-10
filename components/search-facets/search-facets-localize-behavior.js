import 'd2l-localize-behavior/d2l-localize-behavior.js';
import ar from './lang/ar.js';
import en from './lang/en.js';
import es from './lang/es.js';
import fr from './lang/fr.js';
import ja from './lang/ja.js';
import ko from './lang/ko.js';
import nl from './lang/nl.js';
import pt from './lang/pt.js';
import sv from './lang/sv.js';
import tr from './lang/tr.js';
import zh from './lang/zh.js';
import zhtw from './lang/zh-tw.js';

import '@polymer/polymer/polymer-legacy.js';

import { getLocalizeOverrideResources } from '@brightspace-ui/core/helpers/getLocalizeResources.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

function resolveOverridesFunc() {
	return '@brightspace-ui-labs/facet-filter-sort\\search-facets';
}
const fetchQueue = {};

window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.LabsSearchFacets = window.D2L.PolymerBehaviors.LabsSearchFacets || {};

/**
 * Localizes the search facets component.
 * @polymerBehavior D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehavior
 */
D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehaviorImpl = {
	get importMeta() {
		return import.meta;
	},
	properties: {
	/**
	 * Localization resources.
	 */
		resources: {
			value: function() {
				return {
					'ar': ar,
					'en': en,
					'es': es,
					'fr': fr,
					'ja': ja,
					'ko': ko,
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

/** @polymerBehavior D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehavior */
D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.LabsSearchFacets.LocalizeBehaviorImpl
];


export const MyCoursesLocalizeMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {

		function resolveOverridesFunc() {
			return '@brightspace-ui-labs/facet-filter-sort\\search-facets';
		}

		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = ar;
					break;
				case 'en':
					translations = en;
					break;
				case 'es':
					translations = es;
					break;
				case 'fr':
					translations = fr;
					break;
				case 'ja':
					translations = ja;
					break;
				case 'ko':
					translations = ko;
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