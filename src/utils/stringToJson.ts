export function stringToJson(str: string) {
    try {
        return JSON.parse(wrapWithQuotes(convertTickToQuote(str)));
    } catch {
        throw new Error("Given string is not in a valid JSON format.");
    }
}

function wrapWithQuotes(str: string): string {
    return str.replace(/(\w+:)|(\w+ :)/g, function(matchedStr) {
        return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
    });
}

function convertTickToQuote(str: string): string {
    return str.replaceAll("'", '"');
}