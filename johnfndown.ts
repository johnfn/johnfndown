import * as process from "process";
import * as fs from "fs";

const filename       = process.argv[2];
const outputFilename = filename.split(".")[0] + ".html";
const template       = fs.readFileSync("base.html", "utf8");

let contents = fs.readFileSync(filename, "utf8");

// `code`
contents = contents.replace(/`([^`\n]+)`/g, `<code>$1</code>`);

// code blocks (```)
contents = contents.replace(/```((.|\n)+?)(?=```)```/g, `<pre>$1</pre>\n`);

// *italics*
contents = contents.replace(/\*([^\*\n]+)\*/g, `<em>$1</em>`);

// [links](www.dumb.com)
contents = contents.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, `<a href="$2">$1</a>`) // This regex - for [this] followed by (this) - is arguably the worst regex ever.

// Headings
contents = contents.replace(/(^|\n)#([^#\n]+)\n/g,       `<h1>$2</h1>\n`);
contents = contents.replace(/(^|\n)##([^#\n]+)\n/g,      `<h2>$2</h2>\n`);
contents = contents.replace(/(^|\n)###([^#\n]+)\n/g,     `<h3>$2</h3>\n`);
contents = contents.replace(/(^|\n)####([^#\n]+)\n/g,    `<h4>$2</h4>\n`);
contents = contents.replace(/(^|\n)#####([^#\n]+)\n/g,   `<h5>$2</h5>\n`);
contents = contents.replace(/(^|\n)######([^#\n]+)\n/g,  `<h6>$2</h6>\n`);
contents = contents.replace(/(^|\n)#######([^#\n]+)\n/g, `<h7>$2</h7>\n`);

// Lists

// If you're not impressed by this hack, you just haven't understood it yet.

contents = contents.replace(/1\. (.*)\n/g,              `<ol>\n<li>$1</li>\n`);  // list start
contents = contents.replace(/[0-9]+\. (.*)\n([^0-9])/g, `<li>$1</li>\n</ol>\n$2`); // list end (should use a forward lookahead here...)

contents = contents.replace(/[0-9]+\. (.*)\n/g,         `<li>$1</li>\n`);

const wrapUnwrappedLinesInDivs = (contents: string) => {
    let results = "";
    let insideTag = 0;

    for (const line of contents.split("\n")) {
        if (insideTag === 0 && line[0] !== "<") {
            results += `<p>${ line }</p>\n`
        } else {
            results += `${ line }\n`;
        }

        if (line.match(/^<[a-zA-Z]+>$/)) {
            insideTag++;
        }

        if (line.match(/^<\/[a-zA-Z]+>$/)) {
            insideTag--;
        }
    }

    return results;
};

contents = wrapUnwrappedLinesInDivs(contents);

// contents = contents.replace(/(^|\n)([^<].*)\n/g, `<p>$2</p>\n`)

fs.writeFileSync(outputFilename, template.replace("{{ CONTENT }}", contents));
