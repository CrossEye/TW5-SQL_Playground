(() => {
    var e = (() => {
        "use strict";
        return e => {
            const a = e.regex,
                n = a.concat(/[\$A-Z_]/, a.optional(/[A-Z0-9_.-]*:/), /[A-Z0-9_.-]*/),
                s = {
                    className: "symbol",
                    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
                },
                t = {
                    begin: /\s/,
                    contains: [{
                        className: "keyword",
                        begin: /#?[a-z_][a-z1-9_-]+/,
                        illegal: /\n/
                    }]
                },
                i = e.inherit(t, {
                    begin: /\(/,
                    end: /\)/
                }),
                c = e.inherit(e.APOS_STRING_MODE, {
                    className: "string"
                }),
                l = e.inherit(e.QUOTE_STRING_MODE, {
                    className: "string"
                }),
                r = {
                    endsWithParent: !0,
                    illegal: /</,
                    relevance: 0,
                    contains: [{
                        className: "attr",
                        begin: /[A-Za-z0-9._:-]+/,
                        relevance: 0
                    }, {
                        begin: /=\s*/,
                        relevance: 0,
                        contains: [{
                            className: "string",
                            endsParent: !0,
                            variants: [{
                                begin: /"/,
                                end: /"/,
                                contains: [s]
                            }, {
                                begin: /'/,
                                end: /'/,
                                contains: [s]
                            }, {
																begin: /<</,
																end: />>/,
																contains: [s]
														}, {
																begin: /`/,
																end: /`/,
																contains: [s]
														},
														{
                                begin: /[^\s"'=<>`]+/
                            }]
                        }]
                    }]
                };
								  const HORIZONTAL_RULE = {
										begin: '^[-]{3,}',
										end: '$'
									};

										    const PRETTYLINK = {
												className: 'link',
												contains: [], // defined later
												variants: [
													{
														begin: /\[\[/,
														end: /\]\]/
													}
												]
											};
										    const MONOSPACE = {
												className: 'code',
												contains: [], // defined later
												variants: [
													{
														begin: /`/,
														end: /`/
													}
												]
											};
									  const BOLD = {
											className: 'strong',
											contains: [], // defined later
											variants: [
												{
													begin: /'{2}(?!\s)/,
													end: /'{2}/
												}
											]
										};
										  const ITALIC = {
												className: 'emphasis',
												contains: [], // defined later
												variants: [
													{
														begin: /\/\/(?![*\s])/,
														end: /\/\//
													}
												]
											};
											  const BOLD_WITHOUT_ITALIC = hljs.inherit(BOLD, { contains: [] });
  const ITALIC_WITHOUT_BOLD = hljs.inherit(ITALIC, { contains: [] });
  BOLD.contains.push(ITALIC_WITHOUT_BOLD);
  ITALIC.contains.push(BOLD_WITHOUT_ITALIC);
	
									const STRIKETHROUGH = {
										className: 'strikethrough',
										contains: [],
										begin: /~~/,
										end: /~~/
									};
	
								  const LIST = {
										className: 'bullet',
										begin: '^([*#;:>]+)(?=\\s+)',
										end: '\\s+',
										excludeEnd: true
									};			
									const CONDITIONAL = {
										className: 'template-tag',
										begin: /<%/,
										end: /%>/,
										keywords: "if else elseif endif"
									
									};
									const TRANSCLUSION = {
										className: 'template-tag',
										begin: /\{\{/,
										end: /\}\}/,
										contains: [r,s]
									};
									const FILTERED_TRANSCLUSION = {
										className: 'template-tag',
										begin: /\{\{\{/,
										end: /\}\}\}/,
										contains: [r,s]									
									};
								
									  const BLOCKQUOTE = {
											className: 'quote',
											contains: [],
											variants: [
												{
													begin: /^<<</,
													end: /^<<</
												},
												{
													begin: /^>/,
													end: /$/
												}
											]
										};

							
								  const VAR = {
										className: 'variable',
										begin: /<<(?!=<)\w/,
										end: />>/
									};
									
									
  const HEADER = {
    className: 'section',
    variants: [
      {
        begin: '^!{1,6}',
        end: '$',
        contains: []
      }
    ]
  };									
									
									
            return {
                name: "TiddlyWiki Wikitext",
                aliases: ["tiddlywiki","wikitext"],
                case_insensitive: !0,
                contains: [ HEADER,BOLD,ITALIC,STRIKETHROUGH,HORIZONTAL_RULE,MONOSPACE,LIST,PRETTYLINK,CONDITIONAL,TRANSCLUSION,FILTERED_TRANSCLUSION,BLOCKQUOTE,VAR,{
                    className: "meta",
                    begin: /<![a-z]/,
                    end: />/,
                    relevance: 10,
                    contains: [t, l, c, i, {
                        begin: /\[/,
                        end: /\]/,
                        contains: [{
                            className: "meta",
                            begin: /<![a-z]/,
                            end: />/,
                            contains: [t, i, l, c]
                        }]
                    }]
                }, e.COMMENT(/<!--/, /-->/, {
                    relevance: 10
                }), {
                    begin: /<!\[CDATA\[/,
                    end: /\]\]>/,
                    relevance: 10
                }, s, {
                    className: "meta",
                    begin: /<\?xml/,
                    end: /\?>/,
                    relevance: 10
                }, {
                    className: "tag",
                    begin: /<style(?=\s|>)/,
                    end: />/,
                    keywords: {
                        name: "style"
                    },
                    contains: [r],
                    starts: {
                        end: /<\/style>/,
                        returnEnd: !0,
                        subLanguage: ["css", "xml"]
                    }
                }, {
                    className: "tag",
                    begin: /<script(?=\s|>)/,
                    end: />/,
                    keywords: {
                        name: "script"
                    },
                    contains: [r],
                    starts: {
                        end: /<\/script>/,
                        returnEnd: !0,
                        subLanguage: ["javascript", "handlebars", "xml"]
                    }
                }, {
                    className: "tag",
                    begin: /<>|<\/>/
                }, {
                    className: "tag",
                    begin: a.concat(/</, a.lookahead(a.concat(n, a.either(/\/>/, />/, /\s/)))),
                    end: /\/?>/,
                    contains: [{
                        className: "name",
                        begin: n,
                        relevance: 0,
                        starts: r
                    }]
                }, {
                    className: "tag",
                    begin: a.concat(/<\//, a.lookahead(a.concat(n, />/))),
                    contains: [{
                        className: "name",
                        begin: n,
                        relevance: 0
                    }, {
                        begin: />/,
                        relevance: 0,
                        endsParent: !0
                    }]
                }
								]
            }
        }
    })();
    hljs.registerLanguage("tiddlywiki", e);
		hljs.registerLanguage("wikitext", e)
})();

/*
	https://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
	https://highlightjs.readthedocs.io/en/latest/language-guide.html

	https://github.com/highlightjs/highlight.js/blob/main/src/languages/handlebars.js#L154
	https://github.com/highlightjs/highlight.js/blob/main/src/languages/markdown.js#L190
	https://github.com/highlightjs/highlight.js/blob/main/src/languages/bash.js#L379
	https://github.com/highlightjs/highlight.js/blob/main/src/languages/xml.js
*/