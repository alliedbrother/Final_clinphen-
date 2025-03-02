import subprocess

def run_command(command, input_file_loc,output_file):
    # Run the command and capture its output
    command  +=  input_file_loc
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    
    # Check for errors
    if result.returncode != 0:
        print("Error executing command:")
        print(result.stderr)
        return
    
    # Write the JSON output to the file
    with open(output_file, "w") as f:
        f.write(result.stdout)
    
    print(f"Command executed and output written to {output_file}")

