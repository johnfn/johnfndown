# johnfndown
`johnfndown` is a trivially-extensible Markdown-type language. 

`johnfndown` works as a sequence of regex replacements that are applied to the input file. For example, groups of words surrounded by astericks have the astericks transformed into `<em>` and `</em>`. [That is done by this line here.](https://github.com/johnfn/johnfndown/blob/master/johnfndown.ts#L17) If you want a new rule, all you have to do is add another line.

## usage

`tsc johnfndown.ts && node johnfndown.js yourExtendedMarkdownFile.md`
