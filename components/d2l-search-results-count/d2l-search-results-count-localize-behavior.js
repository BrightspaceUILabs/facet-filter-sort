import 'd2l-localize-behavior/d2l-localize-behavior.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.SearchResultsCount = window.D2L.PolymerBehaviors.SearchResultsCount || {};

/**
 * Localizes the component strings.
 * @polymerBehavior D2L.PolymerBehaviors.SearchResultsCount.LocalizeBehavior
 */
D2L.PolymerBehaviors.SearchResultsCount.LocalizeBehaviorImpl = {
	properties: {
		/**
		* Localization resources.
		*/
		resources: {
			value: function() {
				return {
					'ar': {
						searchPagedResults: '{rangeStart} - {rangeEnd} من أصل {totalCount} من النتائج',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} من أصل {totalCount} من النتائج لـ "{query}"',
						searchResults: '{totalCount} من النتائج',
						searchResultsForQuery: '{totalCount} من النتائج لـ "{query}"'
					},
					'da': {
						searchPagedResults: '{rangeStart}-{rangeEnd} af {totalCount} resultater',
						searchPagedResultsForQuery: '{rangeStart}-{rangeEnd} af {totalCount} resultater for "{query}"',
						searchResults: '{totalCount} resultater',
						searchResultsForQuery: '{totalCount} resultater for "{query}"'
					},
					'de': {
						searchPagedResults: '{rangeStart} – {rangeEnd} von {totalCount} Ergebnissen',
						searchPagedResultsForQuery: '{rangeStart} – {rangeEnd} von {totalCount} Ergebnissen für „{query}“',
						searchResults: '{totalCount} Ergebnisse',
						searchResultsForQuery: '{totalCount} Ergebnisse für „{query}“'
					},
					'en': {
						searchPagedResults: '{rangeStart} - {rangeEnd} of {totalCount} results',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} of {totalCount} results for "{query}"',
						searchResults: '{totalCount} results',
						searchResultsForQuery: '{totalCount} results for "{query}"'
					},
					'es': {
						searchPagedResults: '{rangeStart} - {rangeEnd} de {totalCount} resultados',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} de {totalCount} resultados para "{query}"',
						searchResults: '{totalCount} resultados',
						searchResultsForQuery: '{totalCount} resultados para "{query}"'
					},
					'fr': {
						searchPagedResults: '{rangeStart} - {rangeEnd} de {totalCount} résultats',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} de {totalCount} résultats pour « {query} »',
						searchResults: '{totalCount} résultats',
						searchResultsForQuery: '{totalCount} résultats pour « {query} »'
					},
					'ja': {
						searchPagedResults: '結果 {totalCount} 件のうち {rangeStart}～{rangeEnd} 件',
						searchPagedResultsForQuery: '「{query}」の結果 {totalCount} 件のうち {rangeStart}～{rangeEnd} 件',
						searchResults: '{totalCount} 件の結果',
						searchResultsForQuery: '「{query}」の結果 {totalCount} 件'
					},
					'ko': {
						searchPagedResults: '{rangeStart} - {rangeEnd}/{totalCount}개 결과',
						searchPagedResultsForQuery: '{rangeStart} - "{query}"의 {rangeEnd}/{totalCount}개 결과',
						searchResults: '{totalCount}개 결과',
						searchResultsForQuery: '"{query}"의 {totalCount}개 결과'
					},
					'nl': {
						searchPagedResults: '{rangeStart} - {rangeEnd} van {totalCount} resultaten',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} van {totalCount} resultaten voor "{query}"',
						searchResults: '{totalCount} resultaten',
						searchResultsForQuery: '{totalCount} resultaten voor "{query}"'
					},
					'pt': {
						searchPagedResults: '{rangeStart} - {rangeEnd} de {totalCount} resultados',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} de {totalCount} resultados para "{query}"',
						searchResults: '{totalCount} resultados',
						searchResultsForQuery: '{totalCount} resultados para "{query}"'
					},
					'sv': {
						searchPagedResults: '{rangeStart} – {rangeEnd} av {totalCount} resultat',
						searchPagedResultsForQuery: '{rangeStart} – {rangeEnd} av {totalCount} resultat för "{query}"',
						searchResults: '{totalCount} resultat',
						searchResultsForQuery: '{totalCount} resultat för "{query}"'
					},
					'tr': {
						searchPagedResults: 'Toplam {totalCount} sonuçtan {rangeStart} - {rangeEnd} arası',
						searchPagedResultsForQuery: '"{query}" araması için toplam {totalCount} sonuçtan {rangeStart} - {rangeEnd} arası',
						searchResults: '{totalCount} sonuç',
						searchResultsForQuery: '"{query}" araması için toplam {totalCount} sonuç'
					},
					'zh': {
						searchPagedResults: '{rangeStart} - {rangeEnd} 条结果，共 {totalCount} 条',
						searchPagedResultsForQuery: '{rangeStart} - {rangeEnd} 条关于“{query}”的结果，共 {totalCount} 条',
						searchResults: '{totalCount} 条结果',
						searchResultsForQuery: '{totalCount} 条关于“{query}”的结果'
					},
					'zh-tw': {
						searchPagedResults: '{rangeStart} - {rangeEnd} 個結果 (共 {totalCount} 個)',
						searchPagedResultsForQuery: '符合「{query}」的 {rangeStart} - {rangeEnd} 個結果 (共 {totalCount} 個)',
						searchResults: '{totalCount} 個結果',
						searchResultsForQuery: '{totalCount} 個結果符合「{query}」'
					}
				};
			}
		}
	}
};

/** @polymerBehavior D2L.PolymerBehaviors.SearchResultsCount.LocalizeBehavior */
D2L.PolymerBehaviors.SearchResultsCount.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.SearchResultsCount.LocalizeBehaviorImpl
];
