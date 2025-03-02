import json
import math
from phrank import Phrank
from phrank import load_maps, closure 
from hpo_terms import load_hpo_terms

class PhrankPipeline:
    def __init__(self, dag_file, disease_data):
        """
        Initialize the pipeline with:
          - dag_file: a file (e.g. 'data/hp_dag.txt') containing child->parent edges from hp.obo.
          - disease_data: a dict loaded from your Orphanet parser (converted_orphanet.json), e.g.:
            {
              "ORPHA:58 | Alexander disease": {
                "hpo_terms": ["HP:0000256", "HP:0001288"],
                "frequencies": { "HP:0000256": "Very frequent (99-80%)", ... }
              },
              ...
            }
        We will:
          a) Create a Phrank object using the DAG file.
          b) Set up a mapping from disease to its HPO terms.
          c) Compute information content (IC) and marginal IC using the disease data.
             (For this demonstration we treat each disease as if it were a gene.)
        """
        # Initialize Phrank using your DAG file.
        self.phrank = Phrank(dagfile=dag_file)
        
        # Get the ontology maps (child->parent and parent->children)
        # Here we assume that our Phrank instance already has loaded these maps
        # or we use our own utility function. In this example, we use the maps from self.phrank:
        self._child_to_parent, self._parent_to_children = self.phrank._child_to_parent, self.phrank._parent_to_children
        
        # Build a simple disease-to-phenotypes map:
        # Convert each disease's list of HPO terms into a set.
        self._disease_pheno_map = {}
        for disease, info in disease_data.items():
            self._disease_pheno_map[disease] = set(info.get("hpo_terms", []))
        
        # Compute information content (IC) and marginal IC.
        # Note: The original Phrank.compute_information_content() is designed for gene annotations.
        # Here we treat each disease as a "gene" to compute the frequency of each phenotype.
        self._IC, self._marginal_IC = Phrank.compute_information_content(self._disease_pheno_map, self._child_to_parent)

    def rank_diseases(self, patient_phenotypes, threshold=0.2):
        """
        Ranks diseases by comparing the patient's HPO terms with each disease's HPO set.
        
        :param patient_phenotypes: List of HPO IDs, e.g. ["HP:0000256", "HP:0001507"]
        :param threshold: If the top score is below this value, flag the case as "rare".
        :return: Tuple (results, is_rare) where:
            - results: A list of (disease, score) sorted by score (highest first).
            - is_rare: Boolean indicating if the top score is below threshold.
        """
        results = []
        # Compute the closure (all ancestors) for the patient's phenotypes.
        patient_closure = closure(patient_phenotypes, self._child_to_parent)
        for disease, disease_phenos in self._disease_pheno_map.items():
            # Compute closure for disease phenotypes
            disease_closure = closure(list(disease_phenos), self._child_to_parent)
            # Compute the similarity score: sum the marginal IC for the intersection.
            score = sum(self._marginal_IC.get(pheno, 0) for pheno in (patient_closure & disease_closure))
            results.append((disease, score))
        # Sort results in descending order by score.
        results.sort(key=lambda x: x[1], reverse=True)
        if not results:
            return results, True
        top_score = results[0][1]
        is_rare = top_score < threshold
        return results, is_rare


def test_phrank_pipeline():
    """
    Test the Phrank pipeline:
      1) Load disease data from 'data/converted_orphanet.json'.
      2) Use the DAG file 'data/hp_dag.txt' (from the OBO-to-DAG conversion).
      3) Initialize the pipeline.
      4) Rank diseases for a sample patient HPO set.
    """
    # 1) Load disease data from Orphanet (a JSON file generated previously)
    with open("data/converted_orphanet.json", "r") as f:
        disease_data = json.load(f)
    
    # 2) Specify the DAG file path (generated from hp.obo)
    dag_file = "data/hp_dag.txt"
    
    # 3) Initialize the pipeline.
    pipeline = PhrankPipeline(dag_file, disease_data)
    
    # 4) Sample patient HPO terms (these might come from your custom extractor)
    patient_symptoms = input("Please mention your symptoms: \n")
    
    patient_phenotypes = load_hpo_terms(patient_symptoms)   
    
    # Rank diseases
    results, is_rare = pipeline.rank_diseases(patient_phenotypes, threshold=0.2)
    
    print("Top 5 Results:")
    for disease, score in results[:5]:
        print(f"{disease}: {score:.4f}")
    print("Is Rare?", is_rare)


if __name__ == "__main__":
    test_phrank_pipeline()