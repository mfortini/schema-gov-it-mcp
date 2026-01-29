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
        const text = await response.text();
        throw new Error(`SPARQL request failed: ${response.status} ${response.statusText}\nBody: ${text}`);
    }
    return response.json();
}
async function main() {
    // The suspicious query from search_concepts
    const keyword = "amministrazione";
    const query = `
      SELECT DISTINCT ?subject ?type ?label ?score
      WHERE {
        VALUES ?type { owl:Class owl:ObjectProperty owl:DatatypeProperty skos:Concept }
        ?subject a ?type .
        ?subject rdfs:label|skos:prefLabel|dct:title ?label .
        FILTER(REGEX(STR(?label), "${keyword}", "i"))
      }
      LIMIT 10
    `;
    try {
        const result = await executeSparql(query);
        console.log("Success:", JSON.stringify(result, null, 2));
    }
    catch (error) {
        console.error("Expeted Error:", error);
    }
}
main();
export {};
//# sourceMappingURL=debug_sparql.js.map