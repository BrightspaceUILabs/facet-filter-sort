import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.SearchFacets = window.D2L.PolymerBehaviors.SearchFacets || {};

/**
 * Localizes the search facets component.
 * @polymerBehavior D2L.PolymerBehaviors.SearchFacets.LocalizeBehavior
 */
D2L.PolymerBehaviors.SearchFacets.LocalizeBehaviorImpl = {
	properties: {
	/**
	 * Localization resources.
	 */
		resources: {
			value: function() {
				return {
					'ar': {
						more: 'المزيد'
					},
					'en': {
						more: 'More'
					},
					'es': {
						more: 'Más'
					},
					'fr': {
						more: 'Plus'
					},
					'ja': {
						more: 'より多い'
					},
					'ko': {
						more: '더 보',
					},
					'nl': {
						more: 'Meer'
					},
					'pt': {
						more: 'Mais'
					},
					'sv': {
						more: 'Mer'
					},
					'tr': {
						more: 'Diğer'
					},
					'zh': {
						more: '更多'
					},
					'zh-tw': {
						more: '較多'
					}
				};
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.SearchFacets.LocalizeBehavior */
D2L.PolymerBehaviors.SearchFacets.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.SearchFacets.LocalizeBehaviorImpl
];
