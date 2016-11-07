# johnfndown

`johnfndown` is a Markdown-inspired markup language. It has been designed to be trivially understandable by reading the [source](johnfndown.ts). It is as a sequence of regex pattern matches that get applied to the input. For example, groups of words surrounded by astericks have the astericks transformed into `<em>` and `</em>`. 

The point of `johnfndown` is to be a Markdown-type language that is trivially extensible simply by adding additional regexes as needed. 
