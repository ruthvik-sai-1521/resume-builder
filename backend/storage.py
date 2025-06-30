import json

def save_resume_to_file(resume_data: dict, filename="resume.json"):
    with open(filename, "w") as f:
        json.dump(resume_data, f, indent=2)
