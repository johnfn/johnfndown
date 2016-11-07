# johnfndown

`johnfndown` is a Markdown-inspired markup language. It has been designed to be trivially understandable by reading the [source](johnfndown.ts). It works as a sequence of regex replacements that are applied to the input file. For example, groups of words surrounded by astericks have the astericks transformed into `<em>` and `</em>`. 

The point of `johnfndown` is to be a Markdown-type language that is trivially extensible simply by adding additional regexes as needed. 

## usage

`tsc johnfndown.ts && node johnfndown.js yourExtendedMarkdownFile.md`
