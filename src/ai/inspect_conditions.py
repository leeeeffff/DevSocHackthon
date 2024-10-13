import pickle

def load_conditions(file_path):
    with open(file_path, "rb") as file:
        conditions = pickle.load(file)
    return conditions

def inspect_conditions(conditions, course_code=None):
    if course_code:
        course_conditions = conditions.get(course_code, None)
        if course_conditions:
            print(f"Conditions for {course_code}:")
            print(course_conditions)
        else:
            print(f"No conditions found for {course_code}.")
    else:
        print("Sample conditions:")
        for course, condition in list(conditions.items())[:5]:  
            print(f"Course: {course}, Condition: {condition}")


file_path = "conditions.pkl"
conditions = load_conditions(file_path)

inspect_conditions(conditions, course_code="COMP1511")

