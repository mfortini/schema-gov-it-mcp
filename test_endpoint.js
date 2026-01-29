import { appendFile } from "fs/promises";
// SPARQL Endpoint
const ENDPOINT = "https://schema.gov.it/sparql";
async function executeSparql(query) {
    console.log("Querying:", query);
    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/sparql-results+json",
        },
        body: new URLSearchParams({ query }),
    });
    if (!response.ok) {
        throw new Error(`SPARQL request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
async function main() {
    try {
        const result = await executeSparql("SELECT * WHERE { ?s ?p ?o } LIMIT 5");
        console.log("Result:", JSON.stringify(result, null, 2));
    }
    catch (err) {
        console.error("Failed:", err);
    }
}
main();
//# sourceMappingURL=test_endpoint.js.map