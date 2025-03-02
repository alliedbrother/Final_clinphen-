import os
import csv
from clino2 import run_command

def load_hpo_terms(symptoms_sentence):

    # Define the sentence and file name
    filename = "symptoms.txt"

    # Open the file in write mode ('w') which creates the file if it doesn't exist,
    # and overwrites it if it does.
    with open(filename, "w") as file:
        file.write(symptoms_sentence)

    print(f"Sentence written to {filename}")


    command_to_run = "clinphen " 
    input_file = "/Users/saiakhil/Documents/clin/" + filename
    output_filename = "symptoms_hpo.txt"

    run_command(command_to_run,input_file,output_filename)

    hpo_ids = []

    # Open the file in read mode
    with open(output_filename, "r") as file:
        reader = csv.reader(file, delimiter="\t")
        
        # Skip the header row
        next(reader)
        
        # Extract the HPO ID from each row (assuming it's in the first column)
        for row in reader:
            if row:  # Make sure the row is not empty
                hpo_ids.append(row[0])

    # Print the extracted HPO IDs
    print("Related HPO IDs:")
    for hpo in hpo_ids:
        print(hpo)
    
    return hpo_ids

if __name__ == "__main__":
    patient_symptoms = input("Please mention your symptoms: \n")
    load_hpo_terms(patient_symptoms)




