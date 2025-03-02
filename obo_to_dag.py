def parse_obo_to_dag(obo_path, dag_path):
    """
    Converts a basic .obo file into a DAG file of child->parent edges
    based on 'is_a:' lines.
    
    :param obo_path: Path to the input .obo file (e.g., 'hp.obo')
    :param dag_path: Path to the output DAG file (e.g., 'hp_dag.txt')
    
    The DAG file will contain lines like:
       HP:0000002 HP:0001507
       HP:0000003 HP:0000107
       ...
    
    where each line is (child_id parent_id).
    """
    edges = []
    current_id = None  # Will hold the ID of the term we're currently parsing

    with open(obo_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()

            # Start of a new [Term] means we reset current_id
            if line.startswith("[Term]"):
                current_id = None
                continue

            # If we see "id: HP:xxx", store that as the current term ID
            # e.g. "id: HP:0000003"
            if line.startswith("id: "):
                # Extract everything after "id: "
                current_id = line.split("id: ")[1].strip()
                continue

            # If we see "is_a: HP:xxx ! comment"
            # e.g. "is_a: HP:0000107 ! Renal cyst"
            if line.startswith("is_a: "):
                # Something like "HP:0000107 ! Renal cyst"
                # We'll split by spaces and take the first chunk as the parent ID
                # line would look like: "is_a: HP:0000107 ! Renal cyst"
                parent_part = line.replace("is_a: ", "")  # "HP:0000107 ! Renal cyst"
                parent_part = parent_part.split(" ")[0]  # "HP:0000107"
                parent_id = parent_part.strip()

                # Only store edge if we have a current_id
                if current_id and parent_id:
                    edges.append((current_id, parent_id))

    # Now write out edges to the DAG file
    with open(dag_path, "w", encoding="utf-8") as out:
        for (child_id, parent_id) in edges:
            out.write(f"{child_id} {parent_id}\n")

    print(f"Parsed {len(edges)} edges from {obo_path} and wrote them to {dag_path}")


def test_obo_to_dag():
    """
    Simple test function that:
      1. Reads 'hp.obo'
      2. Writes 'hp_dag.txt'
    Adjust paths as needed.
    """
    obo_file = "data/hp.obo"       # Path to your .obo file
    dag_file = "data/hp_dag.txt"   # Output DAG file

    parse_obo_to_dag(obo_file, dag_file)


if __name__ == "__main__":
    test_obo_to_dag()
